import { TodoRepository } from "backend/infra/repository/todo.repo";
const driver = "firestore";
export async function getTodos() {
  const todoRepo = TodoRepository.Instance(driver, 1);
  return await todoRepo.findAll() ?? [];
}

export async function addTodo(todo) {
  const todoRepo = TodoRepository.Instance(driver, 1);
  return await todoRepo.insert(todo);
}
