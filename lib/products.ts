export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: "5k" | "8k" | "12k" | "20k-plus" | "pod-system" | "kit";
  stock: number;
  flavors?: string[];
  brand: string;
  featured?: boolean;
  consultFlavors?: boolean;
  bulkPrice?: { minQty: number; priceEach: number };
}

export const products: Product[] = [
  // ===== IGNITE V120 12.000 Puffs (> R$100 = 35% OFF) =====
  {
    id: "1",
    name: "IGNITE V120 12.000 Puffs - Sorvete de Melancia",
    description:
      "Pod descartavel IGNITE V120 com 12.000 puffs. Sabor sorvete de melancia refrescante e intenso.",
    price: 76.69,
    originalPrice: 117.99,
    image: "https://i.postimg.cc/Cx0jtnt1/IMG-9677.jpg",
    category: "12k",
    stock: 6,
    brand: "Ignite",
    featured: true,
  },
  {
    id: "2",
    name: "IGNITE V120 12.000 Puffs - Limonada",
    description:
      "Pod descartavel IGNITE V120 com 12.000 puffs. Sabor limonada fresca e citrica.",
    price: 76.69,
    originalPrice: 117.99,
    image: "https://i.postimg.cc/26MR2fgL/IMG-9737.png",
    category: "12k",
    stock: 7,
    brand: "Ignite",
    featured: true,
  },
  {
    id: "3",
    name: "IGNITE V250 25.000 Puffs - Menta Ice",
    description:
      "Pod descartavel IGNITE V250 com 25.000 puffs. Sabor menta gelada ultra refrescante.",
    price: 76.69,
    originalPrice: 117.99,
    image: "https://i.postimg.cc/prbcmVgm/IMG-9738.jpg",
    category: "20k-plus",
    stock: 5,
    brand: "Ignite",
  },

  // ===== IGNITE V50 5.000 Puffs (5K = R$50) =====
  {
    id: "4",
    name: "IGNITE V50 5.000 Puffs - Frutas Vermelhas",
    description:
      "Pod descartavel IGNITE V50 com 5.000 puffs. Mix de frutas vermelhas intenso.",
    price: 50.0,
    originalPrice: 77.0,
    image: "https://i.postimg.cc/T3yJnvZD/IMG-9680.jpg",
    category: "5k",
    stock: 8,
    brand: "Ignite",
  },
  {
    id: "5",
    name: "IGNITE V50 5.000 Puffs - Morango e Banana",
    description:
      "Pod descartavel IGNITE V50 com 5.000 puffs. Combinacao doce de morango com banana.",
    price: 50.0,
    originalPrice: 77.0,
    image: "https://i.postimg.cc/C14GwhqV/IMG-9681.jpg",
    category: "5k",
    stock: 6,
    brand: "Ignite",
  },
  {
    id: "6",
    name: "IGNITE V50 5.000 Puffs - Banana Ice",
    description:
      "Pod descartavel IGNITE V50 com 5.000 puffs. Sabor banana gelada cremosa.",
    price: 50.0,
    originalPrice: 77.0,
    image: "https://i.postimg.cc/j5v7GMp2/IMG-9682.jpg",
    category: "5k",
    stock: 7,
    brand: "Ignite",
  },
  {
    id: "7",
    name: "IGNITE V50 5.000 Puffs - Melancia e Pessego",
    description:
      "Pod descartavel IGNITE V50 com 5.000 puffs. Sabor melancia com pessego tropical.",
    price: 50.0,
    originalPrice: 77.0,
    image: "https://i.postimg.cc/4ySh3m4W/IMG-9683.jpg",
    category: "5k",
    stock: 5,
    brand: "Ignite",
  },

  // ===== IGNITE V55 Slim (5K = R$50) =====
  {
    id: "8",
    name: "IGNITE V55 Slim - Melancia com Morango",
    description:
      "Pod descartavel IGNITE V55 Slim. Design fino e elegante, sabor melancia com morango.",
    price: 50.0,
    originalPrice: 104.99,
    image: "https://i.postimg.cc/sgSZVjk6/IMG-9684.jpg",
    category: "5k",
    stock: 7,
    brand: "Ignite",
    featured: true,
  },
  {
    id: "9",
    name: "IGNITE V55 Slim - Menta com Melao",
    description:
      "Pod descartavel IGNITE V55 Slim. Sabor refrescante de menta com melao.",
    price: 50.0,
    originalPrice: 104.99,
    image: "https://i.postimg.cc/Xv4X4wc4/IMG-9685.jpg",
    category: "5k",
    stock: 6,
    brand: "Ignite",
  },
  {
    id: "10",
    name: "IGNITE V55 Slim - Menthol",
    description:
      "Pod descartavel IGNITE V55 Slim. Sabor menthol puro e gelado.",
    price: 50.0,
    originalPrice: 104.99,
    image: "https://i.postimg.cc/xdfjW9nb/IMG-9686.jpg",
    category: "5k",
    stock: 8,
    brand: "Ignite",
  },
  {
    id: "11",
    name: "IGNITE V55 Slim - Mix de Melao",
    description:
      "Pod descartavel IGNITE V55 Slim. Mix de melao tropical refrescante.",
    price: 50.0,
    originalPrice: 104.99,
    image: "https://i.postimg.cc/hjwSzxxd/IMG-9687.jpg",
    category: "5k",
    stock: 5,
    brand: "Ignite",
  },
  {
    id: "12",
    name: "IGNITE V55 Slim - Morango com Banana",
    description:
      "Pod descartavel IGNITE V55 Slim. Combinacao classica de morango com banana.",
    price: 50.0,
    originalPrice: 104.99,
    image: "https://i.postimg.cc/WtcTSv5v/IMG-9688.jpg",
    category: "5k",
    stock: 7,
    brand: "Ignite",
  },

  // ===== IGNITE V80 8.000 Puffs (<= R$100 = 20% OFF) =====
  {
    id: "13",
    name: "IGNITE V80 8.000 Puffs - Maca Verde",
    description:
      "Pod descartavel IGNITE V80 com 8.000 puffs. Sabor maca verde azedinha e refrescante.",
    price: 79.19,
    originalPrice: 98.99,
    image: "https://i.postimg.cc/QxZFfG9c/IMG-9689.jpg",
    category: "8k",
    stock: 6,
    brand: "Ignite",
    featured: true,
  },
  {
    id: "14",
    name: "IGNITE V80 8.000 Puffs - Morango com Kiwi",
    description:
      "Pod descartavel IGNITE V80 com 8.000 puffs. Sabor morango com kiwi tropical.",
    price: 79.19,
    originalPrice: 98.99,
    image: "https://i.postimg.cc/Rh5ZpKFZ/IMG-9690.jpg",
    category: "8k",
    stock: 8,
    brand: "Ignite",
  },
  {
    id: "15",
    name: "IGNITE V80 8.000 Puffs - Toranja com Hortela",
    description:
      "Pod descartavel IGNITE V80 com 8.000 puffs. Sabor toranja citrica com hortela.",
    price: 79.19,
    originalPrice: 98.99,
    image: "https://i.postimg.cc/jdhSvWrs/IMG-9691.jpg",
    category: "8k",
    stock: 5,
    brand: "Ignite",
  },
  {
    id: "16",
    name: "IGNITE V80 8.000 Puffs - Banana Cereja",
    description:
      "Pod descartavel IGNITE V80 com 8.000 puffs. Sabor banana com cereja doce.",
    price: 67.2,
    originalPrice: 84.0,
    image: "https://i.postimg.cc/WzvswVWZ/IMG-9692.jpg",
    category: "8k",
    stock: 7,
    brand: "Ignite",
  },
  {
    id: "17",
    name: "IGNITE V80 8.000 Puffs - Banana Ice",
    description:
      "Pod descartavel IGNITE V80 com 8.000 puffs. Sabor banana gelada cremosa.",
    price: 79.19,
    originalPrice: 98.99,
    image: "https://i.postimg.cc/02Z9DLpM/IMG-9693.jpg",
    category: "8k",
    stock: 6,
    brand: "Ignite",
  },
  {
    id: "18",
    name: "IGNITE V80 8.000 Puffs - Sorvete de Mirtilo",
    description:
      "Pod descartavel IGNITE V80 com 8.000 puffs. Sabor sorvete de mirtilo cremoso.",
    price: 79.19,
    originalPrice: 98.99,
    image: "https://i.postimg.cc/0NKxgjFF/IMG-9695.jpg",
    category: "8k",
    stock: 8,
    brand: "Ignite",
  },

  // ===== OUTROS PODS DESCARTAVEIS (> R$100 = 35% OFF) =====
  {
    id: "19",
    name: "POD Lost Mary 30K Mixer - 3 Sabores em 1",
    description:
      "Pod descartavel Lost Mary com 30.000 puffs e 3 sabores em 1 aparelho. Experiencia unica.",
    price: 93.81,
    originalPrice: 144.33,
    image: "https://i.postimg.cc/RCK1RzCR/IMG-9697.jpg",
    category: "20k-plus",
    stock: 5,
    brand: "Lost Mary",
    featured: true,
    consultFlavors: true,
  },
  {
    id: "20",
    name: "POD Life Pod One 40K Puffs",
    description:
      "Pod descartavel Life Pod One com incriveis 40.000 puffs. Bateria de longa duracao.",
    price: 93.81,
    originalPrice: 144.33,
    image: "https://i.postimg.cc/ZnHCMHM0/IMG-9700.jpg",
    category: "20k-plus",
    stock: 7,
    brand: "Life Pod",
    consultFlavors: true,
  },
  {
    id: "21",
    name: "POD Elfbar GH23000",
    description:
      "Pod descartavel Elfbar com 23.000 puffs. Design premium e sabor consistente.",
    price: 78.65,
    originalPrice: 121.0,
    image: "https://i.postimg.cc/NfNK8NTw/IMG-9701.jpg",
    category: "20k-plus",
    stock: 6,
    brand: "Elfbar",
    consultFlavors: true,
  },
  {
    id: "22",
    name: "POD Black Sheep 8K - 8.000 Puffs",
    description:
      "Pod descartavel Black Sheep com 8.000 puffs. Sabores marcantes e boa durabilidade.",
    price: 79.37,
    originalPrice: 122.11,
    image: "https://i.postimg.cc/YSBMQgdR/IMG-9704.jpg",
    category: "8k",
    stock: 8,
    brand: "Black Sheep",
    consultFlavors: true,
  },

  // ===== POD SYSTEMS (> R$100 = 35% OFF) =====
  {
    id: "23",
    name: "Vaporesso XROS 4 1000mAh Kit",
    description:
      "Pod System Vaporesso XROS 4 com bateria de 1000mAh. Compacto, potente e recarregavel.",
    price: 194.93,
    originalPrice: 299.89,
    image: "https://i.postimg.cc/K8qtzGQg/IMG-9698.jpg",
    category: "pod-system",
    stock: 6,
    brand: "Vaporesso",
    featured: true,
  },
  {
    id: "24",
    name: "Hannya Nano Pro - Vapelustion",
    description:
      "Pod System Hannya Nano Pro da Vapelustion. Design moderno, performance profissional.",
    price: 231.04,
    originalPrice: 355.44,
    image: "https://i.postimg.cc/BvRDTmr0/IMG-9699.jpg",
    category: "pod-system",
    stock: 5,
    brand: "Vapelustion",
  },
  {
    id: "25",
    name: "Uwell Sculptor 370mAh Kit",
    description:
      "Pod System Uwell Sculptor com bateria de 370mAh. Ultra compacto e portatil.",
    price: 137.15,
    originalPrice: 211.0,
    image: "https://i.postimg.cc/cHXWqz09/IMG-9705.jpg",
    category: "pod-system",
    stock: 7,
    brand: "Uwell",
  },

  // ===== KITS / VAPES (> R$100 = 35% OFF) =====
  {
    id: "26",
    name: "Geekvape Aegis Legend 3 (L200 V3) Kit",
    description:
      "Starter Kit Geekvape Aegis Legend 3 com 200W de potencia. Resistente a agua, poeira e impacto.",
    price: 498.26,
    originalPrice: 766.55,
    image: "https://i.postimg.cc/zXfBfnQF/IMG-9702.jpg",
    category: "kit",
    stock: 5,
    brand: "Geekvape",
  },
  {
    id: "27",
    name: "SMOK R-Kiss 2 200W Starter Kit",
    description:
      "Vaporizador SMOK R-Kiss 2 com 200W de potencia. Kit completo para iniciantes e avancados.",
    price: 187.71,
    originalPrice: 288.78,
    image: "https://i.postimg.cc/KYtcWQKK/IMG-9703.jpg",
    category: "kit",
    stock: 6,
    brand: "SMOK",
  },

  // ===== NOVOS PRODUTOS =====
  {
    id: "28",
    name: "Dual Tank ICE Master 30K - Acai Morango Banana + Uva",
    description:
      "Pod descartavel Dual Tank ICE Master com 30.000 puffs. Dois tanques com sabores acai morango banana e uva.",
    price: 58.5,
    originalPrice: 90.0,
    image: "https://i.postimg.cc/SxgyCHQS/IMG-9739.png",
    category: "20k-plus",
    stock: 6,
    brand: "ICE Master",
    featured: true,
  },
  {
    id: "29",
    name: "IGNITE V80 8K - Frozen Uva",
    description:
      "Pod descartavel IGNITE V80 com 8.000 puffs. Sabor uva gelada intensa.",
    price: 45.5,
    originalPrice: 70.0,
    image: "https://i.postimg.cc/m2RRqTt7/IMG-9740.png",
    category: "8k",
    stock: 7,
    brand: "Ignite",
  },
  {
    id: "30",
    name: "IGNITE V55 5.500 Puffs - Blueberry Ice",
    description:
      "Pod descartavel IGNITE V55 com 5.500 puffs. Sabor blueberry gelado refrescante.",
    price: 39.0,
    originalPrice: 60.0,
    image: "https://i.postimg.cc/J73CjSPV/IMG-9741.png",
    category: "5k",
    stock: 8,
    brand: "Ignite",
  },
  {
    id: "31",
    name: "IGNITE V300 30K - Banana Agua de Coco",
    description:
      "Pod descartavel IGNITE V300 com 30.000 puffs. Sabor banana com agua de coco tropical.",
    price: 61.75,
    originalPrice: 95.0,
    image: "https://i.postimg.cc/XYqMSq39/IMG-9742.png",
    category: "20k-plus",
    stock: 5,
    brand: "Ignite",
    featured: true,
  },
  {
    id: "32",
    name: "Sex Addict 28K - Morango Melancia Ice",
    description:
      "Pod descartavel Sex Addict com 28.000 puffs. Sabor morango com melancia gelada.",
    price: 55.25,
    originalPrice: 85.0,
    image: "https://i.postimg.cc/SRdPHFvc/IMG-9743.png",
    category: "20k-plus",
    stock: 6,
    brand: "Sex Addict",
    featured: true,
  },
  {
    id: "33",
    name: "IGNITE V155 15K - Abacaxi Ice",
    description:
      "Pod descartavel IGNITE V155 com 15.000 puffs. Sabor abacaxi gelado tropical.",
    price: 52.0,
    originalPrice: 80.0,
    image: "https://i.postimg.cc/GmHfgfJk/IMG-9744.png",
    category: "12k",
    stock: 7,
    brand: "Ignite",
  },
  {
    id: "34",
    name: "V400 Sweet 40K - Maca Verde",
    description:
      "Pod descartavel V400 Sweet com 40.000 puffs. Sabor maca verde doce e refrescante.",
    price: 65.0,
    originalPrice: 100.0,
    image: "https://i.postimg.cc/zD7PzNxn/IMG-9745.png",
    category: "20k-plus",
    stock: 5,
    brand: "V400",
    featured: true,
  },
  {
    id: "35",
    name: "Oxbar G30K Pro Magic Maze 2 - Maca Vermelha",
    description:
      "Pod descartavel Oxbar G30K Pro com ate 30.000 puffs. Sabor maca vermelha intensa.",
    price: 81.54,
    originalPrice: 125.44,
    image: "https://i.postimg.cc/nLxv9jzL/IMG-9746.webp",
    category: "20k-plus",
    stock: 6,
    brand: "Oxbar",
  },
  {
    id: "36",
    name: "Nikbar 4000 Puffs - Framboesa Ice",
    description:
      "Pod descartavel Nikbar com 4.000 puffs recarregavel. Sabor framboesa gelada.",
    price: 37.05,
    originalPrice: 57.0,
    image: "https://i.postimg.cc/wvvRDhd9/IMG-9747.webp",
    category: "5k",
    stock: 8,
    brand: "Nikbar",
  },
  {
    id: "37",
    name: "Elf Bar BC 4000 Puffs - Mirtilo Vermelho e Uva",
    description:
      "Pod descartavel Elf Bar BC com 4.000 puffs. Sabor mirtilo vermelho com uva.",
    price: 39.0,
    originalPrice: 60.0,
    image: "https://i.postimg.cc/Hk9t24FB/IMG-9748.webp",
    category: "5k",
    stock: 7,
    brand: "Elfbar",
  },
  {
    id: "38",
    name: "Hyde N Bar 4500 Puffs - Recarregavel",
    description:
      "Pod descartavel Hyde N Bar com 4.500 puffs recarregavel. Design premium e duravel.",
    price: 115.05,
    originalPrice: 177.0,
    image: "https://i.postimg.cc/4NCbRSgp/IMG-9749.webp",
    category: "5k",
    stock: 5,
    brand: "Hyde",
    consultFlavors: true,
  },
  {
    id: "39",
    name: "IGNITE V15 1500 Puffs",
    description:
      "Pod descartavel IGNITE V15 com 1.500 puffs. Compacto e pratico para o dia a dia. Levando 5 unidades sai R$25 cada!",
    price: 40.0,
    originalPrice: 61.54,
    bulkPrice: { minQty: 5, priceEach: 25.0 },
    image: "https://i.postimg.cc/tCyZ5QbF/IMG-9750.webp",
    category: "5k",
    stock: 8,
    brand: "Ignite",
    consultFlavors: true,
  },
  {
    id: "40",
    name: "IGNITE V80 8.000 Puffs - Clube do Vapor",
    description:
      "Pod descartavel IGNITE V80 com 8.000 puffs. Edicao Clube do Vapor com sabores exclusivos.",
    price: 61.31,
    originalPrice: 94.33,
    image: "https://i.postimg.cc/6qhQSqKj/IMG-9751.webp",
    category: "8k",
    stock: 6,
    brand: "Ignite",
    consultFlavors: true,
  },
];

export const categories = [
  { id: "all", label: "Todos" },
  { id: "5k", label: "Ate 5K Puffs" },
  { id: "8k", label: "8K Puffs" },
  { id: "12k", label: "12K Puffs" },
  { id: "20k-plus", label: "20K+ Puffs" },
  { id: "pod-system", label: "Pod Systems" },
  { id: "kit", label: "Kits / Vapes" },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
