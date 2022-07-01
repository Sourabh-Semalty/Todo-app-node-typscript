export const todoQueries = {
  getAllTasks: ` SELECT * FROM todo_app.tasks`,
  getTaskById: ` SELECT * FROM todo_app.tasks WHERE id = ?`,
  createTask: ` INSERT INTO todo_app.tasks (name, description,status) VALUES (?, ?, ?)`,
  updateTask: ` UPDATE todo_app.tasks SET name = ?, description = ?, status = ? WHERE id = ?`,
  deleteTask: ` DELETE FROM todo_app.tasks WHERE id = ?`,
};
