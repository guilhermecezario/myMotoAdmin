var firebaseConfig = {
  apiKey: "AIzaSyAfgjSwZ6q_1aCFNXlEhJv_vyltl2qD-lI",
  authDomain: "mymoto-9f776.firebaseapp.com",
  databaseURL: "https://mymoto-9f776.firebaseio.com",
  projectId: "mymoto-9f776",
  storageBucket: "mymoto-9f776.appspot.com",
  messagingSenderId: "74704005722",
  appId: "1:74704005722:web:9d6b1ea47ac201a1"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database().ref();