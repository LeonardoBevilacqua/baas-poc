import AddTodo from "./add-todo";
import ListTodos from "./list-todos";

export default function Home() {
  return (
    <main>
      <h1>BaaS POC</h1>

      <h2>Todo</h2>
      <hr />
      <AddTodo />
      <hr />
      <ListTodos />
    </main>
  );
}
