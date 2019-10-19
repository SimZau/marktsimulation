"use strict";

function simulationOverview() {
    return `<!-- Overview -->
    <div className="section overview">
        <div className="row">
            <div className="col s12 l4">
                <div className="row overview-element z-depth-1">
                    <div className="col s2">
                        <i className="pink-text text-darken-2 medium material-icons icon-size">attach_money</i>
                    </div>
                    <div className="col s10">
                        <div className="row">
                            <div className="col s12">
                                <label>Umsatz</label>
                            </div>
                            <div className="col s12">
                                <span id="gainSpan">` + store.calculation.umsatz + `</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="col s12 l4">
                <div className="row overview-element z-depth-1">
                    <div className="col s2">
                        <i className="green-text text-darken-2 medium material-icons icon-size">trending_up</i>
                    </div>
                    <div className="col s10">
                        <div className="row">
                            <div className="col s12">
                                <label>Gewinn</label>
                            </div>
                            <div className="col s12">
                                <span id="profitSpan">` + store.calculation.gewinn + `</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col s12 l4">
                <div className="row overview-element z-depth-1">
                    <div className="col s2">
                        <i className="indigo-text medium material-icons icon-size">shopping_cart</i>
                    </div>
                    <div className="col s10">
                        <div className="row">
                            <div className="col s12">
                                <label>verk. Produkte</label>
                            </div>
                            <div className="col s12">
                                <span id="soldProductsSpan">` + store.calculation.verkProdukte + `</span>
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
    return `<div className="divider"></div>
`;
}

function simulationActions() {
    return `<!-- Actions -->
    <div className="section">
        <div className="row">
            <div className="col s12">
                <h4>Wähle deine Investition:</h4>
            </div>
        </div>
        <div className="row">
            <div className="col s12 m6">
                <a onClick="chooseInvestition(PRODUKTION_ID)" href="#">
                    <div id="produktionCard" className="card">
                        <div className="card-content">
                            <h4 className="center deep-orange-text"><i className="material-icons icon-size">settings</i>
                            </h4>
                            <span className="card-title center">Produktion</span>

                            <p className="light">` + store.actionTextProduktion + `</p>
                        </div>
                    </div>
                </a>
            </div>

            <div className="col s12 m6">
                <a onClick="chooseInvestition(INNOVATION_ID)" href="#">
                    <div id="innovationCard" className="card">
                        <div className="card-content">
                            <h4 className="center amber-text"><i className="material-icons icon-size">lightbulb_outline</i>
                            </h4>
                            <span className="card-title center">Innovation</span>

                            <p className="light">` + store.actionTextInnovation + `</p>
                        </div>
                    </div>
                </a>
            </div>
            <div id="selectAnswerButton" className="col s12" style="display: none">
                <a className="waves-effect waves-light btn right" onClick="lockChosenAnswer()">
                    <i className="material-icons right">send</i>
                    <span id="selectAnswerText">Nichts</span> wählen
                </a>
            </div>
        </div>
    </div>
`;
}