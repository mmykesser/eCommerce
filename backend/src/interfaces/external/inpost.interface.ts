export interface IInPostPointsQuery {
  page?: number;
  per_page?: number;
  city?: string;
}

export interface IInPostAddressDetails {
  city: string;
  post_code: string;
  street: string;
  building_number: string;
}

export interface IInPostPoint {
  name: string;
  status: string;
  location_description: string | null;
  address_details: IInPostAddressDetails;
}

export interface IInPostPointsResponse {
  count: number;
  page: number;
  per_page: number;
  total_pages: number;
  items: IInPostPoint[];
}
