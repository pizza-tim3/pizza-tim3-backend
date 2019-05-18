const admin = require("firebase-admin");

//authorization middleware, read, decode, verify
module.exports = async (req, res, next) => {
  //get the idToken from the authorization header
  //idToken comes from the client app by setting the authorization header to
  //const token = await app.auth().currentUser.getIdToken();
  const idToken = req.headers.authorization;

  try {
    //if idToken exists
    if (idToken) {
      //decode the token
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      //get the user id
      const uid = decodedToken.uid;
      //put the user id on the req object
      req.uid = uid;
      //go to next middleware/routing logic
      next();
    } else {
      res.status(403).json({ message: "unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
