"use strict";
function userformView() {
    return `<form id="userForm" class="section" action="javascript:" onsubmit="saveForm(this)">
        <div class="row form-element">
            <div class="col s12 m3 l2">
                <label for="nameInput">Name</label>
            </div>
            <div class="col s12 m9 l10">
                <input type="text" id="nameInput" name="name" required/>
            </div>
        </div>
        <div class="row form-element">
            <div class="col s12 m3 l2">
                <label for="ageInput">Alter</label>
            </div>
            <div class="col s12 m9 l10">
                <input type="number" id="ageInput" name="age" required/>
            </div>
        </div>
        <div class="row form-element">
            <div class="col s12 m3 l2">
                <label>Geschlecht</label>
            </div>
            <div class="col s6 m3 l2">
                <label>
                    <input id="femininInput" name="gender" value="feminin" type="radio" checked/>
                    <span>weiblich</span>
                </label>
            </div>
            <div class="col s6 m3 l2">
                <label>
                    <input id="masculinInput" name="gender" value="masculin" type="radio"/>
                    <span>männlich</span>
                </label>
            </div>
        </div>
        <div class="row form-element">
            <div class="col s12 m3 l2">
                <label>Wohnort</label>
            </div>
            <div class="col s6 m3 l2">
                <label>
                    <input id="urbanInput" name="region" value="urban" type="radio" checked/>
                    <span>urban</span>
                </label>
            </div>
            <div class="col s6 m3 l2">
                <label>
                    <input id="ruralInput" name="region" value="rural" type="radio"/>
                    <span>rural</span>
                </label>
            </div>
        </div>
        <div class="row form-element">
            <div class="col s12 m3 l2">
                <label for="classInput">Klasse</label>
            </div>
            <div class="col s12 m9 l10">
                <input type="text" id="classInput" name="class" required/>
            </div>
        </div>
        <div class="row form-element">
            <div class="col s12 m3 l2">
                <label for="groupInput">Gruppe</label>
            </div>
            <div class="input-field col s12 m9 l10">
                <select id="groupInput" name="group" required>
                    <option value="" disabled selected>Wähle deine Gruppe</option>
                    <option value="1">Gruppe 1</option>
                    <option value="2">Gruppe 2</option>
                    <option value="3">Gruppe 3</option>
                </select>
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