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
const db = firebase.firestore();

const fGroups = db.collection("groups");

function save(doc, object, success, error = (e) => console.log("Error: ", e)) {
    doc.get().then(function (loadedDoc) {
        loadedDoc.exists ? doc.update(object) : doc.save(object);
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