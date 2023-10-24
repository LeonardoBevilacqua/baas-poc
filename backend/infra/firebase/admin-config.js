import admin from "firebase-admin";
import serviceAccount from "../../firebase-key.json";

const admin_firebase_app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin_firebase_app;
