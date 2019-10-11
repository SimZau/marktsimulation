const store = {
    username: localStorage.getItem('username'),
    userclass: localStorage.getItem('userclass'),
    usergroup: localStorage.getItem('usergroup'),
    countUsersInGroup: 0,
    userAnswers: [],
    investitionStage: 0,
    simulationStarted: 0,
    chosenAnswer
};