import app from './src/app.js';
import { createDefaultAdmin } from './src/utils/createDefaultAdmin.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await createDefaultAdmin(); //check & create default admin
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`); //server listening
    });
  } catch (error) {
    console.error('error:', error);
    process.exit(1);
  }
};

startServer();
