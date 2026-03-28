import 'dotenv/config'
import app from '../config/express';
import indexRouter from './routes/index.router';

app.use('/', indexRouter);
if (process.env.NODE_ENV === "development") {
  app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}!`);
  });
}
export default app;
