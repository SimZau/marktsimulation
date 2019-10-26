"use strict";
const store = {
    username: localStorage.getItem('username'),
    userclass: localStorage.getItem('userclass'),
    usergroup: localStorage.getItem('usergroup'),
    countUsersInGroup: 0,
    usernamesInGroup: [],
    answerCountPerStage: [],
    userAnswers: [],
    innoSelectionsCountPerStage: [],
    investitionStage: 0,
    simulationStarted: 0,
    chosenAnswer: undefined,
    calculation: new Calculation()
};

function getGroupId() {
    return store.userclass + "_" + store.usergroup;
}

function getStrategienamenForInvestition(investition) {
    return investition === PRODUKTION_ID ? "Strategie A" : "Strategie B";
}

function getUserAnswer() {
    if (store.investitionStage) {
        return store.userAnswers[store.investitionStage];
    }
    return getStrategienamenForInvestition(store.userAnswers[store.investitionStage]);
}

function getCountFehlendeAntworten() {
    return store.countUsersInGroup - store.answerCountPerStage[store.investitionStage];
}