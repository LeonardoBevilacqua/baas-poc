export default function ListTodos() {
  const todos = [];
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
