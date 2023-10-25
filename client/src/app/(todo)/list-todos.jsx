import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ListTodos() {
  const todos = await fetchTodos();

  async function fetchTodos() {
    const token = cookies().get("token").value;
    const response = await fetch("http://localhost:3000/api/todo", {
      method: "GET",
      headers: {
        Cookie: `token=${token}`,
      },
      next: {
        revalidate: 0,
      },
    });

    if (response.status === 401) {
      redirect("/api/identity/signout");
    } else if (response.status === 500) {
      return [];
    }

    return await response.json();
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
              <td>{todo.completed}</td>
              <td>
                <button>Toggle completed</button>
                <button>Delete</button>
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
