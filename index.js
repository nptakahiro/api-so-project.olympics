//アプリのグローバル設定
const config = require("./config");

//DB接続
const knex = require("knex")(config.db);

//express接続
const express = require("express");
const app = express();

const setupServer = () => {
  app.use(express.json());
  app.use(express.static("public"));

  //確認用
  app.get("/api", (req, res) => {
    res.send("We did it!");
  });

  //チーム、メダルデータ取得
  app.get("/v1/team/medals", (req, res) => {
    knex("olygold")
      .select("team", "gold")
      .from("medals")
      .then(result => {
        res.send(result);
      });
  });

  //チームデータ取得
  app.get("/v1/team/list", (req, res) => {
    const { limit } = req.query;
    knex("olygold")
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
    app.post("/v1/team/list", (req, res) => {
      const team = Object.values(req.body)[0];
      knex("olygold")
        .select("team")
        .from("medals")
        .then(result => {
          let ret = result.map(val => val.team);
          ret.push(team);
          res.send(ret);
        });
    });

    //データ削除
    app.delete("/v1/team/list/:team", (req, res) => {
      const { team } = req.params;
      knex("olygold")
        .select("team")
        .from("medals")
        .then(result => {
          let ret = result.map(val => val.team);
          ret = ret.filter(val => val !== team);
          res.send(ret);
        });
    });

    //データ変更
    app.patch("/v1/team/list/:team", (req, res) => {
      const { team } = req.params;
      const newTeam = Object.values(req.body)[0];
      knex("olygold")
        .select("team")
        .from("medals")
        .then(result => {
          let ret = result.map(val => {
            if (val.team === team) {
              return newTeam;
            } else {
              return val.team;
            }
          });
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
