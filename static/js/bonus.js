// =============================================
// Gauge chart
function getGauge(id) {
    // Read "metadata" from json file for each subject and assign it to a variable
    d3.json('data/samples.json').then(data => {
        let subjectData = data.metadata.filter(subject => subject.id.toString() === id)[0];
        console.log(subjectData);

        // Extract data and assign it to a variable 
        let value = subjectData.wfreq;
        console.log(value);

        // Data
        data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                type: 'indicator',
                mode: 'gauge+number+delta',
                value: value,
                title: { text: 'Belly Button Washing Frequency <br><i>Scrubs per Week</i>', font: { size: 20 } },
                gauge: {
                    axis: { range: [null, 9], tickwidth: 1 },
                    bar: { color: 'red', thickness: 0.3 },
                    axes: [{
                        pointers: [{
                            value: 80,
                            type: 'Marker',
                            markerType: 'Circle'
                        }]
                    }],
                    steps: [
                        { range: [0, 1], color: '#c2ddff' },
                        { range: [1, 2], color: '#8fc1ff' },
                        { range: [2, 3], color: '#5ca5ff' },
                        { range: [3, 4], color: '#2989ff' },
                        { range: [4, 5], color: '#0777ff' },
                        { range: [5, 6], color: '#0067e4' },
                        { range: [6, 7], color: '#0057c2' },
                        { range: [7, 8], color: '#00397e' },
                        { range: [8, 9], color: '#001a3a' }
                    ],
                },
            },
        ];
        // Layout 
        let layout = {
            width: 400,
            height: 360,
            margin: { t: 108, r: 20, l: 20 },
        };

        Plotly.newPlot('gauge', data, layout);
    });
};
