import { ModelBase } from '../../../shared/domain/modelBase';

export interface Country {
  name?: string;
  code?: string;
}

export interface Representative {
  name?: string;
  image?: string;
}

export class Customer extends ModelBase {
  name?: string | null;
  country?: Country | null;
  company?: string | null;
  date?: string | Date | null;
  status?: string | null;
  activity?: number | null;
  representative?: Representative | null;
  verified?: boolean;
  balance?: number | null;
  constructor() {
    super();
    this.name = null;
    this.country = null;
    this.date = null;
    this.status = null;
    this.activity = null;
    this.representative = null;
    this.verified = false;
    this.balance = null;
  }
}
