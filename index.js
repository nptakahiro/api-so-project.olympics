//アプリのグローバル設定
const config = require("./config");

//DB接続
const knex = require("knex")(config.db);

//express接続
const express = require("express");
const app = express();

const setupServer = () => {
  app.use(express.json());
  app.use(express.static("web"));

  //確認用
  app.get("/api", (req, res) => {
    res.send("We did it!");
  });

  //チーム、メダルデータ取得
  app.get("/team/medals", (req, res) => {
    knex("olympicsdb")
      .select("team", "gold")
      .from("medals")
      .then(result => {
        res.send(result);
      });
  });

  //チームデータ取得
  app.get("/team/list", (req, res) => {
    const { limit } = req.query;
    knex("olympicsdb")
      .select("team")
      .from("medals")
      .then(result => {
        let ret = result.map(val => val.team);
        if (limit > 0) {
          ret = ret.slice(0, limit);
        }
        res.send(ret);
      });

    //データ追加
    app.post("/team/list", (req, res) => {
      const team = Object.values(req.body)[0];
      knex("olympicsdb")
        .select("team")
        .from("medals")
        .then(result => {
          let ret = result.map(val => val.team);
          ret.push(team);
          res.send(ret);
        });
    });
  });
  return app;
};

const server = setupServer();
server.listen(config.express.port, () => {
  console.log(`Server up and listening on port ${config.express.port}`);
});

module.exports = { setupServer };
