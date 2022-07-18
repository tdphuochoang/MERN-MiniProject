import {Router} from 'express';
import { createUser, deleteUser, getAllUsers } from '../controllers/userController';
const router:Router = Router();

router.get("/", getAllUsers);
router.post("/user", createUser);
router.delete("/user/:id", deleteUser);

export default router;