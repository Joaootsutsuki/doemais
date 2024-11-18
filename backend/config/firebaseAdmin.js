var admin = require("firebase-admin");

var serviceAccount = require("../doe-mais-c884c-firebase-adminsdk-3os12-35811be585.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
