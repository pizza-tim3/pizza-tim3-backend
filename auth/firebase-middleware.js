const admin = require("firebase-admin");

//authorization middleware, read, decode, verify
const verifyToken = async (req, res, next) => {
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

//This function makes sure that access to the
//user specific route is the same as the one making the request.

//This function *must* come after verifyToken,
//otherwise req.uid will be undefined
const verifyUser = async (req, res, next) => {
  const uid = req.uid;
  const reqUid = req.params.uid;
  //compare if decoded uid !== the incoming uid on the request
  if (uid !== reqUid) {
    res.status(403).json({ message: "unauthorized" });
  } else {
    next();
  }
};

module.exports = { verifyToken, verifyUser };
