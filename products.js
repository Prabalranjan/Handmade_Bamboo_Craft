// Shared product catalog + WhatsApp contact number.
// Used by both index.html (shop grid) and product.html (product detail page).

const WHATSAPP_NUMBER = "919999999999";

// Placeholder description — same text on every product for now.
// Swap PRODUCT_DESCRIPTION per product later once real copy is ready.
const PRODUCT_DESCRIPTION = {
  overview: "Bring the calming essence of organic modern design into your home with our handcrafted bamboo piece. Masterfully made from sustainable, eco-friendly natural bamboo, this statement piece is shaped by skilled artisans using traditional weaving and carving techniques. Whether placed in a minimalist living room, a cozy bedroom corner, or a welcoming entryway, it beautifully bridges the gap between rustic charm and modern elegance.",
  features: [
    "Artisanal Craftsmanship: Individually hand-shaped by skilled artisans using high-quality, renewable natural bamboo.",
    "Natural Variation: Every piece is unique — expect gentle differences in grain, tone and weave that come with genuine handmade bamboo.",
    "Eco-Friendly Materials: Made from sustainably sourced bamboo, a fast-renewing and biodegradable material.",
    "Versatile Styling: Fits naturally into rustic, boho and modern-minimal interiors alike.",
    "Made to Last: Finished for durability with everyday home use in mind."
  ],
  specs: [
    "Material: 100% Sustainable Natural Bamboo",
    "Finish: Hand-finished, natural bamboo tone",
    "Origin: Handmade in Assam, India",
    "Care: Wipe clean with a soft, dry cloth",
    "Note: Dimensions and finish may vary slightly piece to piece"
  ]
};

// images[]: numbered 1.jpg-6.jpg per product so photos can be swapped later
// by simply replacing the file at that path — no code changes needed.
const products = [
  {
    id: "lantern-pendant",
    name: "3-Light Lantern Bowl LED Pendant",
    price: 1899,
    image: "product/3- Light Lantern Bowl LED Pendant yellow.jpg",
    desc: "Warm LED pendant lantern with a hand-shaped bamboo bowl shade.",
    images: [
      "product/gallery/lantern-pendant/1.jpg",
      "product/gallery/lantern-pendant/2.jpg",
      "product/gallery/lantern-pendant/3.jpg",
      "product/gallery/lantern-pendant/4.jpg",
      "product/gallery/lantern-pendant/5.jpg",
      "product/gallery/lantern-pendant/6.jpg"
    ]
  },
  {
    id: "storage-box",
    name: "Airtight Bamboo Storage Box",
    price: 549,
    image: "product/Airtight Storage Box.jpg",
    desc: "Keep dry goods fresh in a handwoven airtight storage box.",
    images: [
      "product/gallery/storage-box/1.jpg",
      "product/gallery/storage-box/2.jpg",
      "product/gallery/storage-box/3.jpg",
      "product/gallery/storage-box/4.jpg",
      "product/gallery/storage-box/5.jpg",
      "product/gallery/storage-box/6.jpg"
    ]
  },
  {
    id: "weaving-lamp",
    name: "Bamboo Weaving Pendant Lamp",
    price: 2299,
    image: "product/Bamboo Weaving Pendant Lamp.jpg",
    desc: "Intricately woven pendant lamp that casts a soft, warm glow.",
    images: [
      "product/gallery/weaving-lamp/1.jpg",
      "product/gallery/weaving-lamp/2.jpg",
      "product/gallery/weaving-lamp/3.jpg",
      "product/gallery/weaving-lamp/4.jpg",
      "product/gallery/weaving-lamp/5.jpg",
      "product/gallery/weaving-lamp/6.jpg"
    ]
  },
  {
    id: "fountain",
    name: "Bamboo Fountain with Double Bowls",
    price: 3499,
    image: "product/Handmade Bamboo Fountain with Double Bowls.jpg",
    desc: "A soothing tabletop water fountain for home or office.",
    images: [
      "product/gallery/fountain/1.jpg",
      "product/gallery/fountain/2.jpg",
      "product/gallery/fountain/3.jpg",
      "product/gallery/fountain/4.jpg",
      "product/gallery/fountain/5.jpg",
      "product/gallery/fountain/6.jpg"
    ]
  },
  {
    id: "table-lamp",
    name: "Handmade Bamboo Table Lamp",
    price: 1599,
    image: "product/Handmade Bamboo Table Lamp.jpg",
    desc: "A statement table lamp handcrafted from natural bamboo.",
    images: [
      "product/gallery/table-lamp/1.jpg",
      "product/gallery/table-lamp/2.jpg",
      "product/gallery/table-lamp/3.jpg",
      "product/gallery/table-lamp/4.jpg",
      "product/gallery/table-lamp/5.jpg",
      "product/gallery/table-lamp/6.jpg"
    ]
  },
  {
    id: "tea-cup",
    name: "Carbonized Bamboo Tea/Coffee Cup",
    price: 349,
    image: "product/Handmade Carbonized Bamboo Cup, Eco Tea or Coffee Cup 130-200ml.jpg",
    desc: "A 130-200ml eco-friendly cup, carbonized for durability.",
    images: [
      "product/gallery/tea-cup/1.jpg",
      "product/gallery/tea-cup/2.jpg",
      "product/gallery/tea-cup/3.jpg",
      "product/gallery/tea-cup/4.jpg",
      "product/gallery/tea-cup/5.jpg",
      "product/gallery/tea-cup/6.jpg"
    ]
  },
  {
    id: "planter",
    name: "Hanging Bamboo Planter",
    price: 699,
    image: "product/Hanging Bamboo Planter.jpg",
    desc: "Bring greenery indoors with this handwoven hanging planter.",
    images: [
      "product/gallery/planter/1.jpg",
      "product/gallery/planter/2.jpg",
      "product/gallery/planter/3.jpg",
      "product/gallery/planter/4.jpg",
      "product/gallery/planter/5.jpg",
      "product/gallery/planter/6.jpg"
    ]
  },
  {
    id: "water-jug",
    name: "Bamboo Water Jug",
    price: 799,
    image: "product/water jug.jpg",
    desc: "A rustic, naturally antibacterial bamboo water jug.",
    images: [
      "product/gallery/water-jug/1.jpg",
      "product/gallery/water-jug/2.jpg",
      "product/gallery/water-jug/3.jpg",
      "product/gallery/water-jug/4.jpg",
      "product/gallery/water-jug/5.jpg",
      "product/gallery/water-jug/6.jpg"
    ]
  }
];
