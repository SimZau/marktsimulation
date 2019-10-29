"use strict";
const navbarUsername = document.querySelector("#navbarUsername");
const navbarUser = document.querySelector("#navbarUser");
const footerGroup = document.querySelector("#footerGroup");
const footerGroupname = document.querySelector("#footerGroupname");
const footerGroupmembercount = document.querySelector("#footerGroupmembercount");
let selectAnswerButton;
let selectAnswerText;
let produktionCard;
let innovationCard;

const main = document.querySelector("#main");

function showUserForm() {
    main.innerHTML = userformView();
}

function setUserDataOnView() {
    showSimulationView();
    navbarUsername.innerHTML = store.username;
    navbarUser.style.display = "block";
    footerGroup.style.display = "block";
    footerGroupname.innerHTML = store.userclass + ", Gruppe " + store.usergroup;
}

function showGroupmembercount() {
    footerGroupmembercount.innerHTML = "Gruppenmitglieder: " + store.countUsersInGroup;
}

function initActionSelectors() {
    selectAnswerButton = document.querySelector("#selectAnswerButton");
    selectAnswerText = document.querySelector("#selectAnswerText");
    produktionCard = document.querySelector("#produktionCard");
    innovationCard = document.querySelector("#innovationCard");
}

function showSimulationView() {
    if (store.simulationStarted) {
        let html = year();
        if (store.investitionStage >= 6) {
            html += underTitel();
        }
        if (store.investitionStage > 0) {
            html += simulationOverview();
        }
        if (store.investitionStage < 6) {
            html += divider();
            html += infoText();
            if (getUserAnswer()) {
                html += answerGiven();
                if (getCountFehlendeAntworten() === 0) {
                    html += buttonNextStage();
                }
            } else {
                html += simulationActions();
            }
        } else {
            html += simulationOverviewMarktanteilUndChart();
        }
        main.innerHTML = html;
        initActionSelectors();
    } else {
        main.innerHTML = userOverview();
    }
    if (store.investitionStage >= 6) {
        createGewinnChart(store.investitionStage);
    }
}

function setColor(investitionCard, color) {
    investitionCard.style.backgroundColor = color;
}

function chooseInvestition(investition) {
    store.chosenAnswer = investition;
    selectAnswerText.innerHTML = store.investitionStage ? investition : getStrategienamenForInvestition(investition);
    selectAnswerButton.style.display = "block";
    if (PRODUKTION_ID === investition) {
        setColor(produktionCard, selectedColor);
        setColor(innovationCard, unselectedColor);
    } else {
        setColor(produktionCard, unselectedColor);
        setColor(innovationCard, selectedColor);
    }
}

function showAdminLogin() {
    store.adminLogin = 1;
    main.innerHTML = adminLoginView();
}

function closeAdminLogin() {
    store.adminLogin = 0;
    init();
}

function showLoginError() {
    M.toast({html: 'Der Benutzer mit diesem Passwort wurde nicht gefunden!', classes: 'deep-orange lighten-1'});
}

function showAdminPage() {
    fGroups.get().then(function (groups) {
        const classes = groups.docs
            .map((group) => group.data().userclass)
            .filter((element, index, array) => array.indexOf(element) === index && element);
        main.innerHTML = adminViewClasses(classes);
    })
}

function selectClass(clazz) {
    store.adminClassSelected = clazz;
    store.adminGroupsSelected = [];
    store.unsubscribeAdminGroupLoaders.forEach((unsubscribe) => unsubscribe());
    store.unsubscribeAdminGroupLoaders = [];
    fGroups.where("userclass", "==", store.adminClassSelected).get().then(function (groups) {
        groups.forEach((group) => {
            store.unsubscribeAdminGroupLoaders.push(
                fGroups.doc(group.id).collection("users").onSnapshot(function () {
                    showAdminGroups();
                })
            );
            store.unsubscribeAdminGroupLoaders.push(
                fGroups.doc(group.id).onSnapshot(function () {
                    showAdminGroups();
                })
            );
        });
    });
}

function showAdminGroups() {
    return fGroups.where("userclass", "==", store.adminClassSelected).get().then(function (groups) {
        const adminGroupsDiv = document.querySelector("#adminGroups");
        adminGroupsDiv.innerHTML = adminViewGroups(groups);
    }).then(function () {
        store.adminGroupsSelected.forEach((groupId) => {
            fGroups.doc(groupId).collection("users").get().then(function (users) {
                const adminGroupSelectedContent = document.querySelector("#adminGroup" + groupId + "Content");
                const stage = users.docs
                    .map((user) => user.data().answers.length)
                    .reduce((acc, cur) => cur < acc ? cur : acc);
                adminGroupSelectedContent.innerHTML = adminViewGroup(users, stage, groupId);
                createGewinnChartOfUsers(users, stage, groupId);
            });
        });
    });
}

function showAdminGroup(groupId) {
    const index = store.adminGroupsSelected.indexOf(groupId);
    if (index > -1) {
        store.adminGroupsSelected.splice(index, 1);
    } else {
        store.adminGroupsSelected.push(groupId);
    }
    showAdminGroups();
}