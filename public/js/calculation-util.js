const PRODUKTION_FACTOR = 0.2;
const INNOVATION_FACTOR = 0.1;
const MARGE_DIVISOR = 5;
const STAGE_BOOST = [
    {innovation: 1, production: 1},
    {innovation: 1, production: 1.1},
    {innovation: 1, production: 0.9},
    {innovation: 1.1, production: 1},
    {innovation: 0.9, production: 1}
];

const START_UMSATZ = 100000;
const START_MARGE = 0.2;
const START_PRODUKT_PREIS = 100;

let Calculation = (function () {
    function Calculation() {
        this.umsatz = START_UMSATZ;
        this.marge = START_MARGE;
        this.produktPreis = START_PRODUKT_PREIS;
    }

    Calculation.prototype.getUmsatz = function () {
        return mapBetragToString(this.umsatz);
    };

    Calculation.prototype.getGewinn = function () {
        return mapBetragToString(this.umsatz * this.marge);
    };

    Calculation.prototype.getVerkProdukte = function () {
        let verkProdukte = (Math.round(this.umsatz / this.produktPreis));
        return verkProdukte.toLocaleString('de-CH');
    };

    Calculation.prototype.calculate = function (stage) {
        this.umsatz *= calculateUmsatzSteigerung(stage); //todo thats where I was
    };

    function mapBetragToString(betrag) {
        return betrag.toLocaleString('de-CH', {minimumFractionDigits: 2});
    }

    function calculateUmsatzSteigerung(index) {
        if (userSelections[index] === PRODUKTION_ID) {
            return STAGE_BOOST[index].production * PRODUKTION_FACTOR;
        } else {
            return STAGE_BOOST[index].innovation * INNOVATION_FACTOR;
        }
    }

    function calculateUmsatzOfStage(userSelections, stage) {
        let umsatz = START_UMSATZ;
        for (i = 0; i < stage; i++) {
            umsatz *= (1 + calculateUmsatzSteigerung(i));
        }
        return umsatz;
    }

    function calculateMargeSteigerung(innoCount) {
        return INNOVATION_FACTOR * innoCount / MARGE_DIVISOR;
    }

    function calculateMargeOfStage(userSelections, stage, innoSelectionsCountPerStage) {
        let marge = START_MARGE;
        for (i = 0; i < stage; i++) {
            marge += calculateMargeSteigerung(innoSelectionsCountPerStage[i]);
        }
        return marge;
    }
}());