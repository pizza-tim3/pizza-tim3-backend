function isRequestFromUser(firebase_uid, req_uid) {
  return firebase_uid === req_uid;
}

isRequestFromUser.desc = `This function checks the passed in firebase_uid to determine 
   if it's value is the same as the firebase_uid on the uid property.
   
   Requries the token to have been decoded and placed on the req object`;

module.exports = isRequestFromUser;
