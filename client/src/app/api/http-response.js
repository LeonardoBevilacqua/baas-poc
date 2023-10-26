import { NextResponse } from "next/server";

export function unauthorized(body = {}) {
  return NextResponse.json({ ...body }, { status: 401 });
}
