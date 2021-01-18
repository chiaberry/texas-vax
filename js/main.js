const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100 }
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM

// width & height are the area we have to work with

const svg = d3.select("#chart-area").append("svg")
  .attr("width", 600)
  .attr("height", 400)

const g = svg.append("g")
  .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`) // look up what this does

const xLabel = g.append("text")
  .attr("class", "x axis-label")
  .attr("x", WIDTH/2)
  .attr("y", HEIGHT+60)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("Date")
const yLabel = g.append("text")
  .attr("class", "y axis-label")
  .attr("x", -(HEIGHT/2))
  .attr("y", -60)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("Doses and Population")


//todo: move into data to get end date
const xScale = d3.scaleTime()
    .domain([new Date(2021, 0, 12), new Date(2021, 0, 24)])
    .range([0, WIDTH]);
const xAxisGenerator = d3.axisBottom(xScale)
    .tickSize(6) // ?
    .tickFormat(d3.timeFormat("%m/%d"));
g.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${HEIGHT})`)
  .call(xAxisGenerator)


const yScale = d3.scaleLinear()
  .domain([0, 2058050])
  .range([HEIGHT, 0])
const yAxisGenerator = d3.axisLeft(yScale)
g.append("g")
  .attr("class", "y axis")
  .call(yAxisGenerator)

const parseTime = d3.timeParse("%Y-%m-%d")

d3.json("data/texas.json").then(data=> {
  console.log(data)

    // Add the line
g.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 1.5)
  .attr("d", d3.line()
    .x(d => {
      console.log(d.date)
      return xScale(parseTime(d.date))
    })
    .y(d => {
      console.log(d.one_dose)
      return yScale(d.one_dose)
    })
  )

  g.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 1.5)
  .attr("d", d3.line()
    .x(d => {
      console.log(d.date)
      return xScale(parseTime(d.date))
    })
    .y(d => {
      console.log(d.one_dose)
      return yScale(d.vax_administered)
    })
  )

  // const rects = g.selectAll("rects")
  //   .data(data)

  // rects.enter().append("rect")
  //   .attr("y", d => yScale(d.number))
  //   .attr("x", (d) => xScale(d.gender))
  //   .attr("width", xScale.bandwidth)
  //   .attr("height", d => HEIGHT - yScale(d.number))
  //   .attr("fill", "teal")
})





