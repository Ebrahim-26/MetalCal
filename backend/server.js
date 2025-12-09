import express from "express";
import metalListRoutes from "./routes/metalListRoute.js";
import entryListRoutes from "./routes/entryListRoute.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello word.");
});

app.use("/api/metalList", metalListRoutes);

app.use("/api/entryList", entryListRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}.`));
