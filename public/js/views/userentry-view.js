"use strict";
function createUserentry(username) {
    return `<div class="row">
            <div class="col s12">
                ` + username + `
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
            <div class="col s12">Gruppenmitglieder:</div>
        </div>
`
        +
        createUserentries()
        +
        `<div class="row">
            <div class="col s12">Alle da?</div>
            <div class="col s12">
                <a class="waves-effect waves-light btn" onclick="startSimulation()" href="javascript:void(0);">Starten<i class="material-icons right">send</i></a>
            </div>
        </div>
    </div>`;
}