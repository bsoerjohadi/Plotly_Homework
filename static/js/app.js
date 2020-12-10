// Bar chart for top 10 OTUs
// Fetch the JSON data
d3.json('../../samples.json').then((data) => {
    console.log(data)
// Create traces for top 10 OTUs
    var OTUid = data.samples[0].otu_ids.slice(0, 10).reverse()
    console.log(OTUid)

    var sampleValues = data.samples[0].sample_values.slice(0, 10).reverse()
    console.log(sampleValues)

    var label = data.samples[0].otu_labels.slice(0,10)
    console.log(label)
// Rename top 10 OTUs
    var OTUtop= OTUid.map(id => "OTU " + id)
    console.log(OTUtop)
// Creating top 10 OTU table
    var trace = {
        x: sampleValues,
        y: OTUtop,
        text: label,
        type: "bar",
        orientation: "h"
    }

    var data = [trace]

    var layout = {
        title: "Top 10 OTUs",       
        }

    Plotly.newPlot("bar", data, layout)

}); 

// Bubble chart of each sample
d3.json('../../samples.json').then((data) => {
    var OTUid = data.samples[0].otu_ids
    var sampleValues = data.samples[0].sample_values
    var label = data.samples[0].otu_labels

    var bubbleChart = {
        x: OTUid,
        y: sampleValues,
        text: label,
        mode: "markers",
        marker: {
            size: sampleValues,
            color: OTUid
        }
    }

    var bubbleData = [bubbleChart]

    var bubbleLayout = {
        xaxis: {title: "OTU ID"} 
    }

    Plotly.newPlot("bubble", bubbleData, bubbleLayout)
});

//Displaying sample metadata
d3.json('../../samples.json').then((data) => {
    var id = data.metadata[0].id
    var ethnicity = data.metadata[0].ethnicity
    var gender = data.metadata[0].gender
    var age = data.metadata[0].age
    var location = data.metadata[0].location
    var bbtype = data.metadata[0].bbtype
    var wfreq = data.metadata[0].wfreq

    d3.select("#sample-metadata").append("div")
        .text(`ID: ${id}`)
        .append("div").text(`Ethnicity: ${ethnicity}`)
        .append("div").text(`Gender: ${gender}`)
        .append("div").text(`Age: ${age}`)
        .append("div").text(`Location: ${location}`)
        .append("div").text(`BBType: ${bbtype}`)
        .append("div").text(`WFrequence: ${wfreq}`)
});

   
// Dropdown menu
function getDemInfo() {
    d3.json("../../samples.json").then((data) => {
        var subjects = data.metadata
        var id = subjects.map(data => data.id)
        var dropdown = d3.select("#selDataset")
        data.names.forEach(function(id) {
            dropdown.append("option").text(id).property("value") 
        })
    })
};
getDemInfo()

// Update plots any time that a new sample is selected
d3.selectAll("#selDataset").on("change", updatePlotly);

function optionChanged(id) {
    getDemInfo(id);
    updatePlotly(id) ;
};

function updatePlotly(id){
    d3.json("../../samples.json").then((data) => {
        var subjects = data.metadata;
        var search = subjects.filter(data => data.id.toString() == id)[0];
        console.log(search)
        var demInfo = d3.select("#sample-metadata");
        demInfo.html("");

            d3.json('../../samples.json').then((data) => {
                var searchid = subjects.filter(data => data.id.toString() == id)[0]["id"]
                var searchethnicity = subjects.filter(data => data.id.toString() == id)[0]["ethnicity"]
                var searchgender = subjects.filter(data => data.id.toString() == id)[0]["gender"]
                var searchage = subjects.filter(data => data.id.toString() == id)[0]["age"]
                var searchlocation = subjects.filter(data => data.id.toString() == id)[0]["location"]
                var searchbbtype = subjects.filter(data => data.id.toString() == id)[0]["bbtype"]
                var searchwfreq = subjects.filter(data => data.id.toString() == id)[0]["wfreq"]
            
                d3.select("#sample-metadata").append("div")
                    .text(`ID: ${searchid}`)
                    .append("div").text(`Ethnicity: ${searchethnicity}`)
                    .append("div").text(`Gender: ${searchgender}`)
                    .append("div").text(`Age: ${searchage}`)
                    .append("div").text(`Location: ${searchlocation}`)
                    .append("div").text(`BBType: ${searchbbtype}`)
                    .append("div").text(`WFrequence: ${searchwfreq}`)
            });
        })
    
    }