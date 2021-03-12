

const svgMap = d3.select("#texasmap").append("svg")
  .attr("width", 700)
  .attr("height", 700)

const gMap = svgMap.append("g")
        .attr("transform", "translate(0,-300)")

var projection = d3.geoAlbersUsa()
                  .scale(3000)

d3.json("data/txcountygeo.json").then(data => {
  console.log(data.features)

      gMap.selectAll("path")
      .data(data.features)
      .enter().append("path")
        .attr("fill", (d) => {
          console.log(d)
          if (d.properties.name === "Travis") {
            return ("#1492ff")
          }
          return ("#69b3a2")})
        .attr("d", d3.geoPath()
          .projection(projection)
          )
        .style("stroke", "#fff")
});