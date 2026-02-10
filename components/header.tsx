"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { ShoppingCart, Menu, X, Instagram, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cartStore } from "@/lib/cart-store";

interface HeaderProps {
  onCartOpen: () => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const navCategories = [
  { id: "all", label: "Todos" },
  { id: "5k", label: "Ate 5K Puffs" },
  { id: "8k", label: "8K Puffs" },
  { id: "12k", label: "12K Puffs" },
  { id: "20k-plus", label: "20K+ Puffs" },
  { id: "pod-system", label: "Pod Systems" },
  { id: "kit", label: "Kits / Vapes" },
];

export function Header({
  onCartOpen,
  activeCategory,
  onCategoryChange,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItems = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getSnapshot
  );
  const itemCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      {/* Banner horario de entrega */}
      <div className="bg-primary px-4 py-2 text-center">
        <p className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wide text-primary-foreground md:text-sm">
          <Clock className="h-3.5 w-3.5" />
          ENTREGAS ONLINE ATE AS 2H DA MANHA - Pedidos abertos agora!
        </p>
      </div>
      <div className="mx-auto max-w-7xl px-3 md:px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="CloudPod SLZ"
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
            />
            <div>
              <h1 className="text-lg font-bold leading-tight text-foreground">
                CloudPod SLZ
              </h1>
              <a
                href="https://instagram.com/cloudpodslz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                <Instagram className="h-3 w-3" />
                <span>@cloudpodslz</span>
              </a>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="relative border-border bg-transparent"
              onClick={onCartOpen}
              aria-label="Abrir carrinho"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary p-0 text-xs text-primary-foreground">
                  {itemCount}
                </Badge>
              )}
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="border-border md:hidden bg-transparent"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="border-t border-border pb-4 pt-2 md:hidden">
            <div className="flex flex-wrap gap-2">
              {navCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onCategoryChange(cat.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    activeCategory === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
