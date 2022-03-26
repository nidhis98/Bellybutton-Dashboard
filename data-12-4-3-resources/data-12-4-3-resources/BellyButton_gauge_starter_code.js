// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var samples = data.samples
    // Create a variable that filters the samples for the object with the desired sample number.
    var desiredSamples = samples.filter(sample => sample['id'] === sampleID)
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metaData = data.metaData(sample => sample['id'] === sampleID)
    // Create a variable that holds the first sample in the array.
    var firstSample = desiredSamples[0]
    console.log(firstSample);

    // 2. Create a variable that holds the first sample in the metadata array.
    var metaSample = metaData[0]
  

    // Create variables that hold the otu_ids, otu_labels, and sample_values.

    var ids = firstSample.otu_ids
    var labels = firstSample.otu_labels
    var values = firstSample.sample_values
  

    // 3. Create a variable that holds the washing frequency.
    var washing_frequency = metaresults.washing_frequency;
  
   
    // Create the yticks for the bar chart.
    
    var yticks = ids.slice(0, 10).map(function (otuID) {
      return `OTU ${otuID}`;
    }).reverse();


    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot();
    
    // Use Plotly to plot the bubble data and layout.
    Plotly.newPlot();
   
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
        domain: { x: [0,1], y: [0,1]},
        value: washing_frequency,
        type: "indicator",
        mode: "gauge+number",
        title: { text: "<b> Belly Button Washing Frequency</b> <br> # of Scrubs per Week"},
        gauge: {
          axis: { range: [null, 10], tickwidth: 2, tickcolor: "black" },
          bar: { color: "black" },
          steps: [
            { range: [0,2], color: "red"},
            { range: [2,4], color: "orange"},
            { range: [4,6], color: "yellow"},
            { range: [6,8], color: "palegreen"},
            { range: [8,10], color: "forestgreen"},
          ],
          threshold: {
            value: washing_frequency,
          }
        }
    }
     
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width:450, height: 300, margin: { t: 20, b:0 },
      font: {color: "white"},
      paper_bgcolor : "#1f77b4"
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge",gaugeData, gaugeLayout);
  });
}
