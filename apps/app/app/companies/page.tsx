'use client';

import { useState } from 'react';
import { CreateCompany, TCreateCompany } from '../server/companies.server';

const defaultCompany = {
  industry: 'finance',
};

export default function Companies() {
  const [companyToCreate, setCompanyToCreate] = useState<TCreateCompany>({
    ...defaultCompany,
  });
  const [success, setSuccess] = useState<number>(0); // -1 failure, 0 waiting, 1 success

  const onCancel = (e: any) => {
    e.preventDefault();
    setCompanyToCreate({ ...defaultCompany });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      console.log(await CreateCompany(companyToCreate));
      setCompanyToCreate({ ...defaultCompany });
      setSuccess(1);
    } catch (e) {
      setSuccess(-1);
    }

    setTimeout(() => {
      setSuccess(0);
    }, 3000);
  };

  const onUpdate = (field: string, update: string | number | string[]) => {
    setCompanyToCreate({ ...companyToCreate, [field]: update });
  };

  // TODO - condense fields down into an array that we can map over to save space

  return (
    <form>
      <div>
        <h1 className="font-semibold leading-7 text-gray-900">
          Company Information
        </h1>

        {JSON.stringify(companyToCreate)}
        <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="company-name"
              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              Company Name
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <input
                placeholder="Microsoft"
                required
                type="text"
                name="company-name"
                id="company-name"
                onChange={(e) => onUpdate('name', e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#45aeeb] sm:max-w-xs sm:text-sm sm:leading-6"
                value={companyToCreate?.name ?? ''}
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="industry"
              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              Industry
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <select
                id="industry"
                name="industry"
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#45aeeb] sm:max-w-xs sm:text-sm sm:leading-6"
                onChange={(e) =>
                  onUpdate('industry', e.target.value.toLowerCase())
                }
                value={companyToCreate?.industry ?? ''}
              >
                <option key={'industry-1'} value="finance">
                  Finance
                </option>
                <option key={'industry-2'} value="mining">
                  Mining
                </option>
                <option key={'industry-3'} value="carnivals">
                  Carnivals
                </option>
              </select>
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="business-models"
              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              Business Models (comma separated)
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <input
                placeholder="Subscription"
                type="text"
                name="business-models"
                id="business-models"
                value={companyToCreate?.business_models ?? ''}
                onChange={(e) =>
                  onUpdate(
                    'business_models',
                    e.target.value
                      .replace(' ', '')
                      .split(',')
                      .map((x) => x.toLowerCase())
                  )
                }
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#45aeeb] sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="hq-location"
              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              HQ Location
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <input
                type="text"
                placeholder="Kansas City, MO"
                name="hq-location"
                id="hq-location"
                value={companyToCreate?.hq_location ?? ''}
                onChange={(e) => onUpdate('hq_location', e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#45aeeb] sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="founder-quality"
              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              Founder Quality{' '}
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <input
                type="number"
                name="founder-quality"
                id="founder-quality"
                value={companyToCreate?.founder_quality ?? 0}
                onChange={(e) =>
                  onUpdate('founder_quality', parseInt(e.target.value))
                }
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#45aeeb] sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="feature-set"
              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              Feature Set
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <textarea
                rows={4}
                placeholder="Cosmic Calendar Integration: Sync your appointments with celestial events."
                name="feature-set"
                id="feature-set"
                value={companyToCreate?.feature_set ?? ''}
                onChange={(e) => onUpdate('feature_set', e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#45aeeb] sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          type="button"
          className="inline-flex justify-center rounded-md bg-[#45aeeb] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#45aeeb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#45aeeb]"
        >
          Save
        </button>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        {success === 1 && <p className="text-green-500">Company created</p>}
        {success === -1 && (
          <p className="text-red-500">Company creation failed</p>
        )}
      </div>
    </form>
  );
}
