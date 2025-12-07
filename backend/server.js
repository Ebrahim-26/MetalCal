import express from "express";
import metalListRoutes from "./routes/metalListRoute.js";


const app = express();
const port = process.env.PORT || 8000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello word.");
});

app.use("/api/metalList", metalListRoutes);


app.listen(port, () => console.log(`Server is running on port ${port}.`));
