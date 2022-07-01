import { Request, RequestHandler, Response } from "express";
import { execute } from "./../utils/mysql.connector";
import { todoQueries } from "./../utils/todo.queries";
import { Task } from "../types/tasksType";
import { validationResult } from "express-validator";

export const getAllTasks: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const tasks: Task[] = await execute(todoQueries.getAllTasks, []);
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({
      message: "There was an error when fetching tasks",
    });
  }
};

export const createTask: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, description, status } = req.body;

    const tasks: any = await execute(todoQueries.createTask, [
      name,
      description,
      status,
    ]);
    const newTasks = await execute(todoQueries.getTaskById, [
      tasks["insertId"],
    ]);
    res.status(201).json({ message: "Todo added", tasks: newTasks });
  } catch (error) {
    console.error(
      "[tasks.controller][createTask][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when creating a new task",
    });
  }
};
export const getTaskById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const task: Task[] = await execute(todoQueries.getTaskById, [id]);
    if (task.length === 0) res.status(404).json({ message: "task not found" });
    else res.status(200).json({ task });
  } catch (error) {
    console.error(
      "[tasks.controller][getTask][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when fetching a task",
    });
  }
};

export const updateTask: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    const { name, description, status } = req.body;
    const task: any = await execute(todoQueries.updateTask, [
      name,
      description,
      status,
      id,
    ]);
    if (task["affectedRows"] === 0)
      res.status(500).json({ message: "task has not updated" });
    else
      res.status(200).json({ message: "task has been updated successfully" });
  } catch (error) {
    console.error(
      "[tasks.controller][updateTask][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when updating a task",
    });
  }
};

export const deleteTask: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const task: any = await execute(todoQueries.deleteTask, [id]);
    if (task["affectedRows"] === 0)
      res.status(500).json({ message: "task has not updated" });
    else
      res.status(200).json({ message: "task has been deleted successfully" });
  } catch (error) {
    console.error(
      "[tasks.controller][deleteTask][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when deleting a task",
    });
  }
};
