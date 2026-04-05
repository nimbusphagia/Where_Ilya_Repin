import 'dotenv/config'
import app from '../config/express.js';

if (process.env.NODE_ENV === "development") {
  app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}!`);
  });
}
export default app;
