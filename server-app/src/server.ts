import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from './config/dbConfig';
import shortUrl from './routes/shortUrl';   
import { log } from 'node:console';
dotenv.config();
connectDB();

const app = express();
const port = Number(process.env.PORT) || 5001;


app.use(express.json());
// app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://resilient-narwhal-e61a43.netlify.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use("/api/",shortUrl)

// ✅ Health check (IMPORTANT for Render)
app.get("/", (req, res) => {
  res.send("API running");
});

// app.get('/', (req, res) => {
//     res.send('API is running....');
// })

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});