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
let db = firebase.firestore();
const users = db.collection("users");

const titleHeader = document.querySelector("#title");
const userForm = document.querySelector("#userForm");
const simulationDiv = document.querySelector("#simulation");

//todo remove
localStorage.removeItem('username');

let username = localStorage.getItem('username');
if (!username) {
    userForm.style.display = "inline";
} else {
    simulationDiv.style.display = "inline";
}

function save(form) {
    userForm.style.display = "none";
    simulationDiv.style.display = "inline";
    username = form.name.value;
    localStorage.setItem('username', username);

    console.log("User to save: " + username);
    users.doc(username).set({
        name: username,
        age: form.age.value,
    }).then(function () {
        console.log("Saved!");
    }).catch(function (error) {
        console.log("Error: ", error);
    });

    simulationDiv.style.display = "inline";
}

getRealtimeUpdates = function () {
    if (username) {
        users.doc(username).onSnapshot(function (tom) {
            if (tom && tom.exists) {
                console.log("My name is " + tom.data().name);
                titleHeader.innerText = "My name is " + tom.data().name;
            }
        });
    }
};

getRealtimeUpdates();

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