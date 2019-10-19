"use strict";
const store = {
    username: localStorage.getItem('username'),
    userclass: localStorage.getItem('userclass'),
    usergroup: localStorage.getItem('usergroup'),
    countUsersInGroup: 0,
    usernamesInGroup: [],
    userAnswers: [],
    investitionStage: 0,
    simulationStarted: 0,
    chosenAnswer: undefined,
    calculation: new Calculation()
};

function getGroupId() {
    return store.userclass + "_" + store.usergroup;
}