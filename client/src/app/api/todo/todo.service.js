import { TodoRepository } from "backend/infra/repository/todo.repo";
const driver = "firestore";
const todoRepo = TodoRepository.Instance(driver);

export async function getTodos() {
  return (await todoRepo.findAll()) ?? [];
}

export async function getTodosByUser(userId) {
  return (await todoRepo.findAllByUser(userId)) ?? [];
}

export async function addTodo(todo) {
  return await todoRepo.insert(todo);
}

export async function deleteTodo(todoId) {
  await todoRepo.delete(todoId);
}
