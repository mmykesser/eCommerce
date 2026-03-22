import { Router } from 'express';
import { InPostController } from '../controllers/inpost.controller';

const router = Router();
const inpostController = new InPostController();

router.route('/points').get(inpostController.getPoints);

router.route('/points/:name').get(inpostController.getPoint);

export default router;
