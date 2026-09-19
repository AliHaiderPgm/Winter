const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Product = require('../models/productModel');

const GENDERS = {
  Male: {
    label: 'Male',
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    brands: ['Nike', 'Adidas', 'Puma', 'New Balance', 'Reebok', 'Under Armour', 'ASICS', 'Jordan'],
    types: ['Sneakers', 'Running', 'Basketball', 'Football', 'Lifestyle', 'Sportswear'],
    nameSeeds: ['Velocity', 'Summit', 'Drive', 'Apex', 'Rally', 'Impact', 'Trail', 'Edge', 'Pulse', 'Titan'],
    imagePool: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77',
      'https://images.unsplash.com/photo-1543508282-6319a3e2621f',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9',
      'https://images.unsplash.com/photo-1511556820780-d912e42b4980',
      'https://images.unsplash.com/photo-1539185441755-769473a23570',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb',
      'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2',
      'https://images.unsplash.com/photo-1520256863859-06895c0d10c5',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2',
      'https://images.unsplash.com/photo-1551818255-e6e10975bc17',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf',
      'https://images.unsplash.com/photo-1556656793-08538906a9f8',
      'https://images.unsplash.com/photo-1517849845537-4d257902454a',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a',
      'https://images.unsplash.com/photo-1556040220-5b39f6a5f3c9',
      'https://images.unsplash.com/photo-1528701800489-20d7e1f0aa09',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
      'https://images.unsplash.com/photo-1602122566075-df3a34d9417c',
      'https://images.unsplash.com/photo-1614273071489-459010d2caced',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b',
      'https://images.unsplash.com/photo-1495385794356-15371f348c31',
      'https://images.unsplash.com/photo-1553456558-aff63285bdd1'
    ],
    priceMin: 1800,
    priceMax: 28000
  },
  Female: {
    label: 'Female',
    sizes: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5],
    brands: ['Nike', 'Adidas', 'Puma', 'New Balance', 'Reebok', 'Skechers', 'Converse', 'Fila'],
    types: ['Sneakers', 'Running', 'Lifestyle', 'Sportswear', 'Workout & Gym', 'Court'],
    nameSeeds: ['Glow', 'Bloom', 'Nova', 'Velvet', 'Luna', 'Sway', 'Aura', 'Charm', 'Pure', 'Fable'],
    imagePool: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f',
      'https://images.unsplash.com/photo-1495385794356-15371f348c31',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2',
      'https://images.unsplash.com/photo-1539185441755-769473a23570',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2',
      'https://images.unsplash.com/photo-1556656793-08538906a9f8',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf',
      'https://images.unsplash.com/photo-1520256863859-06895c0d10c5',
      'https://images.unsplash.com/photo-1551818255-e6e10975bc17',
      'https://images.unsplash.com/photo-1528701800489-20d7e1f0aa09',
      'https://images.unsplash.com/photo-1543508282-6319a3e2621f',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
      'https://images.unsplash.com/photo-1556040220-5b39f6a5f3c9',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a',
      'https://images.unsplash.com/photo-1517849845537-4d257902454a',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
      'https://images.unsplash.com/photo-1602122566075-df3a34d9417c',
      'https://images.unsplash.com/photo-1519321951929-7a35fa3cbf0c',
      'https://images.unsplash.com/photo-1553456558-aff63285bdd1'
    ],
    priceMin: 2000,
    priceMax: 22000
  },
  Children: {
    label: 'Children',
    sizes: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    brands: ['Nike Kids', 'Adidas Kids', 'Puma Kids', 'Skechers Kids', 'Reebok Kids', 'New Balance Kids', 'Converse Kids', 'ASICS Kids'],
    types: ['Sneakers', 'Running', 'School', 'Play', 'Outdoor', 'Lifestyle'],
    nameSeeds: ['Sprite', 'Rocket', 'Jump', 'Spark', 'Tiny', 'Buddy', 'Dash', 'Bloom', 'Mighty', 'Zoom'],
    imagePool: [
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef',
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74',
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9',
      'https://images.unsplash.com/photo-1553456558-aff63285bdd1',
      'https://images.unsplash.com/photo-1532635241-17e820acc59f',
      'https://images.unsplash.com/photo-1544717305-2782549b5136',
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef',
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9',
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74',
      'https://images.unsplash.com/photo-1553456558-aff63285bdd1',
      'https://images.unsplash.com/photo-1532635241-17e820acc59f',
      'https://images.unsplash.com/photo-1544717305-2782549b5136'
    ],
    priceMin: 850,
    priceMax: 5400
  }
};

const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const decorateImageUrl = (url, index) => {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}auto=format&fit=crop&w=900&q=80&sig=${Date.now()}-${index}-${Math.random().toString(36).slice(2, 8)}`;
};

const buildUniqueImageSet = (gender, usedUrls) => {
  const images = [];
  const pool = shuffle(GENDERS[gender].imagePool);

  for (let i = 0; i < pool.length && images.length < 3; i += 1) {
    const url = decorateImageUrl(pool[i], i + 1);
    if (!usedUrls.has(url)) {
      usedUrls.add(url);
      images.push(url);
    }
  }

  if (images.length < 3) {
    for (let i = 0; i < 30 && images.length < 3; i += 1) {
      const fallback = decorateImageUrl('https://images.unsplash.com/photo-1542291026-7eec264c27ff', i + 1000);
      if (!usedUrls.has(fallback)) {
        usedUrls.add(fallback);
        images.push(fallback);
      }
    }
  }

  return images;
};

const buildProduct = (gender, index, usedUrls, usedNames) => {
  const group = GENDERS[gender];
  const type = group.types[index % group.types.length];
  const brand = group.brands[index % group.brands.length];
  const nameSeed = group.nameSeeds[index % group.nameSeeds.length];

  let productName = `${brand} ${type} ${nameSeed} ${index + 1}`;
  while (usedNames.has(productName)) {
    productName = `${brand} ${type} ${nameSeed} ${index + 1 + Math.floor(Math.random() * 99)}`;
  }
  usedNames.add(productName);

  const sizes = shuffle(group.sizes).slice(0, randomNumber(4, 7));
  const images = buildUniqueImageSet(gender, usedUrls);

  return {
    name: productName,
    type,
    brand,
    shoefor: gender,
    description: `${group.label} performance footwear designed for comfort, speed, and everyday confidence. Built with breathable materials, impact support, and durable cushioning for all-day use.`,
    price: randomNumber(group.priceMin, group.priceMax),
    sizes,
    rating: Number((3.7 + Math.random() * 1.3).toFixed(1)),
    reviews: [
      'Very comfortable and stylish.',
      'Premium quality and good fit.',
      'Great value for the price.',
      'Excellent finish and support.'
    ],
    images,
    stock: randomNumber(8, 70)
  };
};

const createProductsForGender = (gender, count, usedUrls, usedNames) => {
  const products = [];
  for (let index = 0; index < count; index += 1) {
    products.push(buildProduct(gender, index, usedUrls, usedNames));
  }
  return products;
};

const seedProducts = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing. Please add it to your .env file.');
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for bulk seeding');

    await Product.deleteMany({});
    console.log('Cleared existing products from database');

    const usedUrls = new Set();
    const usedNames = new Set();
    const allProducts = [];

    for (const gender of ['Male', 'Female', 'Children']) {
      const generated = createProductsForGender(gender, 50, usedUrls, usedNames);
      allProducts.push(...generated);
      console.log(`Generated ${generated.length} ${gender} products`);
    }

    const inserted = await Product.insertMany(allProducts);

    console.log(`Inserted ${inserted.length} unique products successfully.`);
    console.log('Breakdown:', {
      Male: inserted.filter((item) => item.shoefor === 'Male').length,
      Female: inserted.filter((item) => item.shoefor === 'Female').length,
      Children: inserted.filter((item) => item.shoefor === 'Children').length
    });

    process.exit(0);
  } catch (error) {
    console.error('Failed to seed products:', error.message);
    process.exit(1);
  }
};

seedProducts();
