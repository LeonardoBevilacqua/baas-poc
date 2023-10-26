import { TodoRepository } from "backend/infra/repository/todo.repo";
// eslint-disable-next-line no-undef
const driver = process.env.BACKEND_DRIVER;
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

export async function deleteTodo(id, userId) {
  await todoRepo.delete(id, userId);
}

export async function updateTodo(item, userId) {
  await todoRepo.update(item, userId);
}
