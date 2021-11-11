const chai = require("chai");
const chaiHttp = require("chai-http");
const { setupServer } = require("../");
const config = require("../config");
const knex = require("knex")(config.db);
chai.should();
chai.use(chaiHttp);

const server = setupServer();

describe("API server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server).keepOpen();
  });
  describe("teams", () => {
    it("should return api messge", async () => {
      const res = await request.get("/api");
      res.text.should.equal("We did it!");
      request.close();
    });
  });

  describe("teams", () => {
    it("should get all teams", async () => {
      const res = await request.get("/team/list?limit=3");
      const expected = JSON.stringify([
        "United States of America",
        "China",
        "Japan"
      ]);
      res.text.should.equal(expected);
      request.close();
    });
  });

  describe("POST /team/list", () => {
    it("should get all teams", async () => {
      const res = await request.post("/team/list").send({ team: "npKingdom" });
      const actual = JSON.parse(res.text);
      const actualArr = actual.filter(val => val === "npKingdom");
      actualArr.length.should.equal(1);
      request.close();
    });
  });
});
