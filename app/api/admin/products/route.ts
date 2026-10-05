import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const body = await request.json();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "No autorizado" },
      { status: 401 }
    );
  }

  const response = await fetch(
    "http://localhost:8000/api/products",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(body)
    }
  );

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      data,
      { status: response.status }
    );
  }

  revalidatePath("/admin");
  revalidatePath("/productos");

  return NextResponse.json(data);
}