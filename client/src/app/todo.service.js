import { TodoRepository } from "backend/infra/repository/todo.repo";
export async function getTodos() {
  const todoRepo = TodoRepository.Instance("local", 1);
  return await todoRepo.findAll();
}

export async function addTodo(todo) {
  const todoRepo = TodoRepository.Instance("local", 1);
  return await todoRepo.insert(todo);
}
