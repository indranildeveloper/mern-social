// eslint-disable-next-line no-unused-vars
import colors from "colors";
import app from "./express";
import { config } from "./config";
import { connectDB } from "./database";

// MongoDB Connection
connectDB();

app.listen(config.PORT, (error) => {
  if (error) {
    console.error(`Error: ${error}`.red.underline);
  }
  console.info(`Server started on port: ${config.PORT}`.cyan.underline);
});
