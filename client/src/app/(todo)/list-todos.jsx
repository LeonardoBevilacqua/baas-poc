import { TodoService } from "@/app/api/todo/todo.service";
import { TodoSupabaseRepository } from "backend/infra/repository/supabase/todo-supabase.repo";
import { cookies } from "next/headers";
import DeleteTodoButton from "./delete-todo-button";
import ToggleCompletedButton from "./toggle-completed-button";

export default async function ListTodos() {
  const todos = await loadTodos();

  async function loadTodos() {
    const todoService = new TodoService(
      TodoSupabaseRepository.Instance(cookies())
    );
    const todos = await todoService.getAll();
    return todos;
  }

  return (
    <div>
      <h3>List of todos</h3>
      <table border={1}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
            <th>Completed</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.description}</td>
              <td>{todo.completed.toString()}</td>
              <td>
                <ToggleCompletedButton todo={todo}></ToggleCompletedButton>
                <DeleteTodoButton id={todo.id}></DeleteTodoButton>
              </td>
            </tr>
          ))}
          {!todos.length && (
            <tr>
              <td colSpan={4}>No todos avaliable</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
