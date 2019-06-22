const db = require("../dbConfig.js");

module.exports = {
  getAll,
  getById,
  getByUid,
  getByName,
  add,
  update,
  remove,
  getNewFriends
};

function getAll() {
  return db("users");
}

function getById(id) {
  return db("users")
    .where({ id })
    .first();
}

function getByUid(uid) {
  return db("users")
    .where({ firebase_uid: uid })
    .first();
}

async function add(user) {
  return await db("users")
    .insert(user, "id")
    .then(ids => {
      return getById(ids[0]);
    });
}

async function update(uid, changes) {
  return await db("users")
    .where({ firebase_uid: uid })
    .update(changes, "id")
    .then(id => {
      return getById(id);
    });
}

async function remove(uid) {
  return db("users")
    .where({ firebase_uid: uid })
    .del();
}

async function getByName(name){
    console.log(name)
   return db("users")
   .where('first_name',"like","%" + name + "%")
  //  .orWhere('last_name',"like","%" + name + "%")
  .then( function( resp ){
    console.log( resp );
    return resp;
}).catch(function(err) {
   console.log(err);
})
   

}
async function getNewFriends(name,user_uid){
    return db.select("first_name","last_name","firebase_uid","email")
    .from ("users")
    .where("users.first_name","like","%" + name+"%") // Till here it selects user with matching name. Lets call array of filtered users as MATCHED_NAME_USERS.
    .whereNotIn("firebase_uid", function(){ // This wherenNotIn gets rid of all user ids from MATCHED_NAME_USERS that appears in friend_uid column of friend table alongside 
                                             //user_uid passed (meaning user doing the search)
                                            // Basically inner select selects list of friend_uid from friends table who appear in same raw as user_uid doing the search.
                                            // So when whereNotIn filter is applied to  MATCHED_NAME_USERS, it skips those users who appear in friend_uid column of friends
                                            // table alongside user_uid of user doing search. 
                                            // In short, this is getting rid of users from MATCHED_NAME_USERS who alrady have received friend request from user doing
                                            // search (user_uid passed here)
                                            // Look at row 6 in friends table in db.
      this.select("friend_uid").from("friends").where("user_uid","=",user_uid).catch(function(err) {console.log("Error1",err)});
    })
    .whereNotIn("firebase_uid", function(){ // This wherenNotIn looks for rows of friends table where friend_uid contains the user_uid passed (user doing the search) and user_uid container the users from MATCHED_NAME_USERS.
                                            // Basically inner select selects list of user_uid from friends table who appear in same raw as friend_uis = user_uid doing the search.
                                            // So when whereNotIn filter is applied to  MATCHED_NAME_USERS, it skips those users who appear in user_uid column of friends
                                            // table alongside friend_uid of user doing search. 
                                            // In short, this is getting rid of users from MATCHED_NAME_USERS who alrady have sent friend request to user doing search (user_uid passed here)
                                            // Look at row 7 in friends table in db.
      this.select("user_uid").from("friends").where("friend_uid","=",user_uid).catch(function(err) {console.log("Error1",err)});
    })
    .then( function( resp ){
      console.log( resp );
      return resp;
  }).catch(function(err) {
     console.log("Error2",err);
  })
  
     
}

