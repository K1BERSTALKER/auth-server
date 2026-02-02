import express from "express";
import cors from "cors";
import authRoutes from "@routes/authRoutes";

const app = express();

app.use(
  cors({
    origin: "https://auth-client-i6s5z6q22-k1berstalkers-projects.vercel.app",
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
