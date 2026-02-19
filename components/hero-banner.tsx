"use client";

import Image from "next/image";
import { Truck, Shield, Clock, MessageCircle } from "lucide-react";

export function HeroBanner() {
  return (
    <section className="border-b border-border bg-secondary">
      {/* Banner Promocional */}
      <div className="relative w-full overflow-hidden">
        <Image
          src="/images/banner.png"
          alt="CloudPod SLZ - Somos a Melhor Loja de Pods e Descartaveis de SLZ! Entregamos ate 2h da Manha! Venda apenas para maiores de 18 anos."
          width={1400}
          height={700}
          className="h-auto w-full object-cover"
          priority
        />
      </div>

      {/* Info Cards */}
      <div className="mx-auto max-w-7xl px-3 py-4 md:px-4 md:py-8">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
          <div className="flex flex-col items-center gap-1.5 rounded-xl bg-background p-3 text-center shadow-sm md:gap-2 md:p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 md:h-10 md:w-10">
              <Truck className="h-4 w-4 text-primary md:h-5 md:w-5" />
            </div>
            <span className="text-[11px] font-medium leading-tight text-foreground md:text-xs">
              Frete R$5-R$10
            </span>
            <span className="text-[10px] text-muted-foreground md:text-xs">Toda SLZ</span>
          </div>

          <div className="flex flex-col items-center gap-1.5 rounded-xl bg-background p-3 text-center shadow-sm md:gap-2 md:p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 md:h-10 md:w-10">
              <Shield className="h-4 w-4 text-primary md:h-5 md:w-5" />
            </div>
            <span className="text-[11px] font-medium leading-tight text-foreground md:text-xs">
              Total Sigilo
            </span>
            <span className="text-[10px] text-muted-foreground md:text-xs">
              Embalagem discreta
            </span>
          </div>

          <div className="flex flex-col items-center gap-1.5 rounded-xl bg-background p-3 text-center shadow-sm md:gap-2 md:p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 md:h-10 md:w-10">
              <Clock className="h-4 w-4 text-primary md:h-5 md:w-5" />
            </div>
            <span className="text-[11px] font-medium leading-tight text-foreground md:text-xs">
              Ate as 2h da Manha
            </span>
            <span className="text-[10px] text-muted-foreground md:text-xs">
              Entregas online
            </span>
          </div>

          <div className="flex flex-col items-center gap-1.5 rounded-xl bg-background p-3 text-center shadow-sm md:gap-2 md:p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 md:h-10 md:w-10">
              <MessageCircle className="h-4 w-4 text-primary md:h-5 md:w-5" />
            </div>
            <span className="text-[11px] font-medium leading-tight text-foreground md:text-xs">
              Pague via PIX
            </span>
            <span className="text-[10px] text-muted-foreground md:text-xs">
              Rapido e seguro
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
