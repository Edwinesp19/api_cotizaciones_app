const express = require("express");
const cors = require("cors");

const app = express();
//CORS
app.use(cors());
// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// Routes
app.use(require("./routes/products"));
app.use(require("./routes/users"));
app.use(require("./routes/orders"));
app.use(require("./routes/ordersdetails"));
app.use(require("./routes/customers"));

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});

//npm run dev
