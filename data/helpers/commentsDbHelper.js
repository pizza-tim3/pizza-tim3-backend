const db = require("../dbConfig.js");

module.exports = {
  getAll,
  getBy,
  add,
  update,
  remove,
};

function getAll() {
  return db("comments");
};

function getBy() {

};

async function add() {

};

async function update() {

};

async function remove() {

};