import Image from "next/image";
import {
  MapPin,
  MessageCircle,
  ShieldCheck,
  Clock,
  Instagram,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="CloudPod SLZ"
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              <span className="text-lg font-bold text-foreground">
                CloudPod SLZ
              </span>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              Sua loja de pods e vapes em Sao Luis do Maranhao. Produtos
              originais com entrega rapida e total sigilo.
            </p>
            <a
              href="https://instagram.com/cloudpodslz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Instagram className="h-4 w-4" />
              @cloudpodslz
            </a>
          </div>

          {/* Info */}
          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">
              Informacoes
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Entrega apenas em Sao Luis - MA</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-primary" />
                <span>Seg a Sab, 9h as 20h</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MessageCircle className="h-4 w-4 text-primary" />
                <span>(98) 8556-6601</span>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">
              Avisos Legais
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span>
                  Produto exclusivo para maiores de 18 anos. Venda proibida para
                  menores.
                </span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span>
                  Mantemos total sigilo sobre suas compras. Embalagem discreta
                  garantida.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            CloudPod SLZ - Todos os direitos reservados. Produto destinado
            exclusivamente a maiores de 18 anos.
          </p>
        </div>
      </div>
    </footer>
  );
}
