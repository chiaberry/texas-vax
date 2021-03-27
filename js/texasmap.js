const svgMap = d3.select("#texasmap").append("svg")
  .attr("width", 700)
  .attr("height", 700)
const svgMapLegend = d3.select("#map-legend").append("svg")
  .attr("width", 300)
  .attr("height", 700)

const gMap = svgMap.append("g")
  .attr("transform", "translate(0,-300)")
const gMapColors = svgMapLegend.append("g")
  .attr("transform", "translate(0, 100)")
const gMapLegend = svgMapLegend.append("g")
  .attr("transform", "translate(0, 200)")

var projection = d3.geoAlbersUsa().scale(3000)
const colorRange = ["#ffffd9","#eff9bd","#d5eeb3","#a9ddb7","#73c9bd","#45b4c2","#2897bf","#2073b2","#234ea0","#1c3185","#081d58"]

var colorScale = d3.scaleThreshold()
  .domain([.1, .2, .3, .4, .5, .6, .7, .8, .9])
  .range(colorRange)

colorRange.map((color, i) => {
  gMapColors.append("rect")
  .attr("width", 30)
  .attr("height", 40)
  .attr("transform", `translate(${30*(i-1)}, 0)`)
  .attr("fill", color)
  gMapColors.append("text")
  .attr("transform", `translate(${30*(i-1)}, 60)`)
  .attr("class", "color-text")
  .text(`${i*10}%`)
})


d3.json("data/txcountygeo.json").then(data => {
  let mouseOver = d => {
    console.log(d.properties.name, countyNumbers[d.properties.name].one_dose, countyNumbers[d.properties.name].both_dose)
    d3.selectAll(".County")
      .style("opacity", .7)
      // two word counties dont work
    d3.selectAll(`.${d.properties.name}`)
      .style("stroke", "black")
      .style("opacity", 1)
    countyName = d.properties.name;
      gMapLegend.append("text")
    .attr("x", 20)
    .attr("y", 40)
    .attr("class", "countyLegend")
    .text(`County: ${d.properties.name}`)
  // gMapLegend.append("text")
  //   .attr("x", 20)
  //   .attr("y", 50)
  //   .attr("class", "countyLegend")
  //   .text(`Population 16+:`)
  gMapLegend.append("text")
    .attr("x", 20)
    .attr("y", 70)
    .attr("class", "countyLegend")
    .text(`Pct with 1 dose: ${(countyNumbers[d.properties.name].one_dose*100).toFixed(2)}%`)
  gMapLegend.append("text")
    .attr("x", 20)
    .attr("y", 90)
    .attr("class", "countyLegend")
    .text(`Pct with 2 dose: ${(countyNumbers[d.properties.name].both_dose*100).toFixed(2)}%`)
  }

  let mouseOut = d => {
    gMapLegend.selectAll(".countyLegend").remove();
    d3.selectAll(".County")
      .style("opacity", 1)
      .style("stroke", "#fff")
  }

  gMap.selectAll("path")
  .data(data.features)
  .enter().append("path")
    .attr("fill", (d) => {
      return colorScale(countyNumbers[d.properties.name].one_dose)})
    .attr("d", d3.geoPath()
      .projection(projection)
      )
    .style("stroke", "#fff")
    .attr("class", d => (`County ${d.properties.name}`))
    .on("mouseover", mouseOver)
    .on("mouseout", mouseOut)

  gMapLegend.append("text")
    .attr("x", 0)
    .attr("y", 0)
    .text("Map shows pct of pop 16+ with: One Dose")
  gMapLegend.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .text("Hover over County to see detail")
  


});
