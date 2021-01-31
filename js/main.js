const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100 }
const WIDTH = 700 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM

const svg = d3.select("#chart-area").append("svg")
  .attr("width", 800)
  .attr("height", 500)
const svgLegend = d3.select("#chart-legend").append("svg")
  .attr("width", 250)
  .attr("height", 500)

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
    .domain([new Date(2021, 0, 12), new Date(2021, 1, 2)])
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
const formatTime = d3.timeFormat("%Y-%m-%d")
const formatNumber = num => num.toLocaleString();

/* LEGEND */
const legend = svgLegend.append("g")
  .attr("transform", `translate(${0}, ${200})`)

const legendInfo = [
  {
    name: "total_doses",
    text: "Total doses allocated",
    color: "red"
  },
  {
    name: "vax_administered",
    text: "Vaccine doses administered",
    color: "blue"
  },
  {
    name: "one_dose",
    text: "People with at least one dose",
   color: "purple"
 },
 {  name: "fully_vax",
    text: "People fully vaccinated",
   color: "green"
 }
]

const dataInfo = {
  "total_doses": {
    text: "Total doses allocated",
    color: "red"
  },
  "vax_administered": {
    text: "Vaccine doses administered",
    color: "blue"
  },
  "one_dose": {
    text: "People with at least one dose",
   color: "purple"
 },
 "fully_vax": {
    text: "People fully vaccinated",
   color: "green"
 }
}

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

// MOUSEOVER INFORMATION

var hoverNumber = g.append("g")
  .attr("class", "focus")
  .style("display", "none");

// these should be pulled into the loop below
// also right justify the numbers
// and format the numbers with commas
hoverNumber.append("text")
  .attr("x", 18)
  .attr("y", 18)
  .text("Allocated: ");
hoverNumber.append("text")
  .attr("class", "total-allocated")
  .attr("x", 192)
  .attr("y", 18)
  .attr("text-anchor", "end");
hoverNumber.append("text")
  .attr("x", 18)
  .attr("y", 36)
  .text("Administered: ");
hoverNumber.append("text")
  .attr("class", "total-administered")
  .attr("x", 192)
  .attr("y", 36)
  .attr("text-anchor", "end");
hoverNumber.append("text")
  .attr("x", 18)
  .attr("y", 54)
  .text("One Dose: ");
hoverNumber.append("text")
  .attr("class", "one-dose")
  .attr("x", 192)
  .attr("y", 54)
  .attr("text-anchor", "end");
hoverNumber.append("text")
  .attr("x", 18)
  .attr("y", 72)
  .text("Both Dose: ");
hoverNumber.append("text")
  .attr("class", "both-dose")
  .attr("x", 192)
  .attr("y", 72)
  .attr("text-anchor", "end");

g.append("rect")
  .attr("class", "overlay")
  .attr("width", WIDTH)
  .attr("height", HEIGHT)
  .on("mouseover", function() { hoverNumber.style("display", null); })
  .on("mouseout", function() { 
    hoverNumber.style("display", "none");
    hoverNumber.selectAll(".tooltip-dot").remove();
    hoverNumber.selectAll(".tooltip-number").remove();
  })
  .on("mousemove", mousemove);

  function mousemove() {
      hoverNumber.selectAll(".tooltip-dot").remove();
      hoverNumber.selectAll(".tooltip-number").remove();
      const bisectDate = d3.bisector(d => d.date).right;
      var date = xScale.invert(d3.mouse(this)[0]),
          i = bisectDate(data, formatTime(date), 1)
          d0 = data[i - 1],
          d1 = data[i],
          d = date - parseTime(d0.date) > parseTime(d1.date) - date ? d1 : d0;
      // hoverNumber.attr("transform", "translate(" + xScale(parseTime(d.date)) + "," + yScale(d.vax_administered) + ")");
      hoverNumber.select(".total-allocated").text(formatNumber(d.total_doses));
      hoverNumber.select(".total-administered").text(formatNumber(d.vax_administered));
      hoverNumber.select(".one-dose").text(formatNumber(d.one_dose));
      hoverNumber.select(".both-dose").text(formatNumber(d.fully_vax));
      for (let key of Object.keys(d)) {
        if (key !== 'date' && key !== 'pop_over_16' && key !== 'pop_over_65') {
          hoverNumber.append("circle")
            .attr("class", "tooltip-dot")
            .attr("r", 4)
            .attr("fill", dataInfo[key].color)
            .attr("cx", xScale(parseTime(d.date)))
            .attr("cy", yScale(d[key]))
          // hoverNumber.append("text")
          //   .attr("class", "tooltip-number")
          //   .attr("x", xScale(parseTime(d.date)))
          //   .attr("y", yScale(d[key]))
          //   .text(d[key])
          //   .attr("transform", "translate(5, 15)")
        }
      }
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





