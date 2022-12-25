require("dotenv").config();

const { createApp } = require("./app");
const  appDataSource  = require("./src/models/data-source");

const setServer = async() => {
  const app = createApp();
  const PORT = process.env.PORT;

  appDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch(() => {
    console.log("Error: Data Source initialization has been failed");
  });

  app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
  });

};

setServer();