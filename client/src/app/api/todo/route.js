import { addTodo } from "@/app/todo.service";

export async function POST(request) {
  const body = await request.json();
  const todo = await addTodo(body);
  return Response.json({ todo }, { status: 201 });
}

export async function GET() {
  return Response.json(await getTodos(), { status: 200 });
}
