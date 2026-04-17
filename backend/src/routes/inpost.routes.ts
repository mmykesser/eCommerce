import { Router } from 'express';
import { InPostController } from '../controllers/inpost.controller';
import { InPostService } from '../services/inpost.service';

const router = Router();

const inpostService = new InPostService();
const inpostController = new InPostController(inpostService);

router.route('/points').get(inpostController.getPoints);

router.route('/points/:name').get(inpostController.getPoint);

export default router;
