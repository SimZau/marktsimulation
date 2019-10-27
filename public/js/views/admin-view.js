function adminLoginView() {
    return `
    <form class="section" action="javascript:void(0);" onsubmit="login(this)">
        <div class="row">
            <a class="col s12 valign-wrapper teal-text" onclick="closeAdminLogin()" href="javascript:void(0);">
                <i class="small material-icons">keyboard_arrow_left</i>
                zurück
            </a>
        </div>
        <div class="row form-element">
            <div class="col s12 m3 l2">
                <label for="benutzerInput">Benutzername</label>
            </div>
            <div class="col s12 m9 l10">
                <input type="text" id="benutzerInput" name="benutzer" required/>
            </div>
        </div>
        <div class="row form-element">
            <div class="col s12 m3 l2">
                <label for="pInput">Passwort</label>
            </div>
            <div class="col s12 m9 l10">
                <input type="password" id="pInput" name="pIn" required/>
            </div>
        </div>
        <div class="row">
            <div class="col s12">
                <button class="btn waves-effect waves-light" type="submit" name="action">Anmelden
                    <i class="material-icons right">send</i>
                </button>
            </div>
        </div>
    </form>`;
}

function adminViewUserStages(user) {
    let html = "";
    for (let i = 0; i < 6; i++) {
        let userAnswer = "";
        if (user.answers.length > i) {
            if (i === 0) {
                userAnswer = getStrategienamenForInvestition(user.answers[i]);
            } else {
                userAnswer = user.answers[i];
            }
        }
        html += `<td>` + userAnswer + `</td>
`;
    }
    return html;
}

function adminViewUsers(users) {
    let html = "";
    users.forEach((user) => {
        html += `<tr>
                    <td>` + user.data().name + `</td>
                    ` + adminViewUserStages(user.data()) + `
                </tr>
    `;
    });
    return html;
}

function adminViewGroup(users) {
    return `<div class="row">
    <div class="col s1"></div>
    <div class="col s11">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Stage 1</th>
                    <th>Stage 2</th>
                    <th>Stage 3</th>
                    <th>Stage 4</th>
                    <th>Stage 5</th>
                    <th>Stage 6</th>
                </tr>
            </thead>

            <tbody>
                ` + adminViewUsers(users) + `
            </tbody>
        </table>
    </div>
</div>
`;
}

function adminViewGroups(groups) {
    let html = "";
    groups.forEach((group) => {
        html += `<a class="row" onclick="showAdminGroup('` + group.id + `')" href="javascript:void(0);">
    <div class="col s2 m2 l1">
        <i class="medium material-icons">` + (store.adminGroupsSelected.indexOf(group.id) > -1 ? "expand_more" : "chevron_right") + `</i>
    </div>
    <div class="col s4 m3 l2">
        <h5>Gruppe ` + group.data().usergroup + `</h5>
    </div>
    <div class="col s4 m3 l2">
         <h5>Stage ` + group.data().investitionStage + `</h5>
    </div>
</a>
<div id="adminGroup` + group.id + `Content"></div>
`;
    });
    return html;
}

function klassenOptions(classes) {
    let html = "";
    for (let clazz of classes) {
        html += `<option value="` + clazz + `" onclick="selectClass('` + clazz + `')" ` + (store.adminClassSelected === clazz ? "selected" : "") + `>` + clazz + `</option>\n`;
    }
    if (store.adminClassSelected) {
        showAdminGroups(store.adminClassSelected);
    }
    return html;
}

function adminViewClasses(classes) {
    return `<div class="row">
    <div class="input-field col s12">
        <select>
            <option value="" disabled ` + (!store.adminClassSelected ? "selected" : "") + `>Wähle eine Klasse</option>
            ` + klassenOptions(classes) + `
        </select>
    </div>
</div>
<div id="adminGroups">
</div>`;
}