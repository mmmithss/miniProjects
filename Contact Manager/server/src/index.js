import express from "express";
import contactRoutes from "./router/contact.routes.js";

import dotenv from "dotenv";
import {dbConnection} from "./lib/dbc.js";

const app = express();
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use("/api/contacts", contactRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
  dbConnection();
});
