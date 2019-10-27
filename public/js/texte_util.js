"use strict";

const ACTION_TEXTE_OF_STAGE = {
    STRATEGIE: {
        TITLE_A: "Strategie A",
        TITLE_B: "Strategie B",
        TEXT_A: "Du entscheidest dich, hochqualitative Produkte herzustellen. Mit hohen Einkaufskosten wird auch der Preis deiner Produkte sehr hoch sein, was sich natürlich positiv auf die Gewinn auswirkt.",
        TEXT_B: "Du entscheidest dich, in die Massenproduktion einzusteigen. Deine Produkte werden günstig und daher auch sehr nachgefragt sein. Hohe Verkaufszahlen sind das Resultat."
    },
    PROD_INNO: {
        TITLE_A: "Produktion",
        TITLE_B: "Innovation",
        TEXT_A: "Du investierst in die Produktion. Dein Geld fliesst also in den Kauf von neuen Maschinen welche es möglich machen, in grösseren Mengen zu produzieren. Deshalb erhöht sich deine Anzahl an verkauften Produkten.",
        TEXT_B: "Du investierst in Innovation. Dein Geld fliesst in Forschungsprojekte, in denen Wissenschaftler neue Technologien entwickeln, um deine Produkte billiger zu Produzieren. Resultierend erhöht sich die Marge an deinem Umsatz. Aber Achtung! Die neu entwickelten Technologien werden nicht nur dir, sondern auch deiner Konkurrenz zur Verfügung stehen. (Investieren mehr als ein Spieler in Innovation, so summieren sich die Erhöhungen der Marge)."
    }
};

const TEXTE_OF_STAGE = [
    "Hallo! <br> Herzlichen Dank, dass Du dir die Zeit nimmst, in diesem Experiment mitzumachen. Lies bitte alle Beschriebe und Situationsschilderungen genau durch. Ich wünsche viel Spass mit der Simulation!<br>" +
    "<br>" +
    "In dieser Simulation werden du und deine Kollegen in einem abgeschlossenen Markt eigene Unternehmungen gründen und diese über eine Zeitspanne von 6 Jahren führen. Du wirst Entscheidungen treffen müssen, welche unterschiedliche Aspekte deines Erfolges beeinflussen werden. Als erstes kannst du dich zwischen zwei unterschiedlichen Strategien entscheiden."
    ,
    "Gratuliere, du hast dein erstes Jahr erfolgreich überstanden. Nun hast du die Möglichkeit, deinen Erfolg in zwei Formen zu investieren. Wie entscheidest du dich?"
    ,
    "Der Markt blüht. Die Nachfrage nach deinen Produkten steigt und steigt. Wie wirst du dein Geld dieses Jahr investieren?"
    ,
    "Schlechte Neuigkeiten. In einem anderen Markt ist ein Subtitutionsprodukt aufgetaucht. Das bewirkt, dass die Nachfrage nach deinen Produkten zurückgeht. Wie entscheidest du dich dieses Jahr?"
    ,
    "Der Staat hat sich entschieden, sämtliche Forschungsprojekte mit zusätzlichem Geld zu unterstützen. Resultate aus Investitionen in Innovation sind dieses Jahr leicht erfolgreicher als in den Vorjahren. Wie entscheidest du dich nun?"
    ,
    "Auf Grund des Klimawandels haben sich die besten Wissenschaftler des Landes um dessen Bekämpfung zusammengeschlossen. Für eigene Forschungsprojekte verbleiben nur noch zweitrangige Forschungsteams. Wie investierst du dieses Jahr?"
    ,
    "Gratulation, du hast die Simulation erfolgreich abgeschlossen.<br> Vielen Dank!"
];

function getActionTexteOfStage() {
    if (store.investitionStage > 0) {
        return ACTION_TEXTE_OF_STAGE.PROD_INNO;
    } else {
        return ACTION_TEXTE_OF_STAGE.STRATEGIE;
    }
}

function getActionTitleA() {
    return getActionTexteOfStage().TITLE_A
}

function getActionTitleB() {
    return getActionTexteOfStage().TITLE_B
}

function getActionTextA() {
    return getActionTexteOfStage().TEXT_A
}

function getActionTextB() {
    return getActionTexteOfStage().TEXT_B
}

function getWeiterText() {
    return store.investitionStage >= 5 ? "Simulation Beenden" : "Weiter";
}

function getText() {
    return TEXTE_OF_STAGE[store.investitionStage];
}

function getInvestitionsart() {
    return store.investitionStage ? "Investition" : "Strategie";
}