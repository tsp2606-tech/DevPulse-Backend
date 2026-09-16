import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import resourceRoutes from './routes/resourceRoutes.js';
import authRoutes from './routes/authRoutes.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpecs } from './config/swagger.js';

dotenv.config();
const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5174",
  // Vercel frontend
  "https://dev-pulse-frontend-thaisonpham26.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server: http://localhost:${PORT}`));
