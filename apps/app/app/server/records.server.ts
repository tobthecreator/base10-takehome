import { GenericServerCall, GetServerURL } from './helpers.server';
import * as request from 'superagent';

export interface IRecord {
  id: string;
  company_id: string;
  date: Date | string;
  revenue: number;
  cash_burn: number;
  gross_profit_percentage: number;
  gross_profit_amount: number;
  ebitda: number;
  cash_on_hand: number;
  cac: number;
  ltv: number;
  acv: number;
  arpu: number;
  customer_count: number;
  next_fundraise_date: Date | string | null;
  created_at: Date | null;
  updated_at: Date | null;
}

export type TCreateRecord = Partial<
  Pick<
    IRecord,
    | 'date'
    | 'company_id'
    | 'revenue'
    | 'cash_burn'
    | 'gross_profit_percentage'
    | 'gross_profit_amount'
    | 'ebitda'
    | 'cash_on_hand'
    | 'cac'
    | 'ltv'
    | 'acv'
    | 'arpu'
    | 'customer_count'
    | 'next_fundraise_date'
  >
>;

export const CreateRecord = async (
  companyToCreate: TCreateRecord
): Promise<IRecord> => {
  return GenericServerCall<IRecord>(
    request.agent().post(`${GetServerURL()}/records`).send(companyToCreate)
  );
};
