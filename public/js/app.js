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

const navbarUsername = document.querySelector("#navbarUsername");
const navbarUser = document.querySelector("#navbarUser");
const userForm = document.querySelector("#userForm");
const simulationDiv = document.querySelector("#simulation");

//todo remove
localStorage.removeItem('username');

let username = localStorage.getItem('username');
let userclass = localStorage.getItem('userclass');
let group;

init();

function init() {
    if (!username) {
        userForm.style.display = "inline";
    } else {
        setData();
        subscribeDataLoader();
    }
}

function setData() {
    userForm.style.display = "none";
    simulationDiv.style.display = "inline";
    navbarUsername.innerHTML = username;
    navbarUser.style.display = "inline";
}

function setUpUiUserdata(form) {
    username = form.name.value;
    userclass = form.class.value;
    localStorage.setItem('username', username);
    localStorage.setItem('userclass', userclass);
    setData();
}

function saveData(form) {
    users.doc(username).set({
        name: username,
        age: form.age.value,
        gender: readRadio(form, "gender"),
        region: readRadio(form, "region"),
        class: userclass,
        group: form.group.value
    }).then(function () {
        console.log("Saved!");
    }).catch(function (error) {
        console.log("Error: ", error);
    });
}

function save(form) {
    console.log("User to save: " + username);
    setUpUiUserdata(form);
    saveData(form);
    subscribeDataLoader();
}

function readRadio(form, radioName) {
    let radio = form[radioName];
    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            return radio[i].value;
        }
    }
}

function subscribeDataLoader() {
    users.doc(username).onSnapshot(function (user) {
        if (user && user.exists) {
            group = user.data().group;
            console.log("User loaded: " + user.data().name);
        }
        users.where("group", "==", group).onSnapshot(function (usersInGroup) {
            console.log("Users in group: " + usersInGroup.size);
        });
    });
}