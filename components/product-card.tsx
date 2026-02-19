"use client";

import React from "react"

import { useState } from "react";
import { ShoppingCart, Check, AlertTriangle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/products";
import { cartStore } from "@/lib/cart-store";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock === 0;

  // Extract flavor from product name (after the last " - ")
  const flavorMatch = product.name.match(/ - (.+)$/);
  const flavor = flavorMatch ? flavorMatch[1] : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    cartStore.addItem(product, product.flavors?.[0]);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg"
      onClick={() => onViewDetails(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onViewDetails(product)}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Flavor Badge - bottom left */}
        {flavor && (
          <div className="absolute bottom-2 left-2">
            <Badge className="bg-primary/90 text-primary-foreground text-[10px] font-semibold shadow-md backdrop-blur-sm">
              {flavor}
            </Badge>
          </div>
        )}

        {/* Stock Badge - top right */}
        <div className="absolute right-2 top-2">
          {isOutOfStock ? (
            <Badge className="bg-foreground/80 text-background text-[10px] font-bold shadow-md backdrop-blur-sm">
              Esgotado
            </Badge>
          ) : (
            <Badge className="bg-green-600/90 text-white text-[10px] font-bold shadow-md backdrop-blur-sm">
              {"Estoque: " + product.stock}
            </Badge>
          )}
        </div>

        {/* Discount / Low Stock Badges - top left */}
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {product.originalPrice && (
            <Badge className="bg-destructive text-destructive-foreground text-xs">
              {Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100
              )}
              {"% OFF"}
            </Badge>
          )}
          {isLowStock && (
            <Badge
              variant="outline"
              className="border-orange-300 bg-orange-50 text-orange-700 text-xs"
            >
              <AlertTriangle className="mr-1 h-3 w-3" />
              Ultimas unidades
            </Badge>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-2.5 md:p-4">
        <p className="mb-0.5 text-[10px] font-medium uppercase tracking-wider text-primary md:mb-1 md:text-xs">
          {product.brand}
        </p>
        <h3 className="mb-0.5 text-xs font-semibold text-foreground line-clamp-1 md:mb-1 md:text-base">
          {product.name}
        </h3>
        <p className="mb-1.5 text-[10px] text-muted-foreground line-clamp-2 md:mb-2 md:text-xs">
          {product.description}
        </p>

        {product.consultFlavors && (
          <div className="mb-2 flex items-center gap-1 rounded-md bg-green-50 px-2 py-1 md:mb-3">
            <MessageCircle className="h-3 w-3 shrink-0 text-green-600" />
            <span className="text-[10px] font-medium leading-tight text-green-700 md:text-[11px]">
              Consulte sabores pelo WhatsApp
            </span>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <div className="flex items-baseline gap-2">
            <p className="text-base font-bold text-foreground md:text-lg">
              {"R$ "}
              {product.price.toFixed(2).replace(".", ",")}
            </p>
            {product.originalPrice && (
              <p className="text-[10px] text-muted-foreground line-through md:text-xs">
                {"R$ "}
                {product.originalPrice.toFixed(2).replace(".", ",")}
              </p>
            )}
          </div>

          {product.bulkPrice && (
            <div className="rounded-md bg-amber-50 px-2 py-1">
              <span className="text-[10px] font-semibold text-amber-800 md:text-[11px]">
                {"Leve " + product.bulkPrice.minQty + " por R$ " + product.bulkPrice.priceEach.toFixed(2).replace(".", ",") + " cada"}
              </span>
            </div>
          )}

          <Button
            size="sm"
            className={`w-full text-[11px] transition-all md:text-xs ${
              added
                ? "bg-green-500 text-white hover:bg-green-600"
                : isOutOfStock
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            {added ? (
              <>
                <Check className="mr-1 h-3 w-3" /> Adicionado
              </>
            ) : (
              <>
                <ShoppingCart className="mr-1 h-3 w-3" /> Comprar
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
