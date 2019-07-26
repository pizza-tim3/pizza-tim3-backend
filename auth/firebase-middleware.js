const firebase = require("firebase-firebase");

//authorization middleware, read, decode, verify
const verifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization;
  try {
    if (idToken) {
      const decodedToken = await firebase.auth().verifyIdToken(idToken);

      if(decodedToken) {
        req.body.uid = decodedToken.uid
      }

      return next();
    } else {
      res.status(401).json({ message: "You are not unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//This function makes sure that access to the
//user specific route is the same as the one making the request.

//This function *must* come after verifyToken,
//otherwise req.uid will be undefined
// const verifyUser = async (req, res, next) => {
//   const uid = req.uid;
//   const reqUid = req.params.uid;
//   //compare if decoded uid !== the incoming uid on the request
//   if (uid !== reqUid) {
//     res.status(403).json({ message: "unauthorized" });
//   } else {
//     next();
//   }
// };



module.exports = { verifyToken, verifyUser };
