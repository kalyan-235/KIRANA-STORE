import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Routes
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes  from './routes/productRoutes.js';
import userRoutes     from './routes/userRoutes.js';
import orderRoutes    from './routes/orderRoutes.js';
import uploadRoutes   from './routes/uploadRoutes.js';

dotenv.config();

const app = express();

// ── Middleware ──
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://kirana-store-ecru.vercel.app',
];

app.use(cors({
  origin: (origin, callback) => {
    callback(null, !origin || allowedOrigins.includes(origin));
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── API Routes ──
app.use('/api/categories', categoryRoutes);
app.use('/api/products',   productRoutes);
app.use('/api/users',      userRoutes);
app.use('/api/orders',     orderRoutes);
app.use('/api/uploads',    uploadRoutes);

// ── Health check ──
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Ram Kirana Store API is running 🚀',
    env:  process.env.NODE_ENV,
    time: new Date().toISOString(),
  });
});

// ── Error Middleware (must be last) ──
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`\n🚀 Server running on http://localhost:${PORT}`);
      console.log(`📦 Environment : ${process.env.NODE_ENV}`);
      console.log(`📡 API Base    : http://localhost:${PORT}/api\n`);
    });
  } catch (error) {
    console.error(`❌ Server startup failed: ${error.message}`);
    process.exitCode = 1;
  }
};

startServer();
