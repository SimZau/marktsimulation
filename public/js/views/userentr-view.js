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
    for (let username: store.usernamesInGroup) {
        userentries += createUserentry(username);
    }
    return userentries;
}

function userOverview() {
    return `<div id="userOverview" style="display: none" class="section">
        <div class="row">
            <div class="col s12">Gruppenmitglieder:</div>
        </div>
`
        +
        createUserentries()
        +
        `<div class="row">
            <div class="col s12 m2">Alle da?</div>
            <a class="col s12 m10 waves-effect waves-light btn"><i class="material-icons right">send</i>Starten</a>
        </div>
    </div>`;
}