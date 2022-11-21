import "dotenv/config";
import express, { urlencoded } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import compression from "compression";
import models, { sequelize } from "./models/init-models";
import routes from "./routes/indexRoutes";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(async (req, res, next) => {
  req.context = { models };
  next();
});

app.use("/api/student", routes.studentRoute);
app.use("/api/major", routes.majorRoute);
app.use("/api/auth", routes.authRoute);

// Handle Error Middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something bad wrong !!!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const dropDatabaseSync = false;
sequelize.sync({ force: dropDatabaseSync }).then(async () => {
  if (dropDatabaseSync) {
    console.info("Database do not drop");
  }
  app.listen(port, () => {
    console.info("App listen in port " + port);
  });
});

export default app;
