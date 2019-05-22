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
}

function getBy() {

}

function add() {

}

function update() {

}

function remove() {

}