const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100 }
const WIDTH = 700 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM

const svg = d3.select("#chart-area").append("svg")
  .attr("width", 800)
  .attr("height", 400)
const svgLegend = d3.select("#chart-legend").append("svg")
  .attr("width", 250)
  .attr("height", 400)

const g = svg.append("g")
  .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

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
    .domain([new Date(2021, 0, 12), new Date(2021, 0, 26)])
    .range([0, WIDTH]);
const xAxisGenerator = d3.axisBottom(xScale)
    .tickSize(6) // ?
    .tickFormat(d3.timeFormat("%m/%d"));
g.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${HEIGHT})`)
  .call(xAxisGenerator)

const yScale = d3.scaleLinear()
  .domain([1, 4040000])
  .range([HEIGHT, 0])
const yAxisGenerator = d3.axisLeft(yScale)
g.append("g")
  .attr("class", "y axis")
  .call(yAxisGenerator)

const parseTime = d3.timeParse("%Y-%m-%d")

/* LEGEND */
const legend = svgLegend.append("g")
  .attr("transform", `translate(${0}, ${200})`)

const legendInfo = [
  {text: "Total doses allocated",
   color: "red"},
  {text: "Vaccine doses administered",
   color: "blue"},
  {text: "People with at least one dose",
   color: "purple"},
  {text: "People fully vaccinated",
   color: "green"}]

legendInfo.forEach((line, i) => {
  const legendRow = legend.append("g")
    .attr("transform", `translate(0, ${i*20})`)
  legendRow.append("rect")
    .attr("width", 10)
    .attr("height", 10)
    .attr("fill", line.color)
  legendRow.append("text")
    .attr("x", 20)
    .attr("y", 10)
    .attr("text-anchor", "start")
    .style("text-transform", "capitalize")
    .text(line.text)
})



d3.json("data/texas.json").then(data=> {
    // Add the line
g.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "purple")
  .attr("stroke-width", 1.5)
  .attr("d", d3.line()
    .x(d => xScale(parseTime(d.date)))
    .y(d => yScale(d.one_dose))
  )

g.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "blue")
  .attr("stroke-width", 2.0)
  .attr("d", d3.line()
    .x(d => xScale(parseTime(d.date)))
    .y(d => yScale(d.vax_administered))
  )

g.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "red")
  .attr("stroke-width", 1.5)
  .attr("d", d3.line()
    .x(d => xScale(parseTime(d.date)))
    .y(d => yScale(d.total_doses))
  )

g.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "green")
  .attr("stroke-width", 1.5)
  .attr("d", d3.line()
    .x(d => xScale(parseTime(d.date)))
    .y(d => yScale(d.fully_vax))
  )

  // MOUSEOVER TOOTLIP

  var hoverNumber = g.append("g")
    .attr("class", "focus")
    .style("display", "none");

  hoverNumber.append("circle")
    .attr("r", 5);

  hoverNumber.append("rect")
      .attr("class", "tooltip")
      .attr("width", 100)
      .attr("height", 50)
      .attr("x", 10)
      .attr("y", -22)
      .attr("rx", 4)
      .attr("ry", 4);

  hoverNumber.append("text")
      .attr("x", 18)
      .attr("y", 18)
      .text("Likes:");

  hoverNumber.append("text")
      .attr("class", "tooltip-likes")
      .attr("x", 60)
      .attr("y", 18);

  g.append("rect")
      .attr("class", "overlay")
      .attr("width", WIDTH)
      .attr("height", HEIGHT)
      .on("mouseover", function() { hoverNumber.style("display", null); })
      .on("mouseout", function() { hoverNumber.style("display", "none"); })
      .on("mousemove", mousemove);

  function mousemove() {
      const bisectDate = d3.bisector(d => { 
        console.log("DDDDD ", d)
        return d.date
      }).left;
      // console.log(d3.mouse(this)[0])
      var date = xScale.invert(d3.mouse(this)[0]),
          i = bisectDate(data, date, 1)
          d0 = data[i - 1],
          d1 = data[i],
          d = date - d0.date > d1.date - date ? d1 : d0;
      // console.log(date, d0, d1)//, d0, d1, d)
      console.log(i)
      // hoverNumber.attr("transform", "translate(" + x(d.date) + "," + y(d.likes) + ")");
      hoverNumber.select(".tooltip-likes").text(formatValue(d.likes));
  }

// g.append("path")
//   .datum(data)
//   .attr("fill", "none")
//   .attr("stroke", "black")
//   .attr("stroke-width", 3.0)
//   .attr("d", d3.line()
//     .x(d => xScale(parseTime(d.date)))
//     .y(d => yScale(d.pop_over_16))
//   )
})





