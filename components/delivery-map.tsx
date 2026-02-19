"use client";

import { MapPin, Truck, Clock, Shield } from "lucide-react";

const deliveryZones = [
  { zone: "Centro / Praia Grande", fee: "R$ 5", time: "30-50 min" },
  { zone: "Renascenca / Sao Francisco", fee: "R$ 5", time: "30-50 min" },
  { zone: "Calhau / Ponta do Farol", fee: "R$ 7", time: "40-60 min" },
  { zone: "Cohama / Vinhais", fee: "R$ 6", time: "35-55 min" },
  { zone: "Turu / Anil", fee: "R$ 7", time: "40-60 min" },
  { zone: "Cohatrac / Maiobao", fee: "R$ 8-9", time: "50-70 min" },
  { zone: "Demais bairros SLZ", fee: "R$ 10", time: "60-90 min" },
];

export function DeliveryMap() {
  return (
    <section className="border-b border-border bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="mb-8 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            Area de Entrega
          </span>
          <h2 className="text-balance text-2xl font-bold text-foreground md:text-3xl">
            Entregamos em toda Sao Luis
          </h2>
          <p className="mx-auto mt-2 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
            Frete de R$5 a R$10 dependendo da sua localizacao. Entrega no mesmo
            dia para pedidos ate 18h.
          </p>
        </div>

        <div className="grid items-start gap-6 md:grid-cols-2">
          {/* Map Embed */}
          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127487.04325889498!2d-44.33851015!3d-2.53073395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7f68e6d30e61cb1%3A0x4e52f51db0e2c642!2sS%C3%A3o%20Lu%C3%ADs%2C%20MA!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de Sao Luis - Area de entrega CloudPod SLZ"
              className="w-full"
            />
            <div className="flex items-center gap-2 bg-background px-4 py-3">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                Sao Luis, Maranhao
              </span>
              <span className="text-xs text-muted-foreground">
                - Entrega exclusiva na capital
              </span>
            </div>
          </div>

          {/* Delivery Zones Table */}
          <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
              <div className="border-b border-border bg-primary/5 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">
                    Tabela de Frete por Regiao
                  </span>
                </div>
              </div>
              <div className="divide-y divide-border">
                {deliveryZones.map((zone) => (
                  <div
                    key={zone.zone}
                    className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-secondary/50"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      <span className="text-sm text-foreground">
                        {zone.zone}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {zone.time}
                      </span>
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                        {zone.fee}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sigilo card */}
            <div className="flex items-start gap-3 rounded-2xl border border-border bg-background p-4 shadow-sm">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Total sigilo garantido
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  Embalagem 100% discreta, sem nenhuma identificacao do
                  conteudo. Seus dados sao usados apenas para entrega.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
