process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");

let items = require("../fakeDb")

let item = { name: "chesse", price:200 }

beforeEach(async () => {
  items.push(item)
});

afterEach(async () => {
  items.length = 0;
});


describe("GET /items", async function () {
  test("Gets a list of items", async function () {
    const res = await request(app).get(`/items`);
    const { items } = res.body;
    expect(res.statusCode).toBe(200);
    expect(items).toHaveLength(1);
  });
});


describe("GET /items/:name", async function () {
  test("Gets a single item", async function () {
    const res = await request(app).get(`/items/${item.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.item).toEqual(item);
  });

  test("Responds with 404 if can't find item", async function () {
    const res = await request(app).get(`/items/0`);
    expect(res.statusCode).toBe(404);
  });
});


describe("POST /items", async function () {
  test("Creates a new item", async function () {
    const res = await request(app).post(`/items`).send({ name: "milk", price: 0 });
    expect(res.statusCode).toBe(200);
    expect(res.body.item.name).toEqual("milk");
    expect(res.body.item.price).toEqual(0);
  });
});


describe("PATCH /items/:name", async function () {
  test("Updates a single item", async function () {
    const res = await request(app).patch(`/items/${item.name}`).send({ name: "apples"});
    expect(res.statusCode).toBe(200);
    expect(res.body.item).toEqual({ name: "apples" });
  });

  test("Responds with 404 can't find item", async function () {
    const res = await request(app).patch(`/items/0`.send({ name: "apples"}));
    expect(res.statusCode).toBe(404);
  })
});


describe("DELETE /items/:name", async function () {
  test("Deletes a single a item", async function () {
    const res = await request(app).delete(`/items/${item.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Deleted" });
  });
 });


