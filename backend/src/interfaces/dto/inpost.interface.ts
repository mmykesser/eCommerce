export interface IPublicInPostPoint {
  name: string;
  status: string;
  locationDescription: string | null;
  city: string;
  street: string;
  buildingNumber: string;
  postCode: string;
}

export interface IPublicInPostPointResponse {
  totalPages: number;
  currentPage: number;
  points: IPublicInPostPoint[];
}
