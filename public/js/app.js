"use strict";
const PRODUKTION_ID = "Produktion";
const INNOVATION_ID = "Innovation";
const selectedColor = "#fff3e0";
const unselectedColor = "#ffffff";

//todo remove
// localStorage.removeItem('username');

init();

function init() {
    fGroups.doc(getGroupId()).collection("users").doc(store.username).get().then(function (user) {
        if (user && user.exists) {
            subscribeDataLoader();
            setUserDataOnView();
            showSimulationView();
        } else {
            showUserForm();
        }
    });
}

function startSimulation() {
    saveGroup({simulationStarted: 1});
}

function setUpUiUserdata(form) {
    store.username = form.name.value;
    store.userclass = form.class.value;
    store.usergroup = form.group.value;
    localStorage.setItem('username', store.username);
    localStorage.setItem('userclass', store.userclass);
    localStorage.setItem('usergroup', store.usergroup);
}

function saveData(form) {
    initGroup();
    initUser(
        store.username,
        form.age.value,
        readRadio(form, "gender"),
        readRadio(form, "region")
    );
}

function saveForm(form) {
    setUpUiUserdata(form);
    console.log("User to save: " + store.username);
    saveData(form);
    subscribeDataLoader();
    setUserDataOnView();
}

function readRadio(form, radioName) {
    let radio = form[radioName];
    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            return radio[i].value;
        }
    }
}

function lockChosenAnswer() {
    store.userAnswers[store.investitionStage] = store.chosenAnswer;
    saveUser({
        answers: store.userAnswers
    });
    showSimulationView();
}

function nextStage() {
    if (getCountFehlendeAntworten() === 0 && store.investitionStage !== 6) {
        saveGroup({
            investitionStage: store.investitionStage + 1,
        });
    }
}