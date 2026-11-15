// ── Seed data mirrored from frontend categoryData.js ──

export const categorySeedData = [
  {
    name: 'Rice & Rice Products', tagline: 'Premium Quality Rice for Your Family',
    emoji: '🌾', img: '/rice-dals-image.jpeg',
    heroBg: 'linear-gradient(135deg, #2d7a2d 0%, #4caf50 50%, #81c784 100%)',
    subcategories: [
      { id: 'all',     name: 'All Rice Products', emoji: '🌾' },
      { id: 'basmati', name: 'Basmati Rice',       emoji: '🍚' },
      { id: 'regular', name: 'Regular Rice',        emoji: '🍚' },
      { id: 'brown',   name: 'Brown Rice',          emoji: '🟤' },
      { id: 'flour',   name: 'Rice Flour',          emoji: '🌫️' },
      { id: 'idli',    name: 'Idli Rava',           emoji: '🫓' },
      { id: 'poha',    name: 'Poha / Atukulu',      emoji: '🥣' },
    ],
  },
  {
    name: 'Oils & Ghee', tagline: 'Pure & Natural Cooking Oils',
    emoji: '🫙', img: '/oil-ghee-image.jpeg',
    heroBg: 'linear-gradient(135deg, #e65100 0%, #ff9800 50%, #ffcc80 100%)',
    subcategories: [
      { id: 'all',       name: 'All Oils & Ghee', emoji: '🫙' },
      { id: 'sunflower', name: 'Sunflower Oil',    emoji: '🌻' },
      { id: 'mustard',   name: 'Mustard Oil',      emoji: '🫙' },
      { id: 'coconut',   name: 'Coconut Oil',      emoji: '🥥' },
      { id: 'ghee',      name: 'Pure Ghee',        emoji: '🧈' },
      { id: 'groundnut', name: 'Groundnut Oil',    emoji: '🥜' },
      { id: 'olive',     name: 'Olive Oil',        emoji: '🫒' },
    ],
  },
  {
    name: 'Spices & Masalas', tagline: 'Authentic Flavours for Every Dish',
    emoji: '🌶️', img: '/spices-masala-image.jpeg',
    heroBg: 'linear-gradient(135deg, #b71c1c 0%, #e53935 50%, #ef9a9a 100%)',
    subcategories: [
      { id: 'all',       name: 'All Spices',        emoji: '🌶️' },
      { id: 'chilli',    name: 'Red Chilli Powder', emoji: '🌶️' },
      { id: 'turmeric',  name: 'Turmeric',          emoji: '🟡' },
      { id: 'coriander', name: 'Coriander Powder',  emoji: '🌿' },
      { id: 'garam',     name: 'Garam Masala',      emoji: '🫙' },
      { id: 'cumin',     name: 'Cumin Seeds',       emoji: '🌱' },
      { id: 'pepper',    name: 'Pepper',            emoji: '⚫' },
    ],
  },
  {
    name: 'Snacks & Biscuits', tagline: 'Tasty Snacks for Every Craving',
    emoji: '🍪', img: '/snack-biscuits-image.jpeg',
    heroBg: 'linear-gradient(135deg, #6a1b9a 0%, #9c27b0 50%, #ce93d8 100%)',
    subcategories: [
      { id: 'all',      name: 'All Snacks',    emoji: '🍪' },
      { id: 'chips',    name: 'Chips & Crisps',emoji: '🥔' },
      { id: 'biscuits', name: 'Biscuits',      emoji: '🍪' },
      { id: 'namkeen',  name: 'Namkeen',       emoji: '🥜' },
      { id: 'cookies',  name: 'Cookies',       emoji: '🍫' },
      { id: 'popcorn',  name: 'Popcorn',       emoji: '🍿' },
      { id: 'wafers',   name: 'Wafers',        emoji: '🫓' },
    ],
  },
  {
    name: 'Tea & Coffee', tagline: 'Start Your Day with the Best Brew',
    emoji: '☕', img: '/tea-coffee-image.jpeg',
    heroBg: 'linear-gradient(135deg, #3e2723 0%, #795548 50%, #bcaaa4 100%)',
    subcategories: [
      { id: 'all',     name: 'All Tea & Coffee', emoji: '☕' },
      { id: 'black',   name: 'Black Tea',        emoji: '🍵' },
      { id: 'green',   name: 'Green Tea',        emoji: '🍃' },
      { id: 'beans',   name: 'Coffee Beans',     emoji: '☕' },
      { id: 'ground',  name: 'Ground Coffee',    emoji: '☕' },
      { id: 'herbal',  name: 'Herbal Tea',       emoji: '🌿' },
      { id: 'instant', name: 'Instant Coffee',   emoji: '☕' },
    ],
  },
  {
    name: 'Dairy Products', tagline: 'Fresh & Pure Dairy Every Day',
    emoji: '🥛', img: '/dairy-products-image.jpeg',
    heroBg: 'linear-gradient(135deg, #0d47a1 0%, #1976d2 50%, #90caf9 100%)',
    subcategories: [
      { id: 'all',     name: 'All Dairy',    emoji: '🥛' },
      { id: 'milk',    name: 'Milk',         emoji: '🥛' },
      { id: 'yoghurt', name: 'Yoghurt',      emoji: '🫙' },
      { id: 'cheese',  name: 'Cheese',       emoji: '🧀' },
      { id: 'butter',  name: 'Butter',       emoji: '🧈' },
      { id: 'paneer',  name: 'Paneer',       emoji: '🫙' },
      { id: 'ready',   name: 'Ready to Eat', emoji: '🍱' },
    ],
  },
  {
    name: 'Personal Care', tagline: 'Look & Feel Your Best Every Day',
    emoji: '🧴', img: '/personal-care-image.jpeg',
    heroBg: 'linear-gradient(135deg, #1b5e20 0%, #388e3c 50%, #a5d6a7 100%)',
    subcategories: [
      { id: 'all',     name: 'All Personal Care', emoji: '🧴' },
      { id: 'shampoo', name: 'Shampoo',           emoji: '🧴' },
      { id: 'soap',    name: 'Soap & Body Wash',  emoji: '🫧' },
      { id: 'face',    name: 'Face Wash',         emoji: '✨' },
      { id: 'dental',  name: 'Toothpaste',        emoji: '🦷' },
      { id: 'deo',     name: 'Deodorant',         emoji: '💨' },
      { id: 'skin',    name: 'Skin Care',         emoji: '✨' },
    ],
  },
  {
    name: 'Home Care', tagline: 'Keep Your Home Clean & Fresh',
    emoji: '🏠', img: '/home-care-image.jpeg',
    heroBg: 'linear-gradient(135deg, #006064 0%, #0097a7 50%, #80deea 100%)',
    subcategories: [
      { id: 'all',       name: 'All Home Care',  emoji: '🏠' },
      { id: 'detergent', name: 'Detergent',      emoji: '🧺' },
      { id: 'dishwash',  name: 'Dishwash',       emoji: '🍽️' },
      { id: 'floor',     name: 'Floor Cleaner',  emoji: '🧹' },
      { id: 'toilet',    name: 'Toilet Cleaner', emoji: '🚽' },
      { id: 'air',       name: 'Air Freshener',  emoji: '🌸' },
      { id: 'bags',      name: 'Garbage Bags',   emoji: '🗑️' },
    ],
  },
  {
    name: 'Fresh Vegetables', tagline: 'Farm Fresh Vegetables Delivered Daily',
    emoji: '🥦', img: '/vegetables-image.jpeg',
    heroBg: 'linear-gradient(135deg, #33691e 0%, #558b2f 50%, #c5e1a5 100%)',
    subcategories: [
      { id: 'all',      name: 'All Vegetables',   emoji: '🥦' },
      { id: 'roots',    name: 'Potatoes & Roots', emoji: '🥔' },
      { id: 'tomatoes', name: 'Tomatoes',         emoji: '🍅' },
      { id: 'onions',   name: 'Onions & Garlic',  emoji: '🧅' },
      { id: 'greens',   name: 'Leafy Greens',     emoji: '🥬' },
      { id: 'exotic',   name: 'Exotic Veggies',   emoji: '🥦' },
    ],
  },
  {
    name: 'Fresh Fruits', tagline: 'Sweet & Juicy Fruits Every Day',
    emoji: '🍎', img: '/vegetables-image.jpeg',
    heroBg: 'linear-gradient(135deg, #f57f17 0%, #fbc02d 50%, #fff176 100%)',
    subcategories: [
      { id: 'all',      name: 'All Fruits',      emoji: '🍎' },
      { id: 'tropical', name: 'Tropical Fruits', emoji: '🍍' },
      { id: 'citrus',   name: 'Citrus Fruits',   emoji: '🍊' },
      { id: 'berries',  name: 'Berries',         emoji: '🍇' },
      { id: 'apples',   name: 'Apples',          emoji: '🍎' },
      { id: 'bananas',  name: 'Bananas',         emoji: '🍌' },
    ],
  },
  {
    name: 'Bread & Bakery', tagline: 'Fresh Baked Goodness Daily',
    emoji: '🍞', img: '/snack-biscuits-image.jpeg',
    heroBg: 'linear-gradient(135deg, #bf360c 0%, #e64a19 50%, #f5cba7 100%)',
    subcategories: [
      { id: 'all',     name: 'All Bakery',     emoji: '🍞' },
      { id: 'bread',   name: 'Bread',          emoji: '🍞' },
      { id: 'pav',     name: 'Pav & Buns',     emoji: '🫓' },
      { id: 'muffins', name: 'Muffins & Cake', emoji: '🧁' },
      { id: 'rusk',    name: 'Rusk & Toast',   emoji: '🍫' },
    ],
  },
  {
    name: 'Frozen Foods', tagline: 'Quick & Convenient Frozen Meals',
    emoji: '🧊', img: '/dairy-products-image.jpeg',
    heroBg: 'linear-gradient(135deg, #1a237e 0%, #3949ab 50%, #9fa8da 100%)',
    subcategories: [
      { id: 'all',      name: 'All Frozen Foods',  emoji: '🧊' },
      { id: 'veggies',  name: 'Frozen Vegetables', emoji: '🥦' },
      { id: 'icecream', name: 'Ice Cream',         emoji: '🍦' },
      { id: 'parathas', name: 'Frozen Parathas',   emoji: '🫓' },
      { id: 'nuggets',  name: 'Nuggets & Snacks',  emoji: '🍗' },
      { id: 'fries',    name: 'French Fries',      emoji: '🍟' },
    ],
  },
];

// ── Product seed builder (takes category _id map) ──
export const buildProductSeedData = (catMap) => [

  // ── Rice & Rice Products ──
  { category: catMap['Rice & Rice Products'], subcat: 'basmati', name: 'India Gate Basmati Rice', weight: '1 kg', original: 180, price: 162, discount: 10, inStock: true, img: '/rice-dals-image.jpeg', brand: 'India Gate', type: 'Basmati Rice', shelfLife: '12 Months', rating: 4.5, reviews: 1250, description: 'India Gate Classic Basmati Rice is the most preferred rice brand in India. Known for its long grains, rich aroma and superior taste.', features: ['Premium quality Basmati Rice', 'Long grain & aromatic', 'Ideal for daily cooking & special occasions', 'Rich in nutrition'], images: ['/rice-dals-image.jpeg'], variants: [{ label: '1 Kg', original: 180, price: 162, discount: 10 }, { label: '5 Kg', original: 820, price: 740, discount: 10 }, { label: '10 Kg', original: 1550, price: 1395, discount: 10 }] },
  { category: catMap['Rice & Rice Products'], subcat: 'basmati', name: 'Daawat Basmati Rice', weight: '1 kg', original: 200, price: 176, discount: 12, inStock: true, img: '/rice-dals-image.jpeg', brand: 'Daawat', type: 'Basmati Rice', shelfLife: '18 Months', rating: 4.3, reviews: 980, description: 'Daawat Basmati Rice is known for its naturally aged grains, superior elongation on cooking, and rich aroma.', features: ['Naturally aged basmati grains', 'Superior elongation on cooking', 'Rich aroma & fluffy texture', 'No added preservatives'], images: ['/rice-dals-image.jpeg'], variants: [{ label: '1 Kg', original: 200, price: 176, discount: 12 }, { label: '5 Kg', original: 950, price: 836, discount: 12 }] },
  { category: catMap['Rice & Rice Products'], subcat: 'regular', name: 'Fortune Rice', weight: '5 kg', original: 370, price: 340, discount: 8, inStock: true, img: '/rice-dals-image.jpeg', brand: 'Fortune', type: 'Regular Rice', shelfLife: '12 Months', rating: 4.2, reviews: 760, description: 'Fortune Rice is carefully selected, clean and sorted rice ideal for everyday cooking.', features: ['Carefully cleaned & sorted', 'Soft & fluffy on cooking', 'Ideal for everyday meals', 'No stones or impurities'], images: ['/rice-dals-image.jpeg'], variants: [{ label: '1 Kg', original: 90, price: 82, discount: 9 }, { label: '5 Kg', original: 370, price: 340, discount: 8 }] },
  { category: catMap['Rice & Rice Products'], subcat: 'regular', name: 'Sona Masoori Rice', weight: '5 kg', original: 320, price: 288, discount: 10, inStock: true, img: '/rice-dals-image.jpeg', brand: 'Local Brand', type: 'Sona Masoori Rice', shelfLife: '12 Months', rating: 4.4, reviews: 1100, description: 'Sona Masoori is a lightweight, aromatic medium-grain rice grown in Andhra Pradesh and Karnataka.', features: ['Lightweight & easy to digest', 'Medium grain aromatic rice', 'Ideal for idli, pongal & daily cooking', 'Grown in AP & Karnataka'], images: ['/rice-dals-image.jpeg'], variants: [{ label: '1 Kg', original: 70, price: 63, discount: 10 }, { label: '5 Kg', original: 320, price: 288, discount: 10 }] },
  { category: catMap['Rice & Rice Products'], subcat: 'basmati', name: 'Kohinoor Basmati Rice', weight: '1 kg', original: 220, price: 187, discount: 15, inStock: true, img: '/rice-dals-image.jpeg', brand: 'Kohinoor', type: 'Basmati Rice', shelfLife: '18 Months', rating: 4.6, reviews: 1430, description: 'Kohinoor Basmati Rice is aged to perfection for exceptional elongation and taste.', features: ['Aged to perfection', 'Exceptional elongation on cooking', 'Characteristic fragrance', 'Hand-picked premium grains'], images: ['/rice-dals-image.jpeg'], variants: [{ label: '1 Kg', original: 220, price: 187, discount: 15 }, { label: '5 Kg', original: 1050, price: 892, discount: 15 }] },
  { category: catMap['Rice & Rice Products'], subcat: 'brown', name: 'Organic Brown Rice', weight: '1 kg', original: 150, price: 130, discount: 13, inStock: true, img: '/rice-dals-image.jpeg', brand: 'Organic India', type: 'Brown Rice', shelfLife: '9 Months', rating: 4.2, reviews: 410, description: 'Organic Brown Rice retains its natural bran layer, making it rich in fibre, vitamins and minerals.', features: ['High in dietary fibre', 'Rich in vitamins & minerals', '100% organic certified', 'No pesticides or chemicals'], images: ['/rice-dals-image.jpeg'], variants: [{ label: '1 Kg', original: 150, price: 130, discount: 13 }, { label: '5 Kg', original: 700, price: 609, discount: 13 }] },
  { category: catMap['Rice & Rice Products'], subcat: 'flour', name: 'Aashirvaad Rice Flour', weight: '1 kg', original: 55, price: 48, discount: 13, inStock: true, img: '/rice-dals-image.jpeg', brand: 'Aashirvaad', type: 'Rice Flour', shelfLife: '6 Months', rating: 4.4, reviews: 720, description: 'Aashirvaad Rice Flour is finely milled from select rice grains. Ideal for making idli, dosa and appam.', features: ['Finely milled for smooth texture', 'Ideal for idli & dosa batter', 'No added preservatives', 'Consistent quality'], images: ['/rice-dals-image.jpeg'], variants: [{ label: '500 g', original: 30, price: 26, discount: 13 }, { label: '1 Kg', original: 55, price: 48, discount: 13 }] },
  { category: catMap['Rice & Rice Products'], subcat: 'idli', name: 'MTR Idli Rava', weight: '500 g', original: 45, price: 38, discount: 16, inStock: true, img: '/rice-dals-image.jpeg', brand: 'MTR', type: 'Idli Rava', shelfLife: '6 Months', rating: 4.5, reviews: 840, description: 'MTR Idli Rava gives you soft, spongy and delicious idlis every time.', features: ['Gives soft spongy idlis', 'Easy to use', 'No soaking required', 'Consistent results every time'], images: ['/rice-dals-image.jpeg'], variants: [{ label: '500 g', original: 45, price: 38, discount: 16 }, { label: '1 Kg', original: 85, price: 71, discount: 16 }] },
  { category: catMap['Rice & Rice Products'], subcat: 'poha', name: 'Patanjali Poha', weight: '500 g', original: 30, price: 26, discount: 13, inStock: true, img: '/rice-dals-image.jpeg', brand: 'Patanjali', type: 'Poha', shelfLife: '6 Months', rating: 4.1, reviews: 620, description: 'Patanjali Poha is a healthy and tasty breakfast option. Light, easy to cook and full of natural goodness.', features: ['Healthy breakfast option', 'Light & easy to digest', 'Quick to prepare', 'Natural & chemical-free'], images: ['/rice-dals-image.jpeg'], variants: [{ label: '500 g', original: 30, price: 26, discount: 13 }, { label: '1 Kg', original: 55, price: 48, discount: 13 }] },

  // ── Oils & Ghee ──
  { category: catMap['Oils & Ghee'], subcat: 'sunflower', name: 'Fortune Sunflower Oil', weight: '1 Ltr', original: 160, price: 144, discount: 10, inStock: true, img: '/oil-ghee-image.jpeg', brand: 'Fortune', type: 'Sunflower Oil', shelfLife: '12 Months', rating: 4.3, reviews: 870, description: 'Fortune Sunflower Oil is light, healthy and ideal for everyday cooking. Rich in Vitamin E.', features: ['Rich in Vitamin E', 'Low in saturated fats', 'Light & healthy cooking oil', 'Ideal for frying & baking'], images: ['/oil-ghee-image.jpeg'], variants: [{ label: '500 ml', original: 85, price: 76, discount: 11 }, { label: '1 Ltr', original: 160, price: 144, discount: 10 }, { label: '5 Ltr', original: 750, price: 675, discount: 10 }] },
  { category: catMap['Oils & Ghee'], subcat: 'sunflower', name: 'Saffola Gold Oil', weight: '1 Ltr', original: 185, price: 162, discount: 12, inStock: true, img: '/oil-ghee-image.jpeg', brand: 'Saffola', type: 'Sunflower Oil', shelfLife: '12 Months', rating: 4.5, reviews: 1200, description: 'Saffola Gold is a blend of rice bran and sunflower oil, clinically proven to help maintain healthy cholesterol.', features: ['Clinically proven healthy oil', 'Blended rice bran & sunflower', 'Helps maintain cholesterol', 'Light on the heart'], images: ['/oil-ghee-image.jpeg'], variants: [{ label: '1 Ltr', original: 185, price: 162, discount: 12 }, { label: '5 Ltr', original: 870, price: 765, discount: 12 }] },
  { category: catMap['Oils & Ghee'], subcat: 'ghee', name: 'Amul Pure Ghee', weight: '500 g', original: 290, price: 260, discount: 10, inStock: true, img: '/oil-ghee-image.jpeg', brand: 'Amul', type: 'Pure Ghee', shelfLife: '12 Months', rating: 4.7, reviews: 2100, description: 'Amul Pure Ghee is made from fresh cream using traditional methods. Rich aroma, golden colour.', features: ['Made from fresh cream', 'Rich aroma & golden colour', 'Traditional bilona method', 'No added preservatives'], images: ['/oil-ghee-image.jpeg'], variants: [{ label: '200 g', original: 125, price: 112, discount: 10 }, { label: '500 g', original: 290, price: 260, discount: 10 }, { label: '1 Kg', original: 560, price: 500, discount: 11 }] },
  { category: catMap['Oils & Ghee'], subcat: 'coconut', name: 'Parachute Coconut Oil', weight: '500 ml', original: 110, price: 95, discount: 14, inStock: true, img: '/oil-ghee-image.jpeg', brand: 'Parachute', type: 'Coconut Oil', shelfLife: '24 Months', rating: 4.6, reviews: 1800, description: 'Parachute Coconut Oil is 100% pure, natural coconut oil. Used for cooking and hair care.', features: ['100% pure natural coconut oil', 'Multi-use: cooking & hair care', 'No added colour or fragrance', 'Trusted brand for generations'], images: ['/oil-ghee-image.jpeg'], variants: [{ label: '200 ml', original: 50, price: 43, discount: 14 }, { label: '500 ml', original: 110, price: 95, discount: 14 }] },

  // ── Spices & Masalas ──
  { category: catMap['Spices & Masalas'], subcat: 'chilli', name: 'MDH Red Chilli Powder', weight: '100 g', original: 55, price: 48, discount: 13, inStock: true, img: '/spices-masala-image.jpeg', brand: 'MDH', type: 'Red Chilli Powder', shelfLife: '24 Months', rating: 4.4, reviews: 920, description: 'MDH Red Chilli Powder adds bold colour and fiery heat to your dishes. Made from sun-dried red chillies.', features: ['Bold colour & fiery heat', 'Sun-dried red chillies', 'No artificial colour', 'MDH quality assurance'], images: ['/spices-masala-image.jpeg'], variants: [{ label: '100 g', original: 55, price: 48, discount: 13 }, { label: '500 g', original: 250, price: 217, discount: 13 }] },
  { category: catMap['Spices & Masalas'], subcat: 'turmeric', name: 'Everest Turmeric Powder', weight: '100 g', original: 45, price: 38, discount: 16, inStock: true, img: '/spices-masala-image.jpeg', brand: 'Everest', type: 'Turmeric', shelfLife: '24 Months', rating: 4.5, reviews: 1100, description: 'Everest Turmeric Powder has a rich yellow colour and earthy flavour. Known for anti-inflammatory properties.', features: ['Rich yellow colour', 'Anti-inflammatory properties', 'Earthy authentic flavour', 'No artificial additives'], images: ['/spices-masala-image.jpeg'], variants: [{ label: '100 g', original: 45, price: 38, discount: 16 }, { label: '500 g', original: 200, price: 168, discount: 16 }] },
  { category: catMap['Spices & Masalas'], subcat: 'garam', name: 'MDH Garam Masala', weight: '50 g', original: 65, price: 56, discount: 14, inStock: true, img: '/spices-masala-image.jpeg', brand: 'MDH', type: 'Garam Masala', shelfLife: '24 Months', rating: 4.6, reviews: 1350, description: 'MDH Garam Masala is a carefully balanced blend of whole spices that transforms any dish.', features: ['Carefully balanced blend', 'Whole spice aroma', 'Transforms any dish', 'Iconic MDH recipe'], images: ['/spices-masala-image.jpeg'], variants: [{ label: '50 g', original: 65, price: 56, discount: 14 }, { label: '100 g', original: 120, price: 103, discount: 14 }] },

  // ── Snacks & Biscuits ──
  { category: catMap['Snacks & Biscuits'], subcat: 'biscuits', name: 'Parle-G Biscuits', weight: '800 g', original: 90, price: 74, discount: 18, inStock: true, img: '/snack-biscuits-image.jpeg', brand: 'Parle', type: 'Biscuits', shelfLife: '6 Months', rating: 4.7, reviews: 5600, description: "Parle-G is India's most loved biscuit for over 80 years. Crispy, tasty and nutritious.", features: ["India's most loved biscuit", 'Crispy & nutritious', 'Perfect with tea', 'Great value pack'], images: ['/snack-biscuits-image.jpeg'], variants: [{ label: '100 g', original: 15, price: 12, discount: 20 }, { label: '800 g', original: 90, price: 74, discount: 18 }] },
  { category: catMap['Snacks & Biscuits'], subcat: 'chips', name: 'Lays Classic Salted', weight: '73 g', original: 20, price: 18, discount: 10, inStock: true, img: '/snack-biscuits-image.jpeg', brand: 'Lays', type: 'Chips', shelfLife: '6 Months', rating: 4.3, reviews: 2400, description: 'Lays Classic Salted chips are thin, crispy and lightly salted for the perfect snacking experience.', features: ['Thin & crispy texture', 'Lightly salted', 'Perfect anytime snack', 'No artificial flavours'], images: ['/snack-biscuits-image.jpeg'], variants: [{ label: '26 g', original: 10, price: 9, discount: 10 }, { label: '73 g', original: 20, price: 18, discount: 10 }] },
  { category: catMap['Snacks & Biscuits'], subcat: 'namkeen', name: 'Haldiram Aloo Bhujia', weight: '200 g', original: 50, price: 44, discount: 12, inStock: true, img: '/snack-biscuits-image.jpeg', brand: 'Haldiram', type: 'Namkeen', shelfLife: '6 Months', rating: 4.5, reviews: 2100, description: 'Haldiram Aloo Bhujia is the ultimate Indian namkeen snack. Crispy potato strands spiced to perfection.', features: ['Crispy potato strands', 'Spiced to perfection', 'Great with chai', 'Haldiram authentic recipe'], images: ['/snack-biscuits-image.jpeg'], variants: [{ label: '200 g', original: 50, price: 44, discount: 12 }, { label: '400 g', original: 95, price: 83, discount: 13 }] },

  // ── Tea & Coffee ──
  { category: catMap['Tea & Coffee'], subcat: 'black', name: 'Tata Tea Premium', weight: '500 g', original: 210, price: 185, discount: 12, inStock: true, img: '/tea-coffee-image.jpeg', brand: 'Tata Tea', type: 'Black Tea', shelfLife: '24 Months', rating: 4.5, reviews: 2200, description: 'Tata Tea Premium is a rich, aromatic blend of select tea leaves. The perfect start to your day.', features: ['Rich aromatic blend', 'Select tea leaves', 'Perfect morning brew', 'Consistent strong taste'], images: ['/tea-coffee-image.jpeg'], variants: [{ label: '250 g', original: 110, price: 97, discount: 12 }, { label: '500 g', original: 210, price: 185, discount: 12 }] },
  { category: catMap['Tea & Coffee'], subcat: 'instant', name: 'Nescafe Classic', weight: '100 g', original: 290, price: 255, discount: 12, inStock: true, img: '/tea-coffee-image.jpeg', brand: 'Nescafe', type: 'Instant Coffee', shelfLife: '24 Months', rating: 4.6, reviews: 3100, description: 'Nescafe Classic is made from 100% pure coffee beans, roasted to perfection for a rich full-bodied flavour.', features: ['100% pure coffee beans', 'Roasted to perfection', 'Rich full-bodied flavour', 'Dissolves instantly'], images: ['/tea-coffee-image.jpeg'], variants: [{ label: '50 g', original: 155, price: 136, discount: 12 }, { label: '100 g', original: 290, price: 255, discount: 12 }] },
  { category: catMap['Tea & Coffee'], subcat: 'green', name: 'Lipton Green Tea', weight: '25 bags', original: 90, price: 78, discount: 13, inStock: true, img: '/tea-coffee-image.jpeg', brand: 'Lipton', type: 'Green Tea', shelfLife: '24 Months', rating: 4.3, reviews: 1400, description: 'Lipton Green Tea is packed with antioxidants and has a light, refreshing flavour.', features: ['Rich in antioxidants', 'Light refreshing flavour', 'Supports wellness', 'Natural green tea leaves'], images: ['/tea-coffee-image.jpeg'], variants: [{ label: '25 bags', original: 90, price: 78, discount: 13 }, { label: '50 bags', original: 170, price: 148, discount: 13 }] },

  // ── Dairy Products ──
  { category: catMap['Dairy Products'], subcat: 'milk', name: 'Amul Full Cream Milk', weight: '1 Ltr', original: 68, price: 62, discount: 9, inStock: true, img: '/dairy-products-image.jpeg', brand: 'Amul', type: 'Full Cream Milk', shelfLife: '2 Days', rating: 4.5, reviews: 1600, description: 'Amul Full Cream Milk is fresh, pure and nutritious. Rich in calcium and protein.', features: ['Fresh & pure', 'Rich in calcium & protein', 'Ideal for all age groups', 'Pasteurized & homogenized'], images: ['/dairy-products-image.jpeg'], variants: [{ label: '500 ml', original: 36, price: 33, discount: 8 }, { label: '1 Ltr', original: 68, price: 62, discount: 9 }] },
  { category: catMap['Dairy Products'], subcat: 'butter', name: 'Amul Butter', weight: '500 g', original: 250, price: 220, discount: 12, inStock: true, img: '/dairy-products-image.jpeg', brand: 'Amul', type: 'Salted Butter', shelfLife: '60 Days', rating: 4.7, reviews: 2800, description: "Amul Butter is India's most trusted butter brand. Made from fresh cream with the perfect hint of salt.", features: ["India's most trusted butter", 'Made from fresh cream', 'Perfect hint of salt', 'Great on toast & rotis'], images: ['/dairy-products-image.jpeg'], variants: [{ label: '100 g', original: 56, price: 49, discount: 13 }, { label: '500 g', original: 250, price: 220, discount: 12 }] },
  { category: catMap['Dairy Products'], subcat: 'cheese', name: 'Amul Processed Cheese', weight: '200 g', original: 95, price: 82, discount: 14, inStock: true, img: '/dairy-products-image.jpeg', brand: 'Amul', type: 'Processed Cheese', shelfLife: '90 Days', rating: 4.5, reviews: 1800, description: 'Amul Processed Cheese is smooth, creamy and mildly flavoured. Perfect for sandwiches and pasta.', features: ['Smooth creamy texture', 'Mild pleasant flavour', 'Perfect for sandwiches & pasta', 'Melts beautifully'], images: ['/dairy-products-image.jpeg'], variants: [{ label: '100 g', original: 52, price: 45, discount: 13 }, { label: '200 g', original: 95, price: 82, discount: 14 }] },

  // ── Personal Care ──
  { category: catMap['Personal Care'], subcat: 'shampoo', name: 'Head & Shoulders Shampoo', weight: '340 ml', original: 299, price: 255, discount: 15, inStock: true, img: '/personal-care-image.jpeg', brand: 'Head & Shoulders', type: 'Anti-Dandruff Shampoo', shelfLife: '36 Months', rating: 4.5, reviews: 2100, description: 'Head & Shoulders provides up to 100% dandruff protection with a refreshing clean scalp feeling.', features: ['100% dandruff protection', 'Refreshing clean feeling', 'Gentle on hair', 'Clinically proven formula'], images: ['/personal-care-image.jpeg'], variants: [{ label: '180 ml', original: 169, price: 144, discount: 15 }, { label: '340 ml', original: 299, price: 255, discount: 15 }] },
  { category: catMap['Personal Care'], subcat: 'dental', name: 'Colgate Strong Teeth', weight: '300 g', original: 95, price: 82, discount: 14, inStock: true, img: '/personal-care-image.jpeg', brand: 'Colgate', type: 'Toothpaste', shelfLife: '36 Months', rating: 4.5, reviews: 2400, description: 'Colgate Strong Teeth provides stronger, healthier teeth with its unique Amino Shakti formula.', features: ['Amino Shakti formula', 'Stronger healthier teeth', 'Repairs & protects enamel', 'Recommended by dentists'], images: ['/personal-care-image.jpeg'], variants: [{ label: '100 g', original: 38, price: 33, discount: 13 }, { label: '300 g', original: 95, price: 82, discount: 14 }] },
  { category: catMap['Personal Care'], subcat: 'soap', name: 'Dove Beauty Soap', weight: '100 g × 3', original: 110, price: 95, discount: 14, inStock: true, img: '/personal-care-image.jpeg', brand: 'Dove', type: 'Beauty Soap', shelfLife: '36 Months', rating: 4.6, reviews: 1900, description: 'Dove Beauty Bar is enriched with 1/4 moisturising cream that leaves skin soft and smooth.', features: ['1/4 moisturising cream', 'Leaves skin soft & smooth', 'Deeply nourishing', 'Gentle on all skin types'], images: ['/personal-care-image.jpeg'], variants: [{ label: '100 g × 1', original: 42, price: 36, discount: 14 }, { label: '100 g × 3', original: 110, price: 95, discount: 14 }] },

  // ── Home Care ──
  { category: catMap['Home Care'], subcat: 'detergent', name: 'Surf Excel Detergent', weight: '1 kg', original: 120, price: 106, discount: 12, inStock: true, img: '/home-care-image.jpeg', brand: 'Surf Excel', type: 'Detergent Powder', shelfLife: '24 Months', rating: 4.6, reviews: 2300, description: 'Surf Excel removes tough stains in just one wash. Its advanced formula works in both hard and soft water.', features: ['Removes tough stains in 1 wash', 'Works in hard & soft water', 'Brilliant whiteness', 'Advanced stain removal formula'], images: ['/home-care-image.jpeg'], variants: [{ label: '500 g', original: 65, price: 57, discount: 12 }, { label: '1 Kg', original: 120, price: 106, discount: 12 }, { label: '2 Kg', original: 230, price: 202, discount: 12 }] },
  { category: catMap['Home Care'], subcat: 'dishwash', name: 'Vim Dishwash Liquid', weight: '750 ml', original: 95, price: 82, discount: 14, inStock: true, img: '/home-care-image.jpeg', brand: 'Vim', type: 'Dishwash Liquid', shelfLife: '24 Months', rating: 4.4, reviews: 1500, description: 'Vim Dishwash Liquid cuts through grease in seconds with active lime action.', features: ['Active lime action', 'Cuts through grease fast', 'Sparkling clean dishes', 'Fresh citrus fragrance'], images: ['/home-care-image.jpeg'], variants: [{ label: '250 ml', original: 38, price: 32, discount: 16 }, { label: '750 ml', original: 95, price: 82, discount: 14 }] },
  { category: catMap['Home Care'], subcat: 'floor', name: 'Lizol Floor Cleaner', weight: '1 Ltr', original: 160, price: 138, discount: 14, inStock: true, img: '/home-care-image.jpeg', brand: 'Lizol', type: 'Floor Cleaner', shelfLife: '24 Months', rating: 4.5, reviews: 1200, description: 'Lizol Floor Cleaner kills 99.9% germs and leaves your floors shining clean.', features: ['Kills 99.9% germs', 'Leaves floors shining', 'Long-lasting fragrance', 'Safe for all floor types'], images: ['/home-care-image.jpeg'], variants: [{ label: '500 ml', original: 85, price: 73, discount: 14 }, { label: '1 Ltr', original: 160, price: 138, discount: 14 }] },

  // ── Fresh Vegetables ──
  { category: catMap['Fresh Vegetables'], subcat: 'roots', name: 'Fresh Potatoes', weight: '1 kg', original: 35, price: 30, discount: 14, inStock: true, img: '/vegetables-image.jpeg', brand: 'Farm Fresh', type: 'Vegetable', shelfLife: '7 Days', rating: 4.3, reviews: 820, description: 'Fresh farm potatoes sourced directly from local farms. Perfect for everyday cooking.', features: ['Sourced from local farms', 'Fresh & clean', 'Versatile everyday vegetable', 'No chemical treatment'], images: ['/vegetables-image.jpeg'], variants: [{ label: '500 g', original: 20, price: 17, discount: 15 }, { label: '1 kg', original: 35, price: 30, discount: 14 }, { label: '2 kg', original: 65, price: 56, discount: 14 }] },
  { category: catMap['Fresh Vegetables'], subcat: 'tomatoes', name: 'Red Tomatoes', weight: '500 g', original: 25, price: 20, discount: 20, inStock: true, img: '/vegetables-image.jpeg', brand: 'Farm Fresh', type: 'Vegetable', shelfLife: '5 Days', rating: 4.2, reviews: 650, description: 'Fresh red tomatoes handpicked at peak ripeness. Juicy, flavourful and essential for gravies.', features: ['Handpicked at peak ripeness', 'Juicy & flavourful', 'Perfect for gravies & chutneys', 'No wax coating'], images: ['/vegetables-image.jpeg'], variants: [{ label: '250 g', original: 14, price: 11, discount: 21 }, { label: '500 g', original: 25, price: 20, discount: 20 }] },
  { category: catMap['Fresh Vegetables'], subcat: 'onions', name: 'Red Onions', weight: '1 kg', original: 40, price: 34, discount: 15, inStock: true, img: '/vegetables-image.jpeg', brand: 'Farm Fresh', type: 'Vegetable', shelfLife: '10 Days', rating: 4.1, reviews: 740, description: 'Fresh red onions with a strong flavour and aroma. An essential ingredient in every Indian kitchen.', features: ['Strong flavour & aroma', 'Essential kitchen ingredient', 'Long shelf life', 'Farm direct freshness'], images: ['/vegetables-image.jpeg'], variants: [{ label: '500 g', original: 22, price: 18, discount: 18 }, { label: '1 kg', original: 40, price: 34, discount: 15 }] },

  // ── Fresh Fruits ──
  { category: catMap['Fresh Fruits'], subcat: 'bananas', name: 'Fresh Bananas', weight: '1 dozen', original: 50, price: 42, discount: 16, inStock: true, img: '/vegetables-image.jpeg', brand: 'Farm Fresh', type: 'Fruit', shelfLife: '5 Days', rating: 4.3, reviews: 760, description: 'Fresh ripe bananas — naturally sweet, energy-packed and perfect for breakfast or smoothies.', features: ['Naturally sweet & ripe', 'Energy-packed', 'Great for smoothies', 'Farm fresh & chemical-free'], images: ['/vegetables-image.jpeg'], variants: [{ label: '6 pcs', original: 28, price: 23, discount: 18 }, { label: '1 dozen', original: 50, price: 42, discount: 16 }] },
  { category: catMap['Fresh Fruits'], subcat: 'apples', name: 'Kashmir Apples', weight: '1 kg', original: 180, price: 155, discount: 14, inStock: true, img: '/vegetables-image.jpeg', brand: 'Farm Fresh', type: 'Fruit', shelfLife: '7 Days', rating: 4.5, reviews: 1100, description: 'Premium Kashmir Red Apples — crispy, sweet and aromatic. Rich in antioxidants and dietary fibre.', features: ['Premium Kashmir variety', 'Crispy & sweet', 'Rich in antioxidants', 'High dietary fibre'], images: ['/vegetables-image.jpeg'], variants: [{ label: '500 g', original: 95, price: 82, discount: 14 }, { label: '1 kg', original: 180, price: 155, discount: 14 }] },

  // ── Bread & Bakery ──
  { category: catMap['Bread & Bakery'], subcat: 'bread', name: 'Britannia Whole Wheat Bread', weight: '400 g', original: 42, price: 36, discount: 14, inStock: true, img: '/snack-biscuits-image.jpeg', brand: 'Britannia', type: 'Bread', shelfLife: '5 Days', rating: 4.4, reviews: 1200, description: 'Britannia Whole Wheat Bread is baked fresh daily with 100% whole wheat flour. High in fibre.', features: ['100% whole wheat flour', 'High in dietary fibre', 'Baked fresh daily', 'No maida'], images: ['/snack-biscuits-image.jpeg'], variants: [{ label: '400 g', original: 42, price: 36, discount: 14 }] },
  { category: catMap['Bread & Bakery'], subcat: 'rusk', name: 'Britannia Toastea Rusk', weight: '350 g', original: 65, price: 55, discount: 15, inStock: true, img: '/snack-biscuits-image.jpeg', brand: 'Britannia', type: 'Rusk', shelfLife: '180 Days', rating: 4.4, reviews: 1100, description: 'Britannia Toastea Rusk is crispy, golden and perfect with a hot cup of chai.', features: ['Crispy golden texture', 'Perfect with chai', 'Great dunking rusk', 'Long-lasting crunch'], images: ['/snack-biscuits-image.jpeg'], variants: [{ label: '200 g', original: 40, price: 34, discount: 15 }, { label: '350 g', original: 65, price: 55, discount: 15 }] },

  // ── Frozen Foods ──
  { category: catMap['Frozen Foods'], subcat: 'icecream', name: 'Amul Vanilla Ice Cream', weight: '500 ml', original: 110, price: 95, discount: 14, inStock: true, img: '/dairy-products-image.jpeg', brand: 'Amul', type: 'Ice Cream', shelfLife: '12 Months', rating: 4.5, reviews: 1600, description: 'Amul Vanilla Ice Cream is made from real dairy milk with a rich, creamy vanilla flavour.', features: ['Real dairy milk', 'Rich creamy vanilla', 'Perfect family dessert', 'Amul quality guaranteed'], images: ['/dairy-products-image.jpeg'], variants: [{ label: '125 ml', original: 30, price: 26, discount: 13 }, { label: '500 ml', original: 110, price: 95, discount: 14 }] },
  { category: catMap['Frozen Foods'], subcat: 'fries', name: 'McCain French Fries', weight: '420 g', original: 150, price: 128, discount: 15, inStock: true, img: '/dairy-products-image.jpeg', brand: 'McCain', type: 'Frozen Fries', shelfLife: '12 Months', rating: 4.4, reviews: 1200, description: 'McCain French Fries are crispy on the outside, fluffy on the inside — just like restaurant fries.', features: ['Crispy outside fluffy inside', 'Restaurant-style at home', 'Ready in 15 minutes', 'No artificial flavours'], images: ['/dairy-products-image.jpeg'], variants: [{ label: '420 g', original: 150, price: 128, discount: 15 }] },
];
