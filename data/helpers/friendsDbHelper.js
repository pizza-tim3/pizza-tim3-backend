const db = require("../dbConfig.js");

module.exports = {
  request,
  accept,
  reject,
  getAll
};

async function request(uid, fuid) {
  return await db('friends')
  .insert({'uid': uid, 'friend_uid': fuid, 'status': 'pending'});
}


async function accept(uid, fuid) {
  return await db('friends')
    .where({ 'uid': uid })
    .andWhere({ 'friend_uid': fuid })
    .update({ 'status': 'accepted' })
}

async function reject(uid, fuid) {
  console.log(uid, fuid)
  return await db('friends')
    .where({ 'uid': uid })
    .andWhere({ 'friend_uid': fuid })
    .del()
}

async function getAll() {
  return await db('friends')
}
