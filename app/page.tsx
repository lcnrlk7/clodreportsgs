"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { HeroBanner } from "@/components/hero-banner";
import { ProductGrid } from "@/components/product-grid";
import { ProductDetail } from "@/components/product-detail";
import { CartDrawer } from "@/components/cart-drawer";
import { CheckoutModal } from "@/components/checkout-modal";
import { AgeGate } from "@/components/age-gate";
import { DeliveryMap } from "@/components/delivery-map";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import type { Product } from "@/lib/products";

export default function Home() {
  const [ageVerified, setAgeVerified] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const verified = sessionStorage.getItem("age_verified");
    if (verified === "true") {
      setAgeVerified(true);
    }
  }, []);

  const handleAgeConfirm = () => {
    sessionStorage.setItem("age_verified", "true");
    setAgeVerified(true);
  };

  if (!mounted) return null;

  return (
    <>
      {!ageVerified && <AgeGate onConfirm={handleAgeConfirm} />}

      <div
        className={`min-h-screen bg-background ${!ageVerified ? "pointer-events-none select-none blur-sm" : ""}`}
      >
        <Header
          onCartOpen={() => setCartOpen(true)}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <HeroBanner />

        <main className="mx-auto max-w-7xl px-3 py-6 md:px-4 md:py-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-foreground md:text-2xl">
              {activeCategory === "all"
                ? "Todos os Produtos"
                : activeCategory === "5k"
                  ? "Ate 5.000 Puffs"
                  : activeCategory === "8k"
                    ? "8.000 Puffs"
                    : activeCategory === "12k"
                      ? "12.000 Puffs"
                      : activeCategory === "20k-plus"
                        ? "20.000+ Puffs"
                        : activeCategory === "pod-system"
                          ? "Pod Systems"
                          : "Kits / Vapes"}
            </h2>
            <p className="text-sm text-muted-foreground">
              Entrega somente em Sao Luis - MA
            </p>
          </div>

          <ProductGrid
            category={activeCategory}
            onViewDetails={setSelectedProduct}
          />
        </main>

        <DeliveryMap />

        <Footer />

        <WhatsAppFloat />
      </div>

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onCheckout={() => {
            setSelectedProduct(null);
            setCheckoutOpen(true);
          }}
        />
      )}

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </>
  );
}
