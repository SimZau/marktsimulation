"use strict";
let config = {
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
const db = firebase.firestore();

const fGroups = db.collection("groups");

function save(doc, object, success, error = (e) => console.log("Error: ", e)) {
    doc.get().then(function (loadedDoc) {
        loadedDoc.exists ? doc.update(object) : doc.set(object);
    }).then(success).catch(error);
}

function saveGroup(group) {
    save(
        fGroups.doc(getGroupId()),
        group,
        () => console.log("Saved Group!")
    );
}

function initGroup() {
    saveGroup({
        userclass: store.userclass,
        usergroup: store.usergroup,
        investitionStage: 0,
        simulationStarted: 0
    });
}

function saveUser(user) {
    save(
        fGroups.doc(getGroupId()).collection("users").doc(store.username),
        user,
        () => console.log("Saved User!")
    );
}

function initUser(name, age, gender, region) {
    saveUser({
        name: name,
        age: age,
        gender: gender,
        region: region,
        answers: []
    });
}

function subscribeDataLoader() {
    fGroups.doc(getGroupId()).collection("users").doc(store.username).onSnapshot(function (user) {
        if (user && user.exists) {
            console.log("User loaded: " + user.data().name);
            store.userAnswers = user.data().answers;
        }
    });
    fGroups.doc(getGroupId()).collection("users").onSnapshot(function (users) {
        if (users && users.docs) {
            store.usernamesInGroup = users.docs.map(user => user.data().name);
            if (!store.simulationStarted && store.countUsersInGroup !== users.size) {
                showSimulationView();
            }
            store.countUsersInGroup = users.size;
            footerGroupmembercount.innerHTML = "Gruppenmitglieder: " + store.countUsersInGroup;
        }
    });
    fGroups.doc(getGroupId()).onSnapshot(function (group) {
        if (group && group.exists) {
            store.investitionStage = group.data().investitionStage;
            if (!store.simulationStarted && group.data().simulationStarted) {
                userOverview.style.display = "none";
                simulationDiv.style.display = "block";
            }
            store.simulationStarted = group.data().simulationStarted;
            console.log("Group loaded: Stage " + store.investitionStage);
        }
    });
}