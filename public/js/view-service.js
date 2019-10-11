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

const main = document.querySelector("#main");

function showUserForm() {
    main.innerHTML = userformView;
}

function setUserDataOnView() {
    main.innerHTML = "test";
    userForm.style.display = "none";
    navbarUsername.innerHTML = store.username;
    navbarUser.style.display = "block";
    footerGroup.style.display = "block";
    footerGroupname.innerHTML = store.userclass + ", Gruppe " + store.usergroup;
}

function showSimulationView() {
    if (store.simulationStarted) {
        simulationDiv.style.display = "block";
    } else {
        showUserOverview();
    }
}

function showUserOverview() {
    userOverview.style.display = "block";
    userOverview.childNodes[0].appendChild(createUserFragment());
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