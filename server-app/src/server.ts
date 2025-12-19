import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from './config/dbConfig';
import shortUrl from './routes/shortUrl';   
import { log } from 'node:console';
dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5001;


app.use(express.json());
// app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "https://resilient-narwhal-e61a43.netlify.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// ✅ Explicit preflight support
app.options("*", cors());

app.use("/api/",shortUrl)

// app.get('/', (req, res) => {
//     res.send('API is running....');
// })

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})