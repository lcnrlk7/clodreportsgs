import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politica de Privacidade - CloudPod SLZ",
  description:
    "Politica de privacidade da CloudPod SLZ. Saiba como tratamos seus dados pessoais.",
};

export default function PoliticaPrivacidade() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/"
        className="mb-8 inline-flex items-center text-sm text-primary hover:underline"
      >
        {"< Voltar para a loja"}
      </Link>

      <h1 className="mb-6 text-2xl font-bold text-foreground">
        Politica de Privacidade
      </h1>

      <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            1. Coleta de Dados
          </h2>
          <p>
            Coletamos apenas os dados necessarios para processar seus pedidos:
            nome completo, telefone e endereco de entrega. Nenhum dado e
            compartilhado com terceiros.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            2. Uso dos Dados
          </h2>
          <p>
            Seus dados sao utilizados exclusivamente para fins de entrega e
            comunicacao sobre o status do seu pedido. Nao realizamos marketing
            sem consentimento.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            3. Seguranca
          </h2>
          <p>
            Utilizamos criptografia e boas praticas de seguranca para proteger
            seus dados pessoais. Pagamentos sao processados em ambiente seguro.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            4. Seus Direitos
          </h2>
          <p>
            Conforme a Lei Geral de Protecao de Dados (LGPD), voce tem direito
            a solicitar acesso, correcao ou exclusao dos seus dados pessoais a
            qualquer momento.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            5. Contato
          </h2>
          <p>
            Para duvidas sobre esta politica, entre em contato pelo nosso
            WhatsApp: (98) 8556-6601.
          </p>
        </section>
      </div>

      <p className="mt-8 text-xs text-muted-foreground">
        Ultima atualizacao: Fevereiro de 2026
      </p>
    </main>
  );
}
