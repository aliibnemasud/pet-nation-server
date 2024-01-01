import config from "./config";
import app from "./app";
import mongoose from 'mongoose';
import { Server } from 'http';
import { errorLogger, logger } from "./shared/logger/logger";

/* app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
}); */

process.on('uncaughtException', error => {
  console.log('Uncaught Exception detected.....: ', error);

  errorLogger.error(error);
  process.exit(1);
});

let server: Server;

async function dbConnection() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Pet Nation Database connected successfully...');

    server = app.listen(config.port, () => {
      logger.info(
        `Pet Nation application listening on port ${config.port}`
      );
    });
  } catch (error) {
    errorLogger.error('Failed to connect database.', error);
  }

  // To prevent unhandled rejection
  process.on('unhandledRejection', error => {
    console.log(
      'Unhandled Rejection Detected, We are closing our server.......'
    );
    if (server) {
      server.close(() => {
        errorLogger.error('From Server', error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

dbConnection();

// Sig Term send to the logger... It is used to stop the server || PM2

/* process.on('SIGTERM', () => {
  logger.info('SIGTERM is received!');
  if (server) {
    server.close();
  }
}); */
