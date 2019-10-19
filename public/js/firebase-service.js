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

function getInnoSelectionsCountPerStage(users) {
    let innoSelectionscountPerStage = [];
    for (let i = 0; i < store.investitionStage; i++) {
        innoSelectionscountPerStage[i] = 0;
    }
    for (let answers in users.docs.map(user => user.data().answers)) {
        for (let i = 0; i < store.investitionStage; i++) {
            innoSelectionscountPerStage[i] += answers[i] === INNOVATION_ID ? 1 : 0;
        }
    }
    return innoSelectionscountPerStage;
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
            if (!store.simulationStarted && store.countUsersInGroup !== users.size) {
                store.usernamesInGroup = users.docs.map(user => user.data().name);
                store.countUsersInGroup = users.size;
                showSimulationView();
                showGroupmembercount();
            }
            if (store.simulationStarted && store.investitionStage > store.innoSelectionsCountPerStage.length) {
                store.innoSelectionsCountPerStage = getInnoSelectionsCountPerStage(users);
            }
        }
    });
    fGroups.doc(getGroupId()).onSnapshot(function (group) {
        if (group && group.exists) {
            if ((!store.simulationStarted && group.data().simulationStarted) || (store.investitionStage !== group.data().investitionStage)) {
                store.investitionStage = group.data().investitionStage;
                store.simulationStarted = group.data().simulationStarted;
                store.calculation.calculate(store.investitionStage, store.userAnswers, store.innoSelectionsCountPerStage);
                showSimulationView();
            }
        }
    });
}