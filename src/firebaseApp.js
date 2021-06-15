import FirebaseApp from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyD9I2d4j0kUY0ZjV0biD8oZ2zMDk6E3cLQ",
  authDomain: "redkit-firestore.firebaseapp.com",
  projectId: "redkit-firestore",
  storageBucket: "redkit-firestore.appspot.com",
  messagingSenderId: "255893033097",
  appId: "1:255893033097:web:e1743e80c862222011b658",
  measurementId: "G-2FYH9GHE7B",
};
const app = FirebaseApp.initializeApp(config);
export default app;
