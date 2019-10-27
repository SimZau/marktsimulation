"use strict";
function createUserentry(username) {
    return `<div class="row">
            <div class="col s12">
                <span class="grey-text darken-2" style="font-size: 24px;">` + username + `</span>
            </div>
        </div>
`;
}

function createUserentries() {
    let userentries = '';
    for (let username of store.usernamesInGroup) {
        userentries += createUserentry(username);
    }
    return userentries;
}

function userOverview() {
    return `<div id="userOverview" class="section">
        <div class="row">
            <div class="col s12">
                <h5 class="teal-text">Gruppenmitglieder:</h5>
            </div>
        </div>
`
        +
        createUserentries()
        +
        `<div class="row">
            <div class="col s12" style="margin-bottom: 3px;">Alle da?</div>
            <div class="col s12">
                <a class="waves-effect waves-light btn" onclick="startSimulation()" href="javascript:void(0);">Starten<i class="material-icons right">send</i></a>
            </div>
        </div>
    </div>`;
}