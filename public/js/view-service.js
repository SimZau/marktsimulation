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
let actionsSection;

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
    actionsSection = document.querySelector("#actionsSection");
}

function showSimulationView() {
    if (store.simulationStarted) {
        let html = year();
        html += simulationOverview();
        html += divider();
        html += simulationActions();
        main.innerHTML = html;
        initActionSelectors();
    } else {
        main.innerHTML = userOverview();
    }
}

function showAnswerGiven() {
    actionsSection.innerHTML = "";
}

function setColor(investitionCard, color) {
    investitionCard.style.backgroundColor = color;
}

function chooseInvestition(investition) {
    store.chosenAnswer = investition;
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