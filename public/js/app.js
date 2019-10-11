

const navbarUsername = document.querySelector("#navbarUsername");
const navbarUser = document.querySelector("#navbarUser");
const footerGroup = document.querySelector("#footerGroup");
const footerGroupname = document.querySelector("#footerGroupname");
const footerGroupmembercount = document.querySelector("#footerGroupmembercount");
const userForm = document.querySelector("#userForm");
const simulationDiv = document.querySelector("#simulation");
const selectAnswerButton = document.querySelector("#selectAnswerButton");
const selectAnswerText = document.querySelector("#selectAnswerText");
const produktionCard = document.querySelector("#produktionCard");
const innovationCard = document.querySelector("#innovationCard");
const userOverview = document.querySelector("#userOverview");

const PRODUKTION_ID = "Produktion";
const INNOVATION_ID = "Innovation";
const selectedColor = "#fff3e0";
const unselectedColor = "#ffffff";

//todo remove
localStorage.removeItem('username');

let username = localStorage.getItem('username');
let userclass = localStorage.getItem('userclass');
let usergroup = localStorage.getItem('usergroup');
let countUsersInGroup = 0;
let userAnswers = [];
let investitionStage = 0;
let simulationStarted = 0;

let chosenAnswer;

init();

function init() {
    if (!username) {
        userForm.style.display = "block";
    } else {
        setData();
        subscribeDataLoader();
        if (simulationStarted) {
            simulationDiv.style.display = "block";
        } else {
            showUserOverview();
        }
    }
}

function createUserFragment() {
    return undefined;
}

function showUserOverview() {
    userOverview.style.display = "block";
    userOverview.childNodes[0].appendChild(createUserFragment());
}

function setData() {
    userForm.style.display = "none";
    navbarUsername.innerHTML = username;
    navbarUser.style.display = "block";
    footerGroup.style.display = "block";
    footerGroupname.innerHTML = userclass + ", Gruppe " + usergroup;
}

function startSimulation() {
    groups.doc(getGroupId()).update({
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
    username = form.name.value;
    userclass = form.class.value;
    usergroup = form.group.value;
    localStorage.setItem('username', username);
    localStorage.setItem('userclass', userclass);
    localStorage.setItem('usergroup', usergroup);
    setData();
}

function saveData(form) {
    initGroup(userclass, usergroup);
    saveUser(
        username,
        form.age.value,
        readRadio(form, "gender"),
        readRadio(form, "region")
    );
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

function getGroupId() {
    return userclass + "_" + usergroup;
}

function subscribeDataLoader() {
    groups.doc(getGroupId()).collection("users").doc(username).onSnapshot(function (user) {
        if (user && user.exists) {
            console.log("User loaded: " + user.data().name);
            userAnswers = user.data().answers;
        }
    });
    groups.doc(getGroupId()).collection("users").onSnapshot(function (users) {
        if (!simulationStarted && countUsersInGroup !== users.size) {
            showUserOverview();
        }
        countUsersInGroup = users.size;
        footerGroupmembercount.innerHTML = "Gruppenmitglieder: " + countUsersInGroup;
    });
    groups.doc(getGroupId()).onSnapshot(function (group) {
        investitionStage = group.data().investitionStage;
        if (!simulationStarted && group.data().simulationStarted) {
            userOverview.style.display = "none";
            simulationDiv.style.display = "block";
        }
        simulationStarted = group.data().simulationStarted;
        console.log("Group loaded: Stage " + investitionStage);
    });
}

function setColor(investitionCard, color) {
    investitionCard.style.backgroundColor = color;
}

function chooseInvestition(investition) {
    chosenAnswer = investition;
    selectAnswerText.innerHTML = investition;
    selectAnswerButton.style.display = "block";
    if (PRODUKTION_ID === investition) {
        setColor(produktionCard, selectedColor);
        setColor(innovationCard, unselectedColor);
    } else {
        setColor(produktionCard, unselectedColor);
        setColor(innovationCard, selectedColor);
    }
}

function lockChosenAnswer() {
    userAnswers[investitionStage] = chosenAnswer;
    groups.doc(username).update({
        answers: userAnswers,
        investitionStage: (investitionStage + 1)
    }).then(function () {
        console.log(username + ": Saved Answer: " + chosenAnswer);
    }).catch(function (error) {
        console.log("Error: ", error);
    });
}