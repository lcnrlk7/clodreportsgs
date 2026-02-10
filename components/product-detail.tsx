"use client";

import { useState } from "react";
import {
  ShoppingCart,
  Check,
  X,
  Minus,
  Plus,
  CreditCard,
  Package,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/products";
import { cartStore } from "@/lib/cart-store";


interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onCheckout: () => void;
}

export function ProductDetail({ product, onClose, onCheckout }: ProductDetailProps) {
  const [selectedFlavor, setSelectedFlavor] = useState(
    product.flavors?.[0] || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const isOutOfStock = product.stock === 0;

  const handleAdd = () => {
    if (isOutOfStock) return;
    for (let i = 0; i < quantity; i++) {
      cartStore.addItem(product, selectedFlavor || undefined);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWhatsApp = () => {
    const flavorText = selectedFlavor ? ` - Sabor: ${selectedFlavor}` : "";
    const message = `Ola! Tenho interesse no produto: *${product.name}*${flavorText} (${quantity}x). Valor: R$ ${(product.price * quantity).toFixed(2).replace(".", ",")}. Gostaria de finalizar a compra pelo WhatsApp!`;
    const whatsPhone = "559885566601";
    window.open(
      `https://wa.me/${whatsPhone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    for (let i = 0; i < quantity; i++) {
      cartStore.addItem(product, selectedFlavor || undefined);
    }
    onClose();
    onCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 backdrop-blur-sm md:items-center">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-background shadow-2xl md:rounded-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background p-4">
          <h2 className="text-lg font-bold text-foreground">
            Detalhes do Produto
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4 md:p-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
              {product.originalPrice && (
                <Badge className="absolute left-3 top-3 bg-destructive text-destructive-foreground">
                  {Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100
                  )}
                  {"% OFF"}
                </Badge>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <p className="mb-1 text-sm font-medium uppercase tracking-wider text-primary">
                {product.brand}
              </p>
              <h3 className="mb-2 text-2xl font-bold text-foreground">
                {product.name}
              </h3>
              <p className="mb-4 leading-relaxed text-muted-foreground text-sm">
                {product.description}
              </p>

              {/* Stock */}
              <div className="mb-4 flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span
                  className={`text-sm font-medium ${product.stock > 5 ? "text-green-600" : product.stock > 0 ? "text-orange-500" : "text-destructive"}`}
                >
                  {product.stock > 5
                    ? `${product.stock} em estoque`
                    : product.stock > 0
                      ? `Apenas ${product.stock} restantes!`
                      : "Produto esgotado"}
                </span>
              </div>

              {/* Consult Flavors via WhatsApp */}
              {product.consultFlavors && (
                <div className="mb-4 flex items-center gap-2 rounded-lg bg-green-50 p-3">
                  <MessageCircle className="h-5 w-5 shrink-0 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      Varios sabores disponiveis!
                    </p>
                    <p className="text-xs text-green-600">
                      Consulte os sabores pelo nosso WhatsApp antes de comprar.
                    </p>
                  </div>
                </div>
              )}

              {/* Flavors */}
              {product.flavors && product.flavors.length > 0 && (
                <div className="mb-4">
                  <p className="mb-2 text-sm font-medium text-foreground">
                    Sabor:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.flavors.map((flavor) => (
                      <button
                        key={flavor}
                        onClick={() => setSelectedFlavor(flavor)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                          selectedFlavor === flavor
                            ? "bg-primary text-primary-foreground"
                            : "border border-border bg-background text-foreground hover:bg-secondary"
                        }`}
                      >
                        {flavor}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price & Quantity */}
              <div className="mb-4 rounded-xl bg-secondary p-4">
                <div className="mb-3 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">
                    {"R$ " +
                      (product.price * quantity).toFixed(2).replace(".", ",")}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {"R$ " +
                        (product.originalPrice * quantity)
                          .toFixed(2)
                          .replace(".", ",")}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Qtd:</span>
                  <div className="flex items-center rounded-lg border border-border bg-background">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Diminuir quantidade"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-[2rem] text-center text-sm font-semibold text-foreground">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(Math.min(product.stock, quantity + 1))
                      }
                      className="px-3 py-1.5 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Aumentar quantidade"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <Button
                  className={`w-full transition-all ${
                    added
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                  onClick={handleAdd}
                  disabled={isOutOfStock}
                >
                  {added ? (
                    <>
                      <Check className="mr-2 h-4 w-4" /> Adicionado ao
                      Carrinho!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" /> Adicionar ao
                      Carrinho
                    </>
                  )}
                </Button>

                <Button
                  className="w-full bg-green-600 text-white hover:bg-green-700"
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                >
                  <CreditCard className="mr-2 h-4 w-4" /> Comprar Agora
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-green-300 bg-transparent text-green-700 hover:bg-green-50 hover:text-green-800"
                  onClick={handleWhatsApp}
                  disabled={isOutOfStock}
                >
                  <MessageCircle className="mr-2 h-4 w-4" /> Finalizar pelo WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
