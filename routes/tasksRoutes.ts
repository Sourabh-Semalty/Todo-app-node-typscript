import { Router } from "express";
import {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController";
import { checkValidFields } from "../utils/fieldValidators";
const router: Router = Router();

router
  .route("/:id")
  .get(getTaskById)
  .put(checkValidFields, updateTask)
  .delete(deleteTask);
router.route("/").get(getAllTasks).post(checkValidFields, createTask);

export default router;
