const svgMap = d3.select("#texasmap").append("svg")
  .attr("width", 700)
  .attr("height", 700)

const gMap = svgMap.append("g")
  .attr("transform", "translate(0,-300)")

var projection = d3.geoAlbersUsa().scale(3000)

var colorScale = d3.scaleThreshold()
  .domain([.1, .2, .3, .4, .5, .6])
  .range(d3.schemeRdYlGn[7])

d3.json("data/txcountygeo.json").then(data => {
  let mouseOver = d => {
    console.log(d.properties.name, countyNumbers[d.properties.name].one_dose, countyNumbers[d.properties.name].both_dose)
    d3.selectAll(".County")
      .style("opacity", .6)
      // two word counties xont work
    d3.selectAll(`.${d.properties.name}`)
      .style("stroke", "black")
      .style("opacity", 1)
  }

  let mouseOut = d => {
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
});