import express from "express";
import cors from "cors";

const app = express();

app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.get("/", (req, res) => {
  res.send("Hi, how are you?");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App is running very fine on port ${PORT}`);
});
