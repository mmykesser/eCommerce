import config from '../config/config';
import {
  IInPostPointsQuery,
  IInPostPointsResponse,
  IInPostPoint,
} from '../interfaces/external/inpost.interface';
import { IPublicInPostPoint, IPublicInPostPointResponse } from '../interfaces/dto/inpost.interface';
import { NotFoundError } from '../utils/errors.utils';

export class InPostService {
  private readonly headers = {
    Authorization: `Bearer ${config.inpostApiToken}`,
  };

  private transformToPublicPoint(point: IInPostPoint): IPublicInPostPoint {
    return {
      name: point.name,
      status: point.status,
      locationDescription: point.location_description,
      city: point.address_details.city,
      street: point.address_details.street,
      buildingNumber: point.address_details.building_number,
      postCode: point.address_details.post_code,
    };
  }

  public async getPoints(query: IInPostPointsQuery): Promise<IPublicInPostPointResponse> {
    const params = new URLSearchParams();

    if (query.city) params.append('city', query.city);
    if (query.page) params.append('page', String(query.page));
    if (query.per_page) params.append('per_page', String(query.per_page));

    const url = `${config.inpostPointsApiUrl}/v1/points?${params.toString()}`;
    console.log(`Fetching InPost points: ${url}`);

    const response = await fetch(url, { headers: this.headers });

    if (!response.ok) {
      throw new Error(`InPost API responded with status: ${response.status}`);
    }

    const rawData: IInPostPointsResponse = await response.json();

    const cleanPoints: IPublicInPostPoint[] = rawData.items.map(this.transformToPublicPoint);

    return {
      points: cleanPoints,
      totalPages: rawData.total_pages,
      currentPage: rawData.page,
    };
  }

  public async getPoint(name: string): Promise<IPublicInPostPoint> {
    const url = `${config.inpostPointsApiUrl}/v1/points/${name}`;

    const response = await fetch(url, { headers: this.headers });

    if (response.status === 404) {
      throw new NotFoundError(`Parcel locker "${name}" not found`);
    }

    if (!response.ok) {
      throw new Error(`InPost API responded with status: ${response.status}`);
    }

    const rawPoint: IInPostPoint = await response.json();

    if (!rawPoint || !rawPoint.address_details) {
      throw new NotFoundError(`Parcel locker "${name}" not found`);
    }

    return this.transformToPublicPoint(rawPoint);
  }
}
