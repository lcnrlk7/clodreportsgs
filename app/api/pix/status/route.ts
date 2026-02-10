import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const transactionId = searchParams.get("transactionId");

    if (!transactionId) {
      return NextResponse.json(
        { error: "transactionId e obrigatorio." },
        { status: 400 }
      );
    }

    const apiUrl = process.env.DUTIFY_API_URL;

    if (!apiUrl) {
      return NextResponse.json(
        { error: "Configuracao de pagamento ausente no servidor." },
        { status: 500 }
      );
    }

    const statusUrl = `${apiUrl}?transactionId=${encodeURIComponent(transactionId)}`;

    const response = await fetch(statusUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("[v0] Dutify status error:", response.status, errorData);
      return NextResponse.json(
        { error: "Erro ao consultar status." },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      status: data.status,
      paidAt: data.paidAt || null,
    });
  } catch (error) {
    console.error("[v0] PIX status error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
