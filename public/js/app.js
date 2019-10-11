const PRODUKTION_ID = "Produktion";
const INNOVATION_ID = "Innovation";
const selectedColor = "#fff3e0";
const unselectedColor = "#ffffff";

//todo remove
localStorage.removeItem('username');

init();

function init() {
    if (!store.username) {
        showUserForm();
    } else {
        subscribeDataLoader();
        setUserDataOnView();
        showSimulationView();
    }
}

function startSimulation() {
    fGroups.doc(getGroupId()).update({
        simulationStarted: 0
    }).then(function () {
        console.log("Saved group!");
    }).catch(function (error) {
        console.log("Error: ", error);
    });
    userOverview.style.display = "none";
    simulationDiv.style.display = "block";
}

function setUpUiUserdata(form) {
    store.username = form.name.value;
    store.userclass = form.class.value;
    store.usergroup = form.group.value;
    localStorage.setItem('username', store.username);
    localStorage.setItem('userclass', store.userclass);
    localStorage.setItem('usergroup', store.usergroup);
    setUserDataOnView();
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

function save(form) {
    console.log("User to save: " + store.username);
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

function lockChosenAnswer() {
    store.userAnswers[store.investitionStage] = store.chosenAnswer;
    groups.doc(store.username).update({
        answers: store.userAnswers,
        investitionStage: (store.investitionStage + 1)
    }).then(function () {
        console.log(store.username + ": Saved Answer: " + store.chosenAnswer);
    }).catch(function (error) {
        console.log("Error: ", error);
    });
}