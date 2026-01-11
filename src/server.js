require("dotenv").config();
const connectDB = require("./db");
const app = require("./app");

const PORT = 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
