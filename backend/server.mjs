import express from "express";
import cors from "cors";
import fs from "fs/promises";
const app = express();

app.use(cors());

app.get("/", async (req, res) => {
  try {
    const data = await fs.readFile("./posts.txt", "utf-8");
    const json =  JSON.parse(data)

    res.json(json)
  } catch (err) {
    console.log("reading the error: ", err);
    res.status(500).json({ error: "error al leer el archivo" });
  }
});

app.listen(8080, () => {
  console.log(`server listening on port http://localhost:8080`);
});
