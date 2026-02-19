"use client";

import Image from "next/image";
import { ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AgeGateProps {
  onConfirm: () => void;
}

export function AgeGate({ onConfirm }: AgeGateProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-2xl">
        <Image
          src="/images/logo.png"
          alt="CloudPod SLZ"
          width={100}
          height={100}
          className="mx-auto mb-4 h-20 w-20 object-contain"
          priority
        />

        <h2 className="mb-2 text-2xl font-bold text-foreground">
          Verificacao de Idade
        </h2>

        <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
          A <span className="font-semibold text-foreground">CloudPod SLZ</span> vende
          produtos destinados exclusivamente para{" "}
          <span className="font-semibold text-primary">maiores de 18 anos</span>
          . Ao continuar, voce confirma que possui 18 anos ou mais.
        </p>

        <div className="mb-4 rounded-lg bg-secondary p-3">
          <p className="text-xs leading-relaxed text-secondary-foreground">
            Mantemos total sigilo sobre suas compras e dados pessoais.
            Embalagem discreta garantida.
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 border-border text-muted-foreground bg-transparent"
            onClick={() => window.history.back()}
          >
            <X className="mr-2 h-4 w-4" />
            Sair
          </Button>
          <Button
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={onConfirm}
          >
            <ShieldCheck className="mr-2 h-4 w-4" />
            Tenho 18+
          </Button>
        </div>
      </div>
    </div>
  );
}
