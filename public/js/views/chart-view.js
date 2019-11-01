function gewinnChart(id = "") {
    return `<div class="row">
        <div id="gewinnChart` + id + `" style="width: 100%; height: 400px"></div>
    </div>
    `;
}

function createGewinnChart(stage) {
    fGroups.doc(getGroupId()).collection("users").get().then(function (users) {
        createGewinnChartOfUsers(users, stage);
    });
}

function createGewinnChartOfUsers(users, stage, id = "") {
    if (users) {
        const chart = new JSC.Chart("gewinnChart" + id, {
            defaultSeries: {type: 'line', defaultPoint_marker_visible: false},
            defaultCultureName: LOCALE,
            title_label_text: 'Gewinn Vergleich',
            legend: {
                position: 'bottom',
                template: '%icon,%name'
            },
            xAxis_label_text: 'Jahre',
            yAxis: {
                alternateGridFill: 'none',
                label_text: 'Gewinn',
                formatString: 'c',
            },
            series: createGewinnChartData(users, stage)
        });
    }
}

function createGewinnChartData(users, stage) {
    let series = [];
    let innoCount = getInnoSelectionsCountPerStage(users, stage);
    users.forEach((user) => {
        series.push(createGewinnChartLine(user, innoCount, stage));
    });
    return series;
}

function createGewinnChartLine(user, innoCount, stage) {
    let points = [];
    let calculation = new Calculation();
    for (let i = 0; i <= stage; i++) {
        calculation.calculate(i, user.data().answers, innoCount);
        points.push({
            x: i + 1,
            y: calculation.getGewinnAsNumber(),
            attributes: {
                invest: (i < 6 ? getUserAnswerOfStage(user.data().answers, i): "")
            },
            tooltip: "<b>%yAxisLabel:</b> %yValue<br><b>Investition:</b> %invest",
        });
    }
    return {name: user.data().name, points: points};
}