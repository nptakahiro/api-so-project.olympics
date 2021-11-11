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

  describe("DELETE /team/list/:team", () => {
    it("should delete a team", async () => {
      const res = await request.delete("/team/list/Japan");
      const actual = JSON.parse(res.text);
      const actualArr = actual.filter(val => val === "Japan");
      actualArr.length.should.equal(0);
      request.close();
    });
  });

  describe("PATCH /team/list/:team", () => {
    it("should delete a team", async () => {
      const res = await request
        .patch("/team/list/C_te dIvoire")
        .send({ team: "C_te d'Ivoire" });

      const actual = JSON.parse(res.text);
      const beforeArr = actual.filter(val => val === "C_te dIvoire");
      beforeArr.length.should.equal(0);
      const afterArr = actual.filter(val => val === "C_te d'Ivoire");
      afterArr.length.should.equal(1);
      request.close();
    });
  });
});
