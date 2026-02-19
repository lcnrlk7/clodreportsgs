"use client";

import { useSyncExternalStore } from "react";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cartStore } from "@/lib/cart-store";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartDrawer({ open, onClose, onCheckout }: CartDrawerProps) {
  const items = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getSnapshot
  );

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
        onClick={onClose}
        role="presentation"
      />

      {/* Drawer */}
      <div className="relative flex w-full max-w-md flex-col bg-background shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Seu Carrinho</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Fechar carrinho"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <ShoppingBag className="mb-4 h-12 w-12 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">
                Seu carrinho esta vazio
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedFlavor}`}
                  className="flex gap-3 rounded-xl border border-border bg-card p-3"
                >
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                    <img
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {item.product.name}
                        </p>
                        {item.selectedFlavor && (
                          <p className="text-xs text-muted-foreground">
                            {item.selectedFlavor}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() =>
                          cartStore.removeItem(
                            item.product.id,
                            item.selectedFlavor
                          )
                        }
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        aria-label={`Remover ${item.product.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-lg border border-border bg-background">
                        <button
                          onClick={() =>
                            cartStore.updateQuantity(
                              item.product.id,
                              item.quantity - 1,
                              item.selectedFlavor
                            )
                          }
                          className="px-2 py-1 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-[1.5rem] text-center text-xs font-semibold text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            cartStore.updateQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.selectedFlavor
                            )
                          }
                          className="px-2 py-1 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Aumentar quantidade"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="text-sm font-bold text-foreground">
                        {"R$ " +
                          (item.product.price * item.quantity)
                            .toFixed(2)
                            .replace(".", ",")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border bg-card p-4">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subtotal:</span>
              <span className="text-sm font-medium text-foreground">
                {"R$ " + total.toFixed(2).replace(".", ",")}
              </span>
            </div>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Frete (SLZ):
              </span>
              <span className="text-sm font-medium text-foreground">
                R$ 5,00 - R$ 10,00
              </span>
            </div>
            <div className="mb-4 flex items-center justify-between border-t border-border pt-2">
              <span className="font-semibold text-foreground">Total:</span>
              <span className="text-lg font-bold text-primary">
                {"R$ " +
                  total.toFixed(2).replace(".", ",") +
                  " + frete"}
              </span>
            </div>

            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={onCheckout}
            >
              Finalizar Pedido
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
