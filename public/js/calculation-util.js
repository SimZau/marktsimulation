"use strict";
const LOCALE = 'de-CH';
const ROUND_ON_PRODUKTE = 100;
const ROUND_ON_BETRAG = 1000;

const PRODUKTION_FACTOR = 0.2;
const INNOVATION_FACTOR = 0.1;
const PRODUKT_PREIS_FACTOR = 0.25;
const MARGE_DIVISOR = 5;
const STAGE_BOOST = [
    {innovation: 0, production: 0},
    {innovation: 1, production: 1},
    {innovation: 1, production: 1.1},
    {innovation: 1, production: 0.9},
    {innovation: 1.1, production: 1},
    {innovation: 0.9, production: 1}
];

const START_UMSATZ = 100000;
const START_MARGE = 0.2;
const START_PRODUKT_PREIS = 100;

function Calculation() {
    this.umsatz = START_UMSATZ;
    this.gesamtUmsatz = START_UMSATZ;
    this.marge = START_MARGE;
    this.produktPreis = START_PRODUKT_PREIS;
    this.marktanteil = 0;
}

Calculation.prototype.getUmsatz = function () {
    const umsatz = roundBetrag(this.umsatz);
    return umsatz.toLocaleString(LOCALE);
};


Calculation.prototype.getGesamtUmsatz = function () {
    const umsatz = roundBetrag(this.gesamtUmsatz);
    return umsatz.toLocaleString(LOCALE);
};

Calculation.prototype.getGewinn = function () {
    const gewinn = roundBetrag(this.umsatz * this.marge);
    return gewinn.toLocaleString(LOCALE);
};

Calculation.prototype.getGesamtGewinn = function () {
    const gewinn = roundBetrag(this.gesamtUmsatz * this.marge);
    return gewinn.toLocaleString(LOCALE);
};

Calculation.prototype.getVerkProdukte = function () {
    let verkProdukte = roundProdukte(this.umsatz / this.produktPreis);
    return verkProdukte.toLocaleString(LOCALE);
};

Calculation.prototype.getGesamtVerkProdukte = function () {
    let verkProdukte = roundProdukte(this.gesamtUmsatz / this.produktPreis);
    return verkProdukte.toLocaleString(LOCALE);
};

Calculation.prototype.getMarge = function () {
    let marge = Math.round(this.marge * 100);
    return marge.toLocaleString(LOCALE);
};

Calculation.prototype.calculate = function (stage, userSelections, innoSelectionsCountPerStage) {
    let umsatz = START_UMSATZ;
    this.gesamtUmsatz = START_UMSATZ;
    for (let i = 0; i < stage; i++) {
        umsatz *= (1 + calculateUmsatzSteigerung(i, userSelections));
        this.gesamtUmsatz += umsatz;
    }
    this.umsatz = umsatz;
    console.log("Umsatz: " + this.getUmsatz());
    this.marge = calculateMargeOfStage(stage, innoSelectionsCountPerStage);
    console.log("Marge: " + this.marge);
    this.produktPreis = calculateProduktPreisOfStage(stage, userSelections);
    console.log("Produkt Preis: " + this.produktPreis);
    console.log("Gewinn: " + this.getGewinn());
    console.log("verkaufte Produkte: " + this.getVerkProdukte());
};

function calculateUmsatzSteigerung(index, userSelections) {
    if (userSelections[index] === PRODUKTION_ID) {
        return STAGE_BOOST[index].production * PRODUKTION_FACTOR;
    } else {
        return STAGE_BOOST[index].innovation * INNOVATION_FACTOR;
    }
}

function calculateMargeSteigerung(innoCount) {
    return INNOVATION_FACTOR * innoCount / MARGE_DIVISOR;
}

function calculateMargeOfStage(stage, innoSelectionsCountPerStage) {
    let marge = START_MARGE;
    for (let i = 1; i < stage; i++) {
        marge += calculateMargeSteigerung(innoSelectionsCountPerStage[i]);
    }
    return marge;
}

function calculateProduktPreisOfStage(stage, userSelections) {
    let produktPreis = START_PRODUKT_PREIS;
    if (stage > 0) {
        if (userSelections[0] === PRODUKTION_ID) {
            produktPreis *= (1 + PRODUKT_PREIS_FACTOR);
        } else {
            produktPreis /= (1 + PRODUKT_PREIS_FACTOR);
        }
    }
    return produktPreis;
}

function roundBetrag(betrag) {
    return Math.round(betrag / ROUND_ON_BETRAG) * ROUND_ON_BETRAG;
}

function roundProdukte(produkte) {
    return Math.round(produkte / ROUND_ON_PRODUKTE) * ROUND_ON_PRODUKTE;
}

function calculateMarktanteil(users) {
    let totalUmsatz = users.docs.map((user) => {
        let calculation = new Calculation();
        calculation.calculate(store.investitionStage, user.data().answers, store.innoSelectionsCountPerStage);
        return calculation.umsatz;
    }).reduce((acc, cur) => {
        return acc + cur;
    });
    if (totalUmsatz) {
        return Math.round(100 / totalUmsatz * store.calculation.umsatz);
    } else {
        return 0;
    }
}