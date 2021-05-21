var admin = require("firebase-admin");

var serviceAccount = require("./it4435-chuyende-firebase-adminsdk-bou5c-841187c595.json");
// Initialize firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "it4435-chuyende.appspot.com"
})
// Cloud storage
const bucket = admin.storage().bucket()

module.exports = {
  bucket
}