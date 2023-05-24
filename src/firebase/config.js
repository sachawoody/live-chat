import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD7VU31Ll1GXCAXZqI_Ehz4mwWhV9mOoMk",
  authDomain: "live-chat-c4578.firebaseapp.com",
  projectId: "live-chat-c4578",
  storageBucket: "live-chat-c4578.appspot.com",
  messagingSenderId: "963493623729",
  appId: "1:963493623729:web:af0ddd23dd00166a18ef90",
  measurementId: "G-ZBSWTLB8XR"
};

// init firebase
firebase.initializeApp(firebaseConfig)

const projectAuth = firebase.auth()
const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectAuth, projectFirestore, timestamp }
