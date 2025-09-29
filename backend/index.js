import app from './src/app.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`); //server listening
    });
  } catch (error) {
    console.error('error:', error);
    process.exit(1);
  }
};

startServer();
