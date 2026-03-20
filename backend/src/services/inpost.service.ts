import config from '../config/config';
import {
  IInPostPointsQuery,
  IInPostPointsResponse,
  IInPostPoint,
} from '../interfaces/external/inpost.interface';
import { NotFoundError } from '../utils/errors.utils';

export class InPostService {
  private readonly headers = {
    Authorization: `Bearer ${config.inpostApiToken}`,
  };

  public async getPoints(query: IInPostPointsQuery): Promise<IInPostPointsResponse> {
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

    const data: IInPostPointsResponse = await response.json();
    return data;
  }

  public async getPoint(name: string): Promise<IInPostPoint> {
    const url = `${config.inpostPointsApiUrl}/v1/points/${name}`;

    const response = await fetch(url, { headers: this.headers });

    if (response.status === 404) {
      throw new NotFoundError(`Parcel locker "${name}" not found`);
    }

    if (!response.ok) {
      throw new Error(`InPost API responded with status: ${response.status}`);
    }

    const data: IInPostPoint = await response.json();
    return data;
  }
}
