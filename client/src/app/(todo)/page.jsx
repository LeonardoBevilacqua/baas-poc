import { Suspense } from "react";
import Loading from "../loading";
import AddTodo from "./add-todo";
import ListTodos from "./list-todos";

export default function Home() {
  return (
    <main>
      <h2>BaaS POC</h2>

      <h3>Todo</h3>
      <hr />
      <AddTodo />
      <hr />
      <Suspense fallback={<Loading />}>
        <ListTodos />
      </Suspense>
    </main>
  );
}
