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
    image: "https://i.postimg.cc/Dyxxqgmn/IMG-9678.jpg",
    category: "12k",
    stock: 7,
    brand: "Ignite",
    featured: true,
  },
  {
    id: "3",
    name: "IGNITE V120 12.000 Puffs - Menta Ice",
    description:
      "Pod descartavel IGNITE V120 com 12.000 puffs. Sabor menta gelada ultra refrescante.",
    price: 76.69,
    originalPrice: 117.99,
    image: "https://i.postimg.cc/QC0JJ88t/IMG-9679.jpg",
    category: "12k",
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
