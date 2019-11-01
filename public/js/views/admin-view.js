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

function adminViewUserStages(user, innoCount, totalUmsatz) {
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
    let calculation = new Calculation();
    calculation.calculate(user.answers.length, user.answers, innoCount);
    let marktanteil = calculateMarktanteilOfTotalUmsatz(calculation.umsatz, totalUmsatz);
    html += `<td>` + calculation.getGesamtUmsatz() + ` CHF</td>`;
    html += `<td>` + calculation.getGesamtGewinn() + ` CHF</td>`;
    html += `<td>` + marktanteil + `%</td>`;
    return html;
}

function calculateMarktanteilOfTotalUmsatz(umsatz, totalUmsatz) {
    if (totalUmsatz) {
        return Math.round(100 / totalUmsatz * umsatz);
    } else {
        return 0;
    }
}

function calculateTotalUmsatz(users, innoCount) {
    return users.docs.map((user) => {
        let calculation = new Calculation();
        calculation.calculate(user.data().answers.length, user.data().answers, innoCount);
        return calculation.umsatz;
    }).reduce((acc, cur) => {
        return acc + cur;
    });
}

function adminViewUsers(users, stage) {
    let html = "";
    let innoCount = getInnoSelectionsCountPerStage(users, stage);
    let totalUmsatz = calculateTotalUmsatz(users, innoCount);
    users.forEach((user) => {
        html += `<tr>
                    <td>` + user.data().name + `</td>
                    ` + adminViewUserStages(user.data(), innoCount, totalUmsatz) + `
                </tr>
    `;
    });
    return html;
}

function adminViewGroup(users, stage, id) {
    return `<div class="row">
    <div class="col s1"></div>
    <div class="col s11">
        <div class="row">
            <table class="col s12">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Stage 1</th>
                        <th>Stage 2</th>
                        <th>Stage 3</th>
                        <th>Stage 4</th>
                        <th>Stage 5</th>
                        <th>Stage 6</th>
                        <th>Gesamtumsatz</th>
                        <th>Gesamtgewinn</th>
                        <th>Marge</th>
                    </tr>
                </thead>
    
                <tbody>
                    ` + adminViewUsers(users, stage) + `
                </tbody>
            </table>
            <div class="col s12">
                ` + gewinnChart(id) + `
            </div>
        </div>
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
        html += `<option value="` + clazz + `" ` + (store.adminClassSelected === clazz ? "selected" : "") + `>` + clazz + `</option>\n`;
    }
    if (store.adminClassSelected) {
        showAdminGroups(store.adminClassSelected);
    }
    return html;
}

function adminViewClasses(classes) {
    return `<form id="adminSelectClass" class="section" action="javascript:void(0);" onsubmit="selectClass(this.classSelect.value)">
<div class="row">
    <div class="col s12 m10">
        <select id="classSelect" name="classSelect" required onchange="selectClass(this.options[this.selectedIndex].text);">
            <option value="" disabled ` + (!store.adminClassSelected ? "selected" : "") + `>Wähle eine Klasse</option>
            ` + klassenOptions(classes) + `
        </select>
    </div>
    <div class="col s12 m2">
        <button class="btn waves-effect waves-light" type="submit" name="action">Submit
            <i class="material-icons right">select</i>
        </button>
    </div>
</div>
</form>
<div id="adminGroups">
</div>`;
}