let farmers = [
  { id: 1, name: "Prince Farm", crop: "Tomatoes" },
  { id: 2, name: "Lagos Green Farm", crop: "Pepper" },
  { id: 3, name: "Abuja Fresh Farm", crop: "Rice" }
];

function getFarmers(req, res) {
  res.json(farmers);
}

function addFarmer(req, res) {
  const newFarmer = req.body;

  newFarmer.id = farmers.length + 1;

  farmers.push(newFarmer);

  res.json({
    message: "Farmer added successfully",
    farmer: newFarmer
  });
}

module.exports = { getFarmers, addFarmer };