import 'jest';
import app from './../app';
import { execute } from './../utils/mysql.connector';
import request from 'supertest';
import {
    StatusCodes,
} from 'http-status-codes';



const todo = {"tasks": [
        {
            "name": "testing todo",
            "description": "testing todo",
            "status": "ongoing"
        }
    ]
}

beforeEach(async()=> {
    await execute(`TRUNCATE TABLE todo_app.tasks`,[]);
    await execute(`Insert into todo_app.tasks (name, description,status)  values ("testing todo","testing todo","ongoing")`,[])
})

test("1: Tasks must be added to the db", async()=> {
    await request(app).post("/api/v1/tasks").send(todo.tasks[0]).expect(201);
})

test("2: Get Tasks from the db", async () => {
    const response = await request(app).get("/api/v1/tasks").expect(200);
    expect(response.body).toMatchObject(todo)
})


test("3: Update task in the database", async()=>{
    await request(app).put(`/api/v1/tasks/${1}`).send({
        id: 1,
        name: "updated testing todo",
        description: "tasks has been updated",
        status: "completed"
    }).expect(200);

    const todoData: any = await request(app).get(`/api/v1/tasks/${1}`).expect(200);
    expect(todoData.body).toMatchObject({
    "task": [
        {
              name: "updated testing todo",
        description: "tasks has been updated",
        status: "completed"
        }
    ]
})
})

test("4: Delete the task from the database", async () => {
    const todoData: any = await request(app).get(`/api/v1/tasks/${1}`).expect(200);
    expect(todoData.body).toMatchObject({
        "task": [
           {
            "name": "testing todo",
            "description": "testing todo",
            "status": "ongoing"
        }
        ]
    })
})

test("5: Delete the task from the database", async()=>{
    await request(app).delete(`/api/v1/tasks/${1}`).send().expect(StatusCodes.OK).expect({ message: 'task has been deleted successfully' })
})


