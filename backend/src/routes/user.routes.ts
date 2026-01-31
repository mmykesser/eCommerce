import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { protect, authorize } from '../middleware/auth.middleware';
import { validateUpdateUser } from '../middleware/validation/user.validation';

const router = Router();
const userController = new UserController();

router.use(protect);
router.use(authorize('admin'));

router.route('/').get(userController.getAllUsers);

router
  .route('/:id')
  .get(userController.getUserById)
  .put(validateUpdateUser, userController.updateUser)
  .delete(userController.deleteUser);

export default router;
