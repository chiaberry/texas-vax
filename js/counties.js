const BARHEIGHT = 35;

const svgCounty = d3.select("#counties").append("svg")
  .attr("width", 700)
  .attr("height", 600)

const gCounty = svgCounty.append("g")
  .attr("transform", `translate(0, 50)`)

const xScaleC = d3.scaleLinear()
    .domain([0, 1055964])
    .range([0, 500]);

const xScaleH = d3.scaleLinear()
    .domain([0, 3866923])
    .range([0, 500]);

const formatCommaNumber = commaNum => Number(commaNum.replace(/,/g, ''));

// todo: clean the data

d3.csv("data/tx_county_recent.csv").then(data=> {
  console.log(data[228])
  console.log(data[228]["Total Doses Allocated"])

  svgCounty.append("text")
    .attr("x", 0)
    .attr("y", 15)
    .attr("class", "county-name")
    .text(`${data[228]["County Name"]} County`);

  gCounty.append("rect")
    .attr("width", 500)
    .attr("height", BARHEIGHT)
    .attr("fill", " #f2e4d4")
  gCounty.append("text")
    .attr("x", 505)
    .attr("y", 0)
    .text(`Population 16+: ${data[228]["Population, 16+"]}`)
  gCounty.append("text")
    .attr("x", 505)
    .attr("y", 20)
    .text(`Pct with 1 dose: ${(formatCommaNumber(data[228]["People Vaccinated with at least One Dose"])*100/formatCommaNumber(data[228]["Population, 16+"])).toFixed(2)}%`)
  gCounty.append("text")
    .attr("x", 505)
    .attr("y", 40)
    .text(`Pct with 2 dose: ${(formatCommaNumber(data[228]["People Fully Vaccinated"])*100/formatCommaNumber(data[228]["Population, 16+"])).toFixed(2)}%`)

  gCounty.append("rect")
    .attr("width", xScaleC(formatCommaNumber(data[228]["Total Doses Allocated"])))
    .attr("height", BARHEIGHT)
    .attr("fill", "#fa9441")
  gCounty.append("text")
    .attr("x", xScaleC(Number(data[228]["Total Doses Allocated"].replace(/,/g, ''))))
    .attr("y", -5)
    .attr("fill-opacity", "50%")
    .text(`Allocated: ${data[228]["Total Doses Allocated"]}`)

  gCounty.append("rect")
    .attr("width", xScaleC(Number(data[228]["Vaccine Doses Administered"].replace(/,/g, ''))))
    .attr("height", BARHEIGHT)
    .attr("fill", "#97d4ea")
  gCounty.append("text")
    .attr("x", xScaleC(Number(data[228]["Vaccine Doses Administered"].replace(/,/g, ''))))
    .attr("y", 55)
    .text(`Administered: ${data[228]["Vaccine Doses Administered"]}`)

  gCounty.append("rect")
    .attr("width", xScaleC(Number(data[228]["People Vaccinated with at least One Dose"].replace(/,/g, ''))))
    .attr("height", BARHEIGHT)
    .attr("fill", "#00bde3")
  gCounty.append("text")
    .attr("x", xScaleC(Number(data[228]["People Vaccinated with at least One Dose"].replace(/,/g, ''))))
    .attr("y", 75)
    .text(`One Dose: ${data[228]["People Vaccinated with at least One Dose"]}`)
  gCounty.append("line")
    .attr("x1", xScaleC(Number(data[228]["People Vaccinated with at least One Dose"].replace(/,/g, ''))))
    .attr("y1", 40)
    .attr("x2", xScaleC(Number(data[228]["People Vaccinated with at least One Dose"].replace(/,/g, ''))))
    .attr("y2", 65)
    .attr("stroke", "#00bde3")
    .attr("stroke-dasharray", "3 1")

  gCounty.append("rect")
    .attr("width", xScaleC(Number(data[228]["People Fully Vaccinated"].replace(/,/g, ''))))
    .attr("height", BARHEIGHT)
    .attr("fill", "#07648d")
  gCounty.append("text")
    .attr("x", xScaleC(Number(data[228]["People Fully Vaccinated"].replace(/,/g, ''))))
    .attr("y", 95)
    .text(`Both Doses: ${data[228]["People Fully Vaccinated"]}`)
  gCounty.append("line")
    .attr("x1", xScaleC(Number(data[228]["People Fully Vaccinated"].replace(/,/g, ''))))
    .attr("y1", 40)
    .attr("x2", xScaleC(Number(data[228]["People Fully Vaccinated"].replace(/,/g, ''))))
    .attr("y2", 80)
    .attr("stroke", "#07648d")
    .attr("stroke-width", 2)


    // quick and dirty harris county
  svgCounty.append("text")
    .attr("x", 0)
    .attr("y", 215)
    .attr("class", "county-name")
    .text(`${data[102]["County Name"]} County`);

  gCounty.append("rect")
    .attr("width", 500)
    .attr("height", BARHEIGHT)
    .attr("fill", " #f2e4d4")
    .attr("transform", "translate(0, 200)")
  gCounty.append("text")
    .attr("x", 505)
    .attr("y", 200)
    .text(`Population 16+: ${data[102]["Population, 16+"]}`)
    gCounty.append("text")
    .attr("x", 505)
    .attr("y", 220)
    .text(`Pct with 1 dose: ${(formatCommaNumber(data[102]["People Vaccinated with at least One Dose"])*100/formatCommaNumber(data[102]["Population, 16+"])).toFixed(2)}%`)
  gCounty.append("text")
    .attr("x", 505)
    .attr("y", 240)
    .text(`Pct with 2 dose: ${(formatCommaNumber(data[102]["People Fully Vaccinated"])*100/formatCommaNumber(data[102]["Population, 16+"])).toFixed(2)}%`)

  gCounty.append("rect")
    .attr("width", xScaleH(Number(data[102]["Total Doses Allocated"].replace(/,/g, ''))))
    .attr("height", BARHEIGHT)
    .attr("fill", "#fa9441")
    .attr("transform", "translate(0, 200)")
  gCounty.append("text")
    .attr("x", xScaleH(Number(data[102]["Total Doses Allocated"].replace(/,/g, ''))))
    .attr("y", 195)
    .attr("fill-opacity", "50%")
    .text(`Allocated: ${data[102]["Total Doses Allocated"]}`)

  gCounty.append("rect")
    .attr("width", xScaleH(Number(data[102]["Vaccine Doses Administered"].replace(/,/g, ''))))
    .attr("height", BARHEIGHT)
    .attr("fill", "#97d4ea")
    .attr("transform", "translate(0, 200)")
  gCounty.append("text")
    .attr("x", xScaleH(Number(data[102]["Vaccine Doses Administered"].replace(/,/g, ''))))
    .attr("y", 255)
    .text(`Administered: ${data[102]["Vaccine Doses Administered"]}`)

  gCounty.append("rect")
    .attr("width", xScaleH(Number(data[102]["People Vaccinated with at least One Dose"].replace(/,/g, ''))))
    .attr("height", BARHEIGHT)
    .attr("fill", "#00bde3")
    .attr("transform", "translate(0, 200)")
  gCounty.append("text")
    .attr("x", xScaleH(Number(data[102]["People Vaccinated with at least One Dose"].replace(/,/g, ''))))
    .attr("y", 275)
    .text(`One Dose: ${data[102]["People Vaccinated with at least One Dose"]}`)
  gCounty.append("line")
    .attr("x1", xScaleH(Number(data[102]["People Vaccinated with at least One Dose"].replace(/,/g, ''))))
    .attr("y1", 240)
    .attr("x2", xScaleH(Number(data[102]["People Vaccinated with at least One Dose"].replace(/,/g, ''))))
    .attr("y2", 265)
    .attr("stroke", "#00bde3")
    .attr("stroke-dasharray", "3 1")

  gCounty.append("rect")
    .attr("width", xScaleH(Number(data[102]["People Fully Vaccinated"].replace(/,/g, ''))))
    .attr("height", BARHEIGHT)
    .attr("fill", "#07648d")
    .attr("transform", "translate(0, 200)")
  gCounty.append("text")
    .attr("x", xScaleH(Number(data[102]["People Fully Vaccinated"].replace(/,/g, ''))))
    .attr("y", 295)
    .text(`Both Doses: ${data[102]["People Fully Vaccinated"]}`)
  gCounty.append("line")
    .attr("x1", xScaleH(Number(data[102]["People Fully Vaccinated"].replace(/,/g, ''))))
    .attr("y1", 240)
    .attr("x2", xScaleH(Number(data[102]["People Fully Vaccinated"].replace(/,/g, ''))))
    .attr("y2", 280)
    .attr("stroke", "#07648d")
    .attr("stroke-width", 2)


})






