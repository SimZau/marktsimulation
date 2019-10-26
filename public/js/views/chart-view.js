function gewinnChart() {
    return `<div class="row">
        <canvas id="gewinnChart" height="400" width="400"></canvas>
    </div>
    `;
}

function createGewinnChart() {
    const chart = new JSC.Chart("chartDiv", {
        series: [{ points: [{ x: "A", y: 10 }, { x: "B", y: 5 }] }]
    });
}