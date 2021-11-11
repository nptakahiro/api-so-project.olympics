//アプリのグローバル設定
const config = require("./config");

//DB接続
const knex = require("knex")(config.db);

//express接続
const express = require("express");
const app = express();

//server開始
 app.listen(config.express.port, () => {
    console.log(`Server up and listening on port ${config.express.port}`);
  });