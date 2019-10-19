"use strict";

function year() {
    return `<div class="row">
            <div class="col s12 center-align">
                <h2>Jahr ` + (store.investitionStage + 1) + `</h2>
            </div>
        </div>`
}

function simulationOverview() {
    return `<!-- Overview -->
    <div class="section overview">
        <div class="row">
            <div class="col s12 l4">
                <div class="row overview-element z-depth-1">
                    <div class="col s2">
                        <i class="pink-text text-darken-2 medium material-icons icon-size">attach_money</i>
                    </div>
                    <div class="col s10">
                        <div class="row">
                            <div class="col s12">
                                <label>Umsatz</label>
                            </div>
                            <div class="col s12">
                                <span>` + store.calculation.getUmsatz() + ` CHF</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="col s12 l4">
                <div class="row overview-element z-depth-1">
                    <div class="col s2">
                        <i class="green-text text-darken-2 medium material-icons icon-size">trending_up</i>
                    </div>
                    <div class="col s10">
                        <div class="row">
                            <div class="col s12">
                                <label>Gewinn</label>
                            </div>
                            <div class="col s12">
                                <span>` + store.calculation.getGewinn() + ` CHF</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col s12 l4">
                <div class="row overview-element z-depth-1">
                    <div class="col s2">
                        <i class="indigo-text medium material-icons icon-size">shopping_cart</i>
                    </div>
                    <div class="col s10">
                        <div class="row">
                            <div class="col s12">
                                <label>verk. Produkte</label>
                            </div>
                            <div class="col s12">
                                <span>` + store.calculation.getVerkProdukte() + ` Stk</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
}

function divider() {
    return `<div class="divider"></div>
`;
}

function simulationActions() {
    return `<!-- Actions -->
    <div id="actionsSection" class="section">
        <div class="row">
            <div class="col s12">
                <h4>Wähle deine Investition:</h4>
            </div>
        </div>
        <div class="row">
            <div class="col s12 m6">
                <a onClick="chooseInvestition(PRODUKTION_ID)" href="javascript:void(0);">
                    <div id="produktionCard" class="card">
                        <div class="card-content">
                            <h4 class="center deep-orange-text"><i class="material-icons icon-size">settings</i>
                            </h4>
                            <span class="card-title center">Produktion</span>

                            <p class="light">` + "store.actionTextProduktion" + `</p>
                        </div>
                    </div>
                </a>
            </div>

            <div class="col s12 m6">
                <a onClick="chooseInvestition(INNOVATION_ID)" href="javascript:void(0);">
                    <div id="innovationCard" class="card">
                        <div class="card-content">
                            <h4 class="center amber-text"><i class="material-icons icon-size">lightbulb_outline</i>
                            </h4>
                            <span class="card-title center">Innovation</span>

                            <p class="light">` + "store.actionTextInnovation" + `</p>
                        </div>
                    </div>
                </a>
            </div>
            <div id="selectAnswerButton" class="col s12" style="display: none">
                <a class="waves-effect waves-light btn right" onClick="lockChosenAnswer()">
                    <i class="material-icons right">send</i>
                    <span id="selectAnswerText">Nichts</span> wählen
                </a>
            </div>
        </div>
    </div>
`;
}