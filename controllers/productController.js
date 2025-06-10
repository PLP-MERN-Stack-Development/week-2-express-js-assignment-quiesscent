const products = [
  {
    id: "1",
    name: "Laptop",
    description: "High-performance laptop with 16GB RAM",
    price: 1200,
    category: "electronics",
    inStock: true,
  },
  {
    id: "2",
    name: "Smartphone",
    description: "Latest model with 128GB storage",
    price: 800,
    category: "electronics",
    inStock: true,
  },
  {
    id: "3",
    name: "Coffee Maker",
    description: "Programmable coffee maker with timer",
    price: 50,
    category: "kitchen",
    inStock: false,
  },
];
const { v4: uuidv4 } = require("uuid");
const { NotFoundError } = require("../utils/customErrors");

exports.getAllProducts = (req, res) => {
  const { category, page = 1, limit = 5 } = req.query;
  let filtered = [...products];
  if (category) filtered = filtered.filter((p) => p.category === category);
  const start = (page - 1) * limit;
  const end = start + parseInt(limit);
  res.json(filtered.slice(start, end));
};

exports.getProductById = (req, res, next) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return next(new NotFoundError("Product not found"));
  res.json(product);
};

exports.createProduct = (req, res) => {
  const product = { id: uuidv4(), ...req.body };
  products.push(product);
  res.status(201).json(product);
};

exports.updateProduct = (req, res, next) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError("Product not found"));
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
};

exports.deleteProduct = (req, res, next) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError("Product not found"));
  products.splice(index, 1);
  res.status(204).end();
};

exports.searchProducts = (req, res) => {
  const { name } = req.query;
  const result = products.filter((p) =>
    p.name.toLowerCase().includes(name.toLowerCase()),
  );
  res.json(result);
};

exports.getProductStats = (req, res) => {
  const stats = {};
  products.forEach((p) => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json(stats);
};
