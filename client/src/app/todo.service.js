import { TodoInMemoryRepository } from "local/todo-in-memory.repo";
export async function getTodos() {
  const todoRepo = TodoInMemoryRepository.Instance(1);
  return await todoRepo.findAll();
}

export async function addTodo(todo) {
  const todoRepo = TodoInMemoryRepository.Instance(1);
  return await todoRepo.insert(todo);
}
