import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  const response = await fetch(
    'http://localhost:8000/api/register',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    }
  );

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      {
        message: data.message || 'Error al registrar usuario'
      },
      {
        status: response.status
      }
    );
  }

  return NextResponse.json({
    message: data.message,
    user: data.user
  });
}