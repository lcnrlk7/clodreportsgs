import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { amount, customerName, customerPhone, itemTitle, itemQuantity } =
      await request.json();

    const apiUrl = process.env.DUTIFY_API_URL;

    if (!apiUrl) {
      return NextResponse.json(
        {
          error:
            "Configuracao de pagamento ausente no servidor. Verifique a variavel DUTIFY_API_URL.",
        },
        { status: 500 }
      );
    }

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Valor invalido." },
        { status: 400 }
      );
    }

    const amountInCents = Math.round(amount * 100);

    const body = {
      amount: amountInCents,
      description: "Pagamento CloudPod SLZ via Pix",
      customer: {
        name: customerName || "Cliente CloudPod",
        document: "75084469093",
        email: "contato@cloudpodslz.com",
        phone: customerPhone
          ? customerPhone.replace(/\D/g, "")
          : "98985566601",
      },
      item: {
        title: itemTitle || "Produtos CloudPod SLZ",
        price: amountInCents,
        quantity: itemQuantity || 1,
      },
      paymentMethod: "PIX",
      utm: "cloudpodslz-site",
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.error("[v0] Dutify error:", response.status, responseText);
      return NextResponse.json(
        { error: `Erro ao gerar PIX (${response.status}): ${responseText}` },
        { status: response.status }
      );
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      return NextResponse.json(
        { error: "Resposta invalida da API de pagamento." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      transactionId: data.transactionId,
      pixCode: data.pixCode,
      status: data.status,
    });
  } catch (error) {
    console.error("[v0] PIX create error:", error);
    return NextResponse.json(
      {
        error: `Erro interno do servidor: ${error instanceof Error ? error.message : "desconhecido"}`,
      },
      { status: 500 }
    );
  }
}
