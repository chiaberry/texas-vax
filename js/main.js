const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100 }
const WIDTH = 850 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM

const svg = d3.select("#chart-area").append("svg")
  .attr("width", 850)
  .attr("height", 500)
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
  .attr("y", -70)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("Doses and Population")


const xScale = d3.scaleTime()
  .domain([new Date(2021, 0, 12), new Date(2021, 2, 15)])
  .range([0, WIDTH]);
const xAxisGenerator = d3.axisBottom(xScale)
  .tickSize(6)
  .tickFormat(d3.timeFormat("%m/%d"));
g.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${HEIGHT})`)
  .call(xAxisGenerator)

const yScale = d3.scaleLinear()
  .domain([0, 11000000])
  .range([HEIGHT, 0])
const yAxisGenerator = d3.axisLeft(yScale)
g.append("g")
  .attr("class", "y axis")
  .call(yAxisGenerator)

const parseTime = d3.timeParse("%Y-%m-%d")
const formatTime = d3.timeFormat("%Y-%m-%d")
const shortTime = d3.timeFormat("%b %d")
const formatNumber = num => num.toLocaleString();

const dataInfo = {
  "total_doses": {
    text: "Total doses allocated",
    color: "#fa9441",
    shortText: "Allocated: "
  },
  "vax_administered": {
    text: "Vaccine doses administered",
    color: "#538200",
    shortText: "Administered: "
  },
  "one_dose": {
    text: "People with 1+ dose",
    color: "#00bde3",
    shortText: "One Dose: "
 },
 "fully_vax": {
    text: "People fully vaccinated",
    color: "#07648d",
    shortText: "Both Doses: "
 }
}

const percentages = svgLegend.append("g")
  .attr("transform", 'translate(0, 100)')

percentages.append("text")
  .attr("x", 20)
  .attr("y", 20)
  .text("Population over 16")
percentages.append("text")
  .attr("x", 20)
  .attr("y", 44)
  .attr("class", "perct-number")
  .text("22,421,178")
percentages.append("text")
  .attr("x", 20)
  .attr("y", 68)
  .text("Percentage with 1+ dose")
percentages.append("text")
  .attr("x", 20)
  .attr("y", 88)
  .attr("class", "one_dose_percent perct-number")
percentages.append("text")
  .attr("x", 20)
  .attr("y", 112)
  .text("Percentage fully vaccinated")
percentages.append("text")
  .attr("x", 20)
  .attr("y", 132)
  .attr("class", "full_vax_percent perct-number")


/* LEGEND */
const legend = g.append("g")
  .attr("transform", 'translate(20, 18)')
const hoverNumber = g.append("g")
  .attr("class", "focus")
  .style("display", "none");

let i = 0;
for (let key of Object.keys(dataInfo)) {
  // legend
  const legendRow = legend.append("g")
    .attr("transform", `translate(0, ${i*20})`)
  legendRow.append("rect")
    .attr("width", 10)
    .attr("height", 10)
    .attr("fill", dataInfo[key].color)
  legendRow.append("text")
    .attr("x", 20)
    .attr("y", 10)
    .attr("text-anchor", "start")
    .text(dataInfo[key].text)
  // upper left numbers revealed on mouseover
  // hoverNumber.append("text")
  //   .attr("x", 18)
  //   .attr("y", 18 + (i * 18))
  //   .text(dataInfo[key].text);
  hoverNumber.append("text")
    .attr("class", `${key} numbers`)
    .attr("x", 310)
    .attr("y", 29 + (i * 20))
    .attr("text-anchor", "end");
  i = i + 1;
}


d3.json("data/texas.json").then(data=> {
  g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#00bde3")
    .attr("stroke-width", 2.0)
    .attr("d", d3.line()
      .x(d => xScale(parseTime(d.date)))
      .y(d => yScale(d.one_dose))
    )

  g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#538200")
    .attr("stroke-width", 2.5)
    .attr("d", d3.line()
      .x(d => xScale(parseTime(d.date)))
      .y(d => yScale(d.vax_administered))
    )

  g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#fa9441")
    .attr("stroke-width", 2.0)
    .attr("d", d3.line()
      .x(d => xScale(parseTime(d.date)))
      .y(d => yScale(d.total_doses))
    )

  g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#07648d")
    .attr("stroke-width", 2.0)
    .attr("d", d3.line()
      .x(d => xScale(parseTime(d.date)))
      .y(d => yScale(d.fully_vax))
    )

  // MOUSEOVER INFORMATION
  g.append("rect")
    .attr("class", "overlay")
    .attr("width", WIDTH)
    .attr("height", HEIGHT)
    .on("touchstart", function() { hoverNumber.style("display", null); })
    .on("touchend", function() { 
      hoverNumber.style("display", "none");
      hoverNumber.selectAll(".tooltip-dot").remove();
      hoverNumber.selectAll(".tooltip-number").remove();
    })
    .on("touchmove", mousemove)
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
        hoverNumber.append("text")
          .attr("class", "tooltip-dot")
          .attr("x", 20)
          .attr("y", 10)
          // .attr("text-anchor", "end")
          .text(`Date: ${shortTime(parseTime(d.date))}`)
        percentages.select(".one_dose_percent").text(`${((d.one_dose/22421178)*100).toFixed(2)} %`)
        percentages.select(".full_vax_percent").text(`${((d.fully_vax/22421178)*100).toFixed(2)} %`)
        for (let key of Object.keys(d)) {
          if (key !== 'date' && key !== 'pop_over_16' && key !== 'pop_over_65') {
            hoverNumber.append("circle")
              .attr("class", "tooltip-dot")
              .attr("r", 4)
              .attr("fill", dataInfo[key].color)
              .attr("cx", xScale(parseTime(d.date)))
              .attr("cy", yScale(d[key]))
            // ex: hoverNumber.select(".total-allocated").text(formatNumber(d.total_doses));
            hoverNumber.select(`.${key}`).text(formatNumber(d[key]))
          }
        }
    }
})



