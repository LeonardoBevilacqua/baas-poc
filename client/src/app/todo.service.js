import { TodoRepository } from "backend/infra/repository/todo.repo";
const driver = "firestore";
const todoRepo = TodoRepository.Instance(driver, 1);

export async function getTodos() {
  return (await todoRepo.findAll()) ?? [];
}

export async function addTodo(todo) {
  return await todoRepo.insert(todo);
}
