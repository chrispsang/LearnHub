// server.ts
import express from 'express';
import cors from 'cors';
import http from 'http';
import User from './models/User';
import './models/Course';
import './models/Quiz';
import './models/User';
import './models/UserQuizProgress';
import './models/Leaderboard';
import './models/associations';
import authRoutes from './routes/authRoutes';
import courseRoutes from './routes/courseRoutes';
import quizRoutes from './routes/quizRoutes';
import userQuizProgressRoutes from './routes/userQuizProgressRoutes';
import leaderboardRoutes from './routes/leaderboardRoutes';
import forumRoutes from './routes/forumRoutes';
import reviewRoutes from './routes/reviewRoutes'; 

const app = express();
const server = http.createServer(app);

// Middleware setup
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200,
}));
app.use(express.json());


const PORT = process.env.PORT || 5001;

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await user.authenticate(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', userId: user.id });
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the Online Learning Platform API');
});

app.use('/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api', userQuizProgressRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api', forumRoutes);
app.use('/api', reviewRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


