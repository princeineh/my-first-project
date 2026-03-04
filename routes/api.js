const express = require("express");
const router = express.Router();

const { getFarmers, addFarmer } = require("../controllers/farmerController");

// home
router.get("/", (req, res) => {
  res.send("Welcome to Prince API");
});

// farmers
router.get("/farmers", getFarmers);
router.post("/farmers", addFarmer);

// products
router.get("/products", (req, res) => {
  const products = [
    { id: 1, name: "Tomatoes", price: 4500 },
    { id: 2, name: "Pepper", price: 3000 },
    { id: 3, name: "Rice", price: 8000 }
  ];

  res.json(products);
});

module.exports = router;