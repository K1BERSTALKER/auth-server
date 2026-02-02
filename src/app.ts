import express from "express";
import cors from "cors";
import authRoutes from "@routes/authRoutes";

const app = express();

const allowedOrigins = [
  "https://auth-client-i6s5z6q22-k1berstalkers-projects.vercel.app",
  "https://auth-client-git-main-k1berstalkers-projects.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow Postman, server-to-server requests
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/auth", authRoutes);

export default app;
