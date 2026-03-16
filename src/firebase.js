import {initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"


//Firebaseの設定
const firebaseConfig ={
     apiKey: "AIzaSyBXgrOdd-RlT0V1Bxwn8xHvKFC641tYTrI",
  authDomain: "fir-practice-6d1c3.firebaseapp.com",
  projectId: "fir-practice-6d1c3",
  storageBucket: "fir-practice-6d1c3.firebasestorage.app",
  messagingSenderId: "868812954174",
  appId: "1:868812954174:web:6b49f12c0a7401c84d0f6f",
  measurementId: "G-RNVHM022G4"
};


//Firebase初期化
const app =initializeApp(firebaseConfig);  //firebaseの起動
//Firestoreを使えるようにする
const db =getFirestore(app);  //firestoreデータベースを扱う
const auth =getAuth(app)
export  {app,db,auth};  //他のファイルでも使えるようにする