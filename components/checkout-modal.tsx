"use client";

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";
import {
  X,
  MapPin,
  MessageCircle,
  CreditCard,
  Copy,
  Check,
  Truck,
  Info,
  Loader2,
  QrCode,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cartStore } from "@/lib/cart-store";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

const neighborhoods = [
  { name: "Centro", fee: 5 },
  { name: "Renascenca", fee: 5 },
  { name: "Calhau", fee: 7 },
  { name: "Cohama", fee: 6 },
  { name: "Turu", fee: 7 },
  { name: "Cohatrac", fee: 8 },
  { name: "Maiobao", fee: 9 },
  { name: "Forquilha", fee: 8 },
  { name: "Anil", fee: 7 },
  { name: "Vinhais", fee: 6 },
  { name: "Angelim", fee: 8 },
  { name: "Sao Francisco", fee: 6 },
  { name: "Olho d'Agua", fee: 7 },
  { name: "Outro bairro (SLZ)", fee: 10 },
];

type CheckoutStep = "info" | "payment" | "pix" | "confirmed";

export function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const items = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getSnapshot
  );
  const [step, setStep] = useState<CheckoutStep>("info");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [referencia, setReferencia] = useState("");
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState("");
  // Phone mask: (98) 99999-9999
  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    let formatted = "";
    if (digits.length === 0) {
      formatted = "";
    } else if (digits.length <= 2) {
      formatted = `(${digits}`;
    } else if (digits.length <= 7) {
      formatted = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else {
      formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }
    setPhone(formatted);
  };
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "whatsapp">("pix");

  // PIX state
  const [pixLoading, setPixLoading] = useState(false);
  const [pixError, setPixError] = useState("");
  const [pixData, setPixData] = useState<{
    transactionId: string;
    pixCode: string;
    status: string;
  } | null>(null);
  const [pixCopied, setPixCopied] = useState(false);
  const [pixStatus, setPixStatus] = useState<"PENDING" | "COMPLETED">("PENDING");
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const selectedNeighborhood = neighborhoods.find(
    (n) => n.name === neighborhood
  );
  const shippingFee = selectedNeighborhood?.fee || 0;
  const total = subtotal + shippingFee;

  const whatsappPhone = "559885566601";

  // CEP auto-fill via ViaCEP
  const handleCepChange = async (value: string) => {
    const cleanCep = value.replace(/\D/g, "");
    // Format CEP as 00000-000
    if (cleanCep.length <= 5) {
      setCep(cleanCep);
    } else {
      setCep(`${cleanCep.slice(0, 5)}-${cleanCep.slice(5, 8)}`);
    }
    setCepError("");

    if (cleanCep.length === 8) {
      setCepLoading(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await res.json();
        if (data.erro) {
          setCepError("CEP nao encontrado. Verifique e tente novamente.");
        } else {
          setRua(data.logradouro || "");
          // Try to match neighborhood
          if (data.bairro) {
            const match = neighborhoods.find(
              (n) => n.name.toLowerCase() === data.bairro.toLowerCase()
            );
            if (match) {
              setNeighborhood(match.name);
            }
          }
          setReferencia(data.complemento || "");
        }
      } catch {
        setCepError("Erro ao buscar CEP. Tente novamente.");
      } finally {
        setCepLoading(false);
      }
    }
  };

  // Stop polling on unmount or close
  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }, []);

  // Poll payment status
  const startPolling = useCallback(
    (transactionId: string) => {
      stopPolling();
      pollingRef.current = setInterval(async () => {
        try {
          const res = await fetch(
            `/api/pix/status?transactionId=${encodeURIComponent(transactionId)}`
          );
          if (res.ok) {
            const data = await res.json();
            if (data.status === "COMPLETED") {
              setPixStatus("COMPLETED");
              setStep("confirmed");
              stopPolling();
            }
          }
        } catch {
          // silently retry
        }
      }, 5000);
    },
    [stopPolling]
  );

  // Generate PIX
  const handleGeneratePix = async () => {
    setPixLoading(true);
    setPixError("");
    try {
      const itemsSummary = items
        .map(
          (item) =>
            `${item.product.name}${item.selectedFlavor ? ` (${item.selectedFlavor})` : ""} x${item.quantity}`
        )
        .join(", ");

      const res = await fetch("/api/pix/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          customerName: name,
          customerPhone: phone.replace(/\D/g, ""),
          itemTitle: itemsSummary || "Produtos CloudPod SLZ",
          itemQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erro ao gerar PIX");
      }

      const data = await res.json();
      setPixData(data);
      setPixStatus("PENDING");
      setStep("pix");
      startPolling(data.transactionId);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro ao gerar PIX. Tente novamente.";
      setPixError(message);
    } finally {
      setPixLoading(false);
    }
  };

  const handleCopyPix = () => {
    if (pixData?.pixCode) {
      navigator.clipboard.writeText(pixData.pixCode);
      setPixCopied(true);
      setTimeout(() => setPixCopied(false), 2500);
    }
  };



  const handleWhatsAppCheckout = () => {
    const itemsList = items
      .map(
        (item) =>
          `- ${item.product.name}${item.selectedFlavor ? ` (${item.selectedFlavor})` : ""} x${item.quantity} = R$ ${(item.product.price * item.quantity).toFixed(2).replace(".", ",")}`
      )
      .join("\n");

    const message = `Ola! Gostaria de finalizar meu pedido na CloudPod SLZ:

${itemsList}

Subtotal: R$ ${subtotal.toFixed(2).replace(".", ",")}
Frete (${neighborhood}): R$ ${shippingFee.toFixed(2).replace(".", ",")}
*Total: R$ ${total.toFixed(2).replace(".", ",")}*

*Dados de entrega:*
Nome: ${name}
Telefone: ${phone}
CEP: ${cep || "Nao informado"}
Rua: ${rua}
Numero: ${numero}
Complemento: ${complemento || "Nenhum"}
Ponto de referencia: ${referencia || "Nenhum"}
Bairro: ${neighborhood}

Forma de pagamento: ${paymentMethod === "pix" ? "PIX" : "Combinar pelo WhatsApp"}
${pixData?.transactionId ? `ID do pagamento: ${pixData.transactionId}` : ""}

Aguardo confirmacao do endereco e do pedido!`;

    window.open(
      `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const isInfoComplete = name && phone && neighborhood && cep && rua && numero;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 backdrop-blur-sm md:items-center">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-background shadow-2xl md:rounded-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background p-4">
          <h2 className="text-lg font-bold text-foreground">
            {step === "info" && "Dados de Entrega"}
            {step === "payment" && "Pagamento"}
            {step === "pix" && "Pagar com PIX"}
            {step === "confirmed" && "Pagamento Confirmado"}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              stopPolling();
              onClose();
            }}
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4 md:p-6">
          {/* ========== STEP: INFO ========== */}
          {step === "info" && (
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3 rounded-xl bg-secondary p-4">
                <Truck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Entrega apenas em Sao Luis - MA
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Frete de R$5 a R$10 dependendo da sua localizacao em SLZ.
                    Entrega no mesmo dia para pedidos ate 18h.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
                <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Vamos confirmar tudo pelo WhatsApp
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Antes de enviar seu pedido, entraremos em contato pelo Zap para confirmar
                    certinho seu endereco, horario de entrega e forma de pagamento.
                  </p>
                </div>
              </div>

              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Seus dados
              </p>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div>
                  <Label htmlFor="name" className="mb-1.5 text-sm font-medium text-foreground">
                    Nome completo *
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    className="border-border bg-background"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="mb-1.5 text-sm font-medium text-foreground">
                    WhatsApp / Telefone *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="(98) 99999-9999"
                    maxLength={15}
                    className="border-border bg-background"
                  />
                </div>
              </div>

              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Bairro *
              </p>
              <div className="grid grid-cols-2 gap-2">
                {neighborhoods.map((n) => (
                  <button
                    key={n.name}
                    onClick={() => setNeighborhood(n.name)}
                    className={`flex items-center justify-between rounded-lg border px-3 py-2 text-left text-xs transition-colors ${
                      neighborhood === n.name
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-foreground hover:border-primary/30 hover:bg-secondary"
                    }`}
                  >
                    <span>{n.name}</span>
                    <span className="font-semibold text-primary">
                      {"R$" + n.fee}
                    </span>
                  </button>
                ))}
              </div>

              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Endereco completo
              </p>

              <div>
                <Label htmlFor="cep" className="mb-1.5 text-sm font-medium text-foreground">
                  CEP *
                </Label>
                <div className="relative">
                  <Input
                    id="cep"
                    value={cep}
                    onChange={(e) => handleCepChange(e.target.value)}
                    placeholder="65000-000"
                    maxLength={9}
                    className="border-border bg-background"
                  />
                  {cepLoading && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    </div>
                  )}
                </div>
                {cepError && (
                  <p className="mt-1 text-xs text-destructive">{cepError}</p>
                )}
                <p className="mt-1 text-xs text-muted-foreground">
                  Digite o CEP para preencher o endereco automaticamente
                </p>
              </div>

              <div>
                <Label htmlFor="rua" className="mb-1.5 text-sm font-medium text-foreground">
                  Rua / Avenida *
                </Label>
                <Input
                  id="rua"
                  value={rua}
                  onChange={(e) => setRua(e.target.value)}
                  placeholder="Ex: Rua das Palmeiras"
                  className="border-border bg-background"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="numero" className="mb-1.5 text-sm font-medium text-foreground">
                    Numero *
                  </Label>
                  <Input
                    id="numero"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    placeholder="123"
                    className="border-border bg-background"
                  />
                </div>
                <div>
                  <Label htmlFor="complemento" className="mb-1.5 text-sm font-medium text-foreground">
                    Complemento
                  </Label>
                  <Input
                    id="complemento"
                    value={complemento}
                    onChange={(e) => setComplemento(e.target.value)}
                    placeholder="Apto, bloco..."
                    className="border-border bg-background"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="referencia" className="mb-1.5 text-sm font-medium text-foreground">
                  Ponto de referencia
                </Label>
                <Input
                  id="referencia"
                  value={referencia}
                  onChange={(e) => setReferencia(e.target.value)}
                  placeholder="Proximo ao mercado, em frente a farmacia..."
                  className="border-border bg-background"
                />
              </div>

              <div className="rounded-lg bg-secondary p-3">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    Total sigilo garantido.
                  </span>{" "}
                  Suas informacoes sao usadas apenas para entrega. Embalagem
                  100% discreta, sem identificacao do conteudo.
                </p>
              </div>

              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setStep("payment")}
                disabled={!isInfoComplete}
              >
                <MapPin className="mr-2 h-4 w-4" /> Continuar para Pagamento
              </Button>
            </div>
          )}

          {/* ========== STEP: PAYMENT ========== */}
          {step === "payment" && (
            <div className="flex flex-col gap-4">
              {/* Order Summary */}
              <div className="rounded-xl border border-border p-4">
                <p className="mb-2 text-sm font-semibold text-foreground">
                  Resumo do Pedido
                </p>
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedFlavor}`}
                    className="flex justify-between py-1"
                  >
                    <span className="text-xs text-muted-foreground">
                      {item.product.name}
                      {item.selectedFlavor ? ` (${item.selectedFlavor})` : ""}{" "}
                      {"x" + item.quantity}
                    </span>
                    <span className="text-xs font-medium text-foreground">
                      {"R$ " +
                        (item.product.price * item.quantity)
                          .toFixed(2)
                          .replace(".", ",")}
                    </span>
                  </div>
                ))}
                <div className="mt-2 border-t border-border pt-2">
                  <div className="flex justify-between py-0.5">
                    <span className="text-xs text-muted-foreground">Subtotal</span>
                    <span className="text-xs text-foreground">
                      {"R$ " + subtotal.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-xs text-muted-foreground">
                      {"Frete (" + neighborhood + ")"}
                    </span>
                    <span className="text-xs text-foreground">
                      {"R$ " + shippingFee.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                  <div className="mt-1 flex justify-between border-t border-border pt-1">
                    <span className="text-sm font-bold text-foreground">Total</span>
                    <span className="text-sm font-bold text-primary">
                      {"R$ " + total.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery Address Summary */}
              <div className="rounded-xl bg-secondary p-4">
                <div className="mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">Entregar em</p>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {rua}, {numero}
                  {complemento ? ` - ${complemento}` : ""}
                </p>
                <p className="text-xs text-muted-foreground">
                  {neighborhood}
                  {cep ? ` - CEP: ${cep}` : ""} - Sao Luis/MA
                </p>
                {referencia && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Ref: {referencia}
                  </p>
                )}
                <button
                  onClick={() => setStep("info")}
                  className="mt-2 text-xs font-semibold text-primary hover:underline"
                >
                  Alterar endereco
                </button>
              </div>

              {/* Payment Methods */}
              <div>
                <p className="mb-2 text-sm font-semibold text-foreground">
                  Forma de Pagamento
                </p>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setPaymentMethod("pix")}
                    className={`flex items-center gap-3 rounded-xl border p-4 transition-colors ${
                      paymentMethod === "pix"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <CreditCard
                      className={`h-5 w-5 ${paymentMethod === "pix" ? "text-primary" : "text-muted-foreground"}`}
                    />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-foreground">PIX</p>
                      <p className="text-xs text-muted-foreground">
                        Pagamento instantaneo via Copia e Cola
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={() => setPaymentMethod("whatsapp")}
                    className={`flex items-center gap-3 rounded-xl border p-4 transition-colors ${
                      paymentMethod === "whatsapp"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <MessageCircle
                      className={`h-5 w-5 ${paymentMethod === "whatsapp" ? "text-primary" : "text-muted-foreground"}`}
                    />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-foreground">
                        Combinar pelo WhatsApp
                      </p>
                      <p className="text-xs text-muted-foreground">Fale direto conosco</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* WhatsApp confirmation reminder */}
              <div className="flex items-start gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3">
                <MessageCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Apos finalizar, vamos confirmar seu endereco e pedido certinho
                  pelo{" "}
                  <span className="font-semibold text-foreground">WhatsApp</span>{" "}
                  antes de despachar a entrega.
                </p>
              </div>

              {/* PIX Error */}
              {pixError && (
                <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                  <p className="text-xs text-destructive">{pixError}</p>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border-border bg-transparent"
                  onClick={() => setStep("info")}
                >
                  Voltar
                </Button>
                <Button
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={pixLoading}
                  onClick={() => {
                    if (paymentMethod === "whatsapp") {
                      handleWhatsAppCheckout();
                    } else {
                      handleGeneratePix();
                    }
                  }}
                >
                  {pixLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Gerando PIX...
                    </>
                  ) : paymentMethod === "whatsapp" ? (
                    <>
                      <MessageCircle className="mr-2 h-4 w-4" /> Ir para WhatsApp
                    </>
                  ) : (
                    <>
                      <QrCode className="mr-2 h-4 w-4" /> Gerar PIX
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* ========== STEP: PIX (QR Code & Copy/Paste) ========== */}
          {step === "pix" && pixData && (
            <div className="flex flex-col gap-4">
              {/* Status Indicator */}
              <div className="flex items-center gap-3 rounded-xl bg-secondary p-4">
                {pixStatus === "PENDING" ? (
                  <Loader2 className="h-5 w-5 flex-shrink-0 animate-spin text-primary" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500" />
                )}
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {pixStatus === "PENDING"
                      ? "Aguardando pagamento..."
                      : "Pagamento confirmado!"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {pixStatus === "PENDING"
                      ? "Copie o codigo PIX e pague pelo app do seu banco"
                      : "Seu pedido foi pago com sucesso"}
                  </p>
                </div>
              </div>

              {/* Total */}
              <div className="rounded-xl border border-primary bg-primary/5 p-4 text-center">
                <p className="text-xs text-muted-foreground">Valor a pagar</p>
                <p className="text-2xl font-bold text-primary">
                  {"R$ " + total.toFixed(2).replace(".", ",")}
                </p>
              </div>

              {/* PIX Code - Copy/Paste */}
              {pixData.pixCode && (
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Codigo PIX Copia e Cola
                  </p>
                  <div className="rounded-lg border border-border bg-secondary p-3">
                    <p className="mb-2 break-all font-mono text-xs leading-relaxed text-foreground">
                      {pixData.pixCode}
                    </p>
                    <Button
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={handleCopyPix}
                    >
                      {pixCopied ? (
                        <>
                          <Check className="mr-2 h-4 w-4" /> Codigo copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" /> Copiar codigo PIX
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {/* Instructions */}
              <div className="rounded-xl bg-secondary p-4">
                <p className="mb-2 text-xs font-semibold text-foreground">
                  Como pagar:
                </p>
                <ol className="flex flex-col gap-1.5 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      1
                    </span>
                    Abra o app do seu banco
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      2
                    </span>
                    Escolha pagar com PIX (Copia e Cola)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      3
                    </span>
                    Cole o codigo PIX copiado acima
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      4
                    </span>
                    Confirme o pagamento. Atualizamos automaticamente!
                  </li>
                </ol>
              </div>

              {/* WhatsApp fallback */}
              <div className="flex items-start gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3">
                <MessageCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Apos o pagamento, vamos confirmar pelo{" "}
                  <span className="font-semibold text-foreground">WhatsApp</span>{" "}
                  seu endereco e horario de entrega.
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border-border bg-transparent"
                  onClick={() => {
                    stopPolling();
                    setStep("payment");
                  }}
                >
                  Voltar
                </Button>
                <Button
                  className="flex-1 border-green-300 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
                  variant="outline"
                  onClick={handleWhatsAppCheckout}
                >
                  <MessageCircle className="mr-2 h-4 w-4" /> Falar no WhatsApp
                </Button>
              </div>
            </div>
          )}

          {/* ========== STEP: CONFIRMED ========== */}
          {step === "confirmed" && (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Pagamento Confirmado!
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Seu pagamento de{" "}
                <span className="font-bold text-primary">
                  {"R$ " + total.toFixed(2).replace(".", ",")}
                </span>{" "}
                foi recebido com sucesso.
              </p>

              <div className="w-full rounded-xl bg-secondary p-4 text-left">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Entrega:</span>{" "}
                  {rua}, {numero}
                  {complemento ? ` - ${complemento}` : ""} - {neighborhood}
                  {cep ? ` (CEP: ${cep})` : ""}
                </p>
                {referencia && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">Referencia:</span>{" "}
                    {referencia}
                  </p>
                )}
                <p className="mt-1 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Sigilo total:</span>{" "}
                  embalagem discreta, sem identificacao.
                </p>
              </div>

              <div className="w-full rounded-lg border border-primary/20 bg-primary/5 p-3">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Vamos entrar em contato pelo{" "}
                  <span className="font-semibold text-foreground">WhatsApp</span>{" "}
                  para confirmar certinho seu endereco e horario de entrega antes de enviar.
                </p>
              </div>

              <Button
                className="w-full border-green-300 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
                variant="outline"
                onClick={handleWhatsAppCheckout}
              >
                <MessageCircle className="mr-2 h-4 w-4" /> Falar no WhatsApp
              </Button>

              <Button
                variant="ghost"
                className="text-muted-foreground"
                onClick={() => {
                  cartStore.clear();
                  stopPolling();
                  onClose();
                  setStep("info");
                  setPixData(null);
                }}
              >
                Voltar para Loja
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
