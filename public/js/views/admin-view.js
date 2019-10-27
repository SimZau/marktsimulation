function adminLoginView() {
    return `<form class="section" action="javascript:void(0);" onsubmit="login(this)">
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

function adminGroups(groups) {
    let html = "";
    groups.forEach((group) => {
        html += `<li>\n`;
        html += `    <div class="collapsible-header"><i class="material-icons">place</i>Gruppe ` + group.data().usergroup + `</div>
    <div className="collapsible-body">`;
        for (let user of group.collection) {
            html += `<span>` + user.data().name + `</span>`
        }
        html += `    </div>
</li>\n`;
    });
    return html;
}

function adminViewGroups(groups) {
    return `<ul className="collapsible">
        ` + adminGroups(groups) + `
    </ul>`;
}

function klassenOptions(classes) {
    let html = "";
    for (let clazz of classes) {
        html += `<option value="` + clazz + `" onclick="showAdminGroups('` + clazz + `')" ` + (store.adminClassSelected === clazz ? "selected" : "") + `>` + clazz + `</option>\n`;
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