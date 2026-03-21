import { RequestHandler } from 'express';
import { InPostService } from '../services/inpost.service';
import { IInPostPointsQuery } from '../interfaces/external/inpost.interface';

export class InPostController {
  private inpostService = new InPostService();

  public getPoints: RequestHandler = async (req, res, next) => {
    try {
      const query: IInPostPointsQuery = {
        page: req.query.page ? Number(req.query.page) : undefined,
        per_page: req.query.per_page ? Number(req.query.per_page) : undefined,
        city: typeof req.query.city === 'string' ? req.query.city : undefined,
      };

      const points = await this.inpostService.getPoints(query);

      res.status(200).json({
        success: true,
        data: points,
      });
    } catch (err) {
      next(err);
    }
  };

  public getPoint: RequestHandler = async (req, res, next) => {
    try {
      const { name } = req.params;
      const point = await this.inpostService.getPoint(name);

      res.status(200).json({
        success: true,
        data: point,
      });
    } catch (err) {
      next(err);
    }
  };
}
