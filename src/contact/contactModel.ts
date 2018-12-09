export interface ContactCriteria {
  page?: number;
  size?: number;
  firstname?: string;
  lastname?: string;
  gender?: string;
  ipaddress?: string;
}

export interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
}
