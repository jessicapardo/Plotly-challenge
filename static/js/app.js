function getName() {
    // Select dropdown menu id and assign it to a variable
    let dropdownMenu = d3.select('#selDataset');
    // Read "names" values from json file and append into dropdown menu
    d3.json('data/samples.json')
        .then(subject => subject.names
            .forEach(name => dropdownMenu
                .append('option')
                .text(name)
                .property('value'),

                // Initialize page with default data 
                getBoxdata(subject.names[0]),
                getBar(subject.names[0]),
                getBubble(subject.names[0]),
                getGauge(subject.names[0])
            ),
        );
};

// // Fetching new data each time a new sample is selected
function optionChanged(id) {
    getBoxdata(id);
    getBar(id);
    getBubble(id);
    getGauge(id);
};

// =============================================
// Demographic Info Box
function getBoxdata(id) {
    //Read "metadata" from json file for each subject and assign it to a variable
    d3.json('data/samples.json').then(data => {
            let subjectData = data.metadata
                .filter(subject => subject.id.toString() === id)[0];

            // Select demographic info id and assign it to a variable
            let subjectMetadata = d3.select('#sample-metadata');
            
            subjectMetadata.html('');
            // Push data 
            Object.entries(subjectData)
                .forEach(([key, value]) => subjectMetadata
                    .append('p')
                    .text(`${key}: ${value}`),
                );
        });
};


getName();

// =============================================
// Bar chart
function getBar(id) {
    // Read data from json file for each sample
    d3.json('data/samples.json').then(data => {
            let sortedSample = data.samples.filter(sample => sample.id === id)[0];
            console.log(sortedSample);
            // Trace for bar chart that displays each sample top 10 OTU values
            let barTrace = {
                x: sortedSample.sample_values.slice(0, 10).reverse(),
                y: sortedSample.otu_ids.slice(0, 10).map(otuid => `OTU ${otuid}`).reverse(),
                text: sortedSample.otu_labels.slice(0, 10).reverse(),
                type: 'bar',
                orientation: 'h'
            };
            // Data
            data = [barTrace];
            // Layout
            let layout = {
                title: { text: `Top 10 OTU for Test Subject No. ${id}`, font: {size: 20} },
                height: 600,
                width: 500,
                xaxis: { title: "Sample Value" },
                yaxis: { title: "Bacteria ID" },
                
            };
            
            Plotly.newPlot('bar', data, layout);
        });
};

// =============================================
// Bubble chart
function getBubble(id) {
    // Read data from json file for each sample, assign it to a variable, and plot it
    d3.json('data/samples.json').then(data => {
            let sortedSample = data.samples.filter(sample => sample.id === id)[0];
            console.log(sortedSample);

            // Trace for bubble chart 
            let bubbleTrace = {
                x: sortedSample.otu_ids,
                y: sortedSample.sample_values,
                text: sortedSample.otu_labels,
                mode: "markers",
                marker: {
                    size: sortedSample.sample_values,
                    color: sortedSample.otu_ids,
                    colorscale: 'Earth',
                    opacity: 0.8
                },
            };
            // Data
            data = [bubbleTrace];
            // Layout
            let layout = {
                title: { text: `Test Subject No. ${id} Belly Button Biodiversity`,font: {size: 24, color: 'black'}},
                height: 600,
                width: 1200,
                xaxis: { title: 'OTU ID (Bacteria)'},
                yaxis: { title: 'Sample Value', automargin: true, },
            
            };
                    
            Plotly.newPlot('bubble', data, layout);
        });
};