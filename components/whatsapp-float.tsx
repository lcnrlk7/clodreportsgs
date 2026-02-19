"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  const handleClick = () => {
    const message =
      "Ola! Vim pelo site da CloudPod SLZ e gostaria de saber mais sobre os produtos. Estamos com frete de R$5 a R$10 para todo SLZ, certo?";
    const phone = "559885566601";
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-3 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110 hover:bg-green-600 md:bottom-6 md:right-6 md:h-14 md:w-14"
      aria-label="Falar pelo WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
}
