var config = {
  apiKey: "AIzaSyA2qPtA81cSWRj-tOEwF1fgTmnbweFOnbk",
  authDomain: "markt-simulation.firebaseapp.com",
  databaseURL: "https://markt-simulation.firebaseio.com",
  projectId: "markt-simulation",
  storageBucket: "",
  messagingSenderId: "361847436208",
  appId: "1:361847436208:web:9081c036f1e94c3ae11c75"
};
// Initialize Firebase
firebase.initializeApp(config);
var db = firebase.firestore();
const userTom = db.doc("users/Tom");

const titleHeader = document.querySelector("#title");

function save(form) {
  const name = form.name.value;
  const age = form.age.value;
  console.log("Values to save: " + name + ", " + age);
  userTom.set({
    name: name,
    age: age
  }).then(function() {
    console.log("Saved!");
  }).catch(function (error) {
    console.log("Error: ", error);
  });
}

getRealtimeUpdates = function () {
  userTom.onSnapshot(function (tom) {
    if (tom && tom.exists) {
      console.log("My name is " + tom.data().name);
      titleHeader.innerText = "My name is " + tom.data().name;
    }
  });
};

getRealtimeUpdates();


// var username = localStorage.getItem('username');
// var user;
// if (username) {
//   db.collection("users").where("name", "==", username).get()
//     .then(function (foundUsers) {
//       if (foundUsers) {
//         user = foundUsers;
//       }
//     });
// }
//
// db.collection("users").doc("Tom").set({
//   name: "Tom",
//   age: 17
// });
//
// db.collection("users").doc("Tom").get().then(function (userTom) {
//   console.log(userTom.name);
//   var title = document.getElementById('title');
//   title.innerText = userTom.name;
// });