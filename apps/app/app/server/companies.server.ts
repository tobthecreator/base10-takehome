import { GenericServerCall, GetServerURL } from './helpers.server';
import * as request from 'superagent';

export interface ICompany {
  id: string;
  name: string;
  industry: string | null;
  business_models: string[] | null;
  hq_location: string | null;
  founder_quality: number | null;
  feature_set: string | null;
  created_at: Date | null;
  updated_at: Date | null;
}

export type TCreateCompany = Partial<
  Pick<
    ICompany,
    | 'name'
    | 'industry'
    | 'business_models'
    | 'hq_location'
    | 'founder_quality'
    | 'feature_set'
  >
>;

export const CreateCompany = async (
  companyToCreate: TCreateCompany
): Promise<ICompany> => {
  return GenericServerCall<ICompany>(
    request.agent().post(`${GetServerURL()}/companies`).send(companyToCreate)
  );
};

export const GetAllCompanies = async (): Promise<ICompany[]> => {
  return GenericServerCall<ICompany[]>(
    request.agent().get(`${GetServerURL()}/companies`)
  );
};
