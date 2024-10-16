const admin = require('firebase-admin');
require('dotenv').config(); 

admin.initializeApp({
  credential: admin.credential.cert(require(process.env.FIREBASE_ADMIN_SDK)),
});

module.exports = admin;
