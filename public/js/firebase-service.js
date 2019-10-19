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
        innoSelectionscountPerStage[i] = users.docs.map(user => user.data().answers[i] === INNOVATION_ID ? 1 : 0).reduce((acc, cur) => acc + cur);
    }
    return innoSelectionscountPerStage;
}

function getAnswerCountPerStage(users) {
    let answerCountPerStage = [];
    for (let i = 0; i <= store.investitionStage; i++) {
        answerCountPerStage[i] = users.docs.map(user => user.data().answers[i] ? 1 : 0).reduce((acc, cur) => acc + cur);
    }
    return answerCountPerStage;
}

function subscribeDataLoader() {
    fGroups.doc(getGroupId()).collection("users").doc(store.username).onSnapshot(function (user) {
        if (user && user.exists) {
            console.log("User loaded: " + user.data().name);
            store.userAnswers = user.data().answers;
        }
    });
    fGroups.doc(getGroupId()).onSnapshot(function (group) {
        if ((!store.simulationStarted && group.data().simulationStarted) || (store.investitionStage !== group.data().investitionStage)) {
            store.investitionStage = group.data().investitionStage;
            store.simulationStarted = group.data().simulationStarted;
            fGroups.doc(getGroupId()).collection("users").get().then(function (users) {
                store.innoSelectionsCountPerStage = getInnoSelectionsCountPerStage(users);
                store.calculation.calculate(store.investitionStage, store.userAnswers, store.innoSelectionsCountPerStage);
                showSimulationView();
            });
        }
    });
    fGroups.doc(getGroupId()).collection("users").onSnapshot(function (users) {
        if (users && users.docs) {
            if (store.countUsersInGroup !== users.size) {
                store.usernamesInGroup = users.docs.map(user => user.data().name);
                store.countUsersInGroup = users.size;
                showGroupmembercount();
                showSimulationView();
            }
            if (store.simulationStarted) {
                let newAnswerCountPerStage = getAnswerCountPerStage(users);
                let answerCountChanged = newAnswerCountPerStage !== store.answerCountPerStage;
                store.answerCountPerStage = newAnswerCountPerStage;
                if (getUserAnswer() && answerCountChanged) {
                    showSimulationView();
                }
            }
        }
    });
}