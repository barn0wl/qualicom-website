// backend/src/index.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database";

// Import routes (we'll create these next)
// import newsRoutes from "./routes/newsRoutes";
// import clientRoutes from "./routes/clientRoutes";
// import galleryRoutes from "./routes/galleryRoutes";
// import contactRoutes from "./routes/contactRoutes";
// import partnerRoutes from "./routes/partnerRoutes";
// import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes (we'll add these next)
// app.use("/api/news", newsRoutes);
// app.use("/api/clients", clientRoutes);
// app.use("/api/gallery", galleryRoutes);
// app.use("/api/contact", contactRoutes);
// app.use("/api/partners", partnerRoutes);
// app.use("/api/auth", authRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
