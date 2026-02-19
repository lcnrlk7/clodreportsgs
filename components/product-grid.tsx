"use client";

import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/products";
import { getProductsByCategory } from "@/lib/products";
import { Package } from "lucide-react";

interface ProductGridProps {
  category: string;
  onViewDetails: (product: Product) => void;
}

export function ProductGrid({ category, onViewDetails }: ProductGridProps) {
  const products = getProductsByCategory(category);

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Package className="mb-4 h-12 w-12 text-muted-foreground/30" />
        <p className="text-muted-foreground">
          Nenhum produto encontrado nessa categoria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}
