import express from "express";
import cors from "cors";
import authRoutes from "@routes/authRoutes";

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow Postman / server requests
      if (origin.endsWith(".vercel.app")) {
        callback(null, true); // allow all Vercel deployments
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
