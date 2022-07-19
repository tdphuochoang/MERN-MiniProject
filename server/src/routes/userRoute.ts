import {Router} from 'express';
import { createUser, deleteUser, editUser, getAllUsers, getUser } from '../controllers/userController';
const router:Router = Router();

router.get("/", getAllUsers);
router.get("/user/:id", getUser);
router.post("/user", createUser);
router.put("/user/:id", editUser);
router.delete("/user/:id", deleteUser);

export default router;