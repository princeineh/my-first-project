const express = require("express");

const app = express();
const PORT = 3000;

// middleware to read JSON
app.use(express.json());

// routes
const apiRoutes = require("./routes/api");
app.use("/", apiRoutes);

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});