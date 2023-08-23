'use client';

import { useEffect, useState } from 'react';
import { CreateRecord, TCreateRecord } from '../server/records.server';
import { GetAllCompanies, ICompany } from '../server/companies.server';

const defaultRecord = {};

export default function Companies() {
  const [recordToCreate, setRecordToCreate] = useState<TCreateRecord>({
    ...defaultRecord,
  });
  const [success, setSuccess] = useState<number>(0); // -1 failure, 0 waiting, 1 success

  const [companies, setCompanies] = useState<ICompany[]>([]);

  const onCancel = (e: any) => {
    e.preventDefault();
    setRecordToCreate({ ...defaultRecord });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await CreateRecord(recordToCreate);
      setRecordToCreate({ ...defaultRecord });
      setSuccess(1);
    } catch (e) {
      setSuccess(-1);
    }

    setTimeout(() => {
      setSuccess(0);
    }, 3000);
  };

  const onUpdate = (field: string, update: string | number | string[]) => {
    setRecordToCreate({ ...recordToCreate, [field]: update });
  };

  const getCompanies = async () => {
    const c = await GetAllCompanies();

    setCompanies(c);
    onUpdate('company_id', c[0].id);
  };

  useEffect(() => {
    getCompanies();
  }, []);

  // TODO - condense fields down into an array that we can map over to save space

  return (
    <form>
      <div>
        <h1 className="font-semibold leading-7 text-gray-900">
          Financial Record Information
        </h1>

        <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="company_id"
              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              Company
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <select
                id="company_id"
                name="company_id"
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#45aeeb] sm:max-w-xs sm:text-sm sm:leading-6"
                onChange={(e) =>
                  onUpdate('company_id', parseInt(e.target.value))
                }
                value={recordToCreate?.company_id ?? ''}
              >
                {companies.map((c, i) => {
                  return (
                    <option key={`company-${i}`} value={c.id}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="date"
              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              Date{' '}
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <input
                required
                type="date"
                name="date"
                id="date"
                value={(recordToCreate?.date as string)?.split('T')[0] ?? ''}
                onChange={(e) =>
                  onUpdate('date', e.target.value + 'T00:00:00Z')
                }
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#45aeeb] sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="revenue"
              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              Revenue (annualized)
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <input
                type="number"
                name="revenue"
                id="revenue"
                value={recordToCreate?.revenue ?? 0}
                onChange={(e) =>
                  onUpdate('revenue', parseFloat(e.target.value))
                }
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#45aeeb] sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="cash_burn"
              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              Cash burn (annualized){' '}
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <input
                type="number"
                name="cash_burn"
                id="cash_burn"
                value={recordToCreate?.cash_burn ?? 0}
                onChange={(e) =>
                  onUpdate('cash_burn', parseFloat(e.target.value))
                }
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#45aeeb] sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="gross_profit_percentage"
              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              Gross Profit Percent{' '}
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <input
                type="number"
                name="gross_profit_percentage"
                id="gross_profit_percentage"
                value={recordToCreate?.gross_profit_percentage ?? 0}
                onChange={(e) =>
                  onUpdate(
                    'gross_profit_percentage',
                    parseFloat(e.target.value)
                  )
                }
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#45aeeb] sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="gross_profit_amount"
              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              Gross Profit Amount (annualized){' '}
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <input
                type="number"
                name="gross_profit_amount"
                id="gross_profit_amount"
                value={recordToCreate?.gross_profit_amount ?? 0}
                onChange={(e) =>
                  onUpdate('gross_profit_amount', parseFloat(e.target.value))
                }
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#45aeeb] sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="ebitda"
              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              EBITDA (annualized){' '}
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <input
                type="number"
                name="ebitda"
                id="ebitda"
                value={recordToCreate?.ebitda ?? 0}
                onChange={(e) => onUpdate('ebitda', parseFloat(e.target.value))}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#45aeeb] sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="cash_on_hand"
              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              Cash On Hand{' '}
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <input
                type="number"
                name="cash_on_hand"
                id="cash_on_hand"
                value={recordToCreate?.cash_on_hand ?? 0}
                onChange={(e) =>
                  onUpdate('cash_on_hand', parseFloat(e.target.value))
                }
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#45aeeb] sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="cac"
              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              CAC{' '}
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <input
                type="number"
                name="cac"
                id="cac"
                value={recordToCreate?.cac ?? 0}
                onChange={(e) => onUpdate('cac', parseFloat(e.target.value))}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#45aeeb] sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="ltv"
              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              LTV{' '}
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <input
                type="number"
                name="ltv"
                id="ltv"
                value={recordToCreate?.ltv ?? 0}
                onChange={(e) => onUpdate('ltv', parseFloat(e.target.value))}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#45aeeb] sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="acv"
              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              ACV{' '}
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <input
                type="number"
                name="acv"
                id="acv"
                value={recordToCreate?.acv ?? 0}
                onChange={(e) => onUpdate('acv', parseFloat(e.target.value))}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#45aeeb] sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="arpu"
              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              ARPU{' '}
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <input
                type="number"
                name="arpu"
                id="arpu"
                value={recordToCreate?.arpu ?? 0}
                onChange={(e) => onUpdate('arpu', parseFloat(e.target.value))}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#45aeeb] sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="customer_count"
              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              Customer Count{' '}
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <input
                type="number"
                name="customer_count"
                id="customer_count"
                value={recordToCreate?.customer_count ?? 0}
                onChange={(e) =>
                  onUpdate('customer_count', parseInt(e.target.value))
                }
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#45aeeb] sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="next_fundraise_date"
              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              Next Fundraise Date{' '}
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <input
                type="date"
                name="next_fundraise_date"
                id="next_fundraise_date"
                value={
                  (recordToCreate?.next_fundraise_date as string)?.split(
                    'T'
                  )[0] ?? ''
                }
                onChange={(e) =>
                  onUpdate('next_fundraise_date', e.target.value + 'T00:00:00Z')
                }
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#45aeeb] sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* inser */}
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
