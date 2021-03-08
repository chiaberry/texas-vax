const BARHEIGHT = 35;

const svgCounty = d3.select("#counties").append("svg")
  .attr("width", 700)
  .attr("height", 600)

const gCounty = svgCounty.append("g")
  .attr("transform", `translate(0, 50)`)

const xScaleC = d3.scaleLinear()
    .domain([0, 1032386])
    .range([0, 500]);

const xScaleH = d3.scaleLinear()
    .domain([0, 3601939])
    .range([0, 500]);

const populationVar = "Population, 16+";
const atLeastOneVar = "People Vaccinated with at least One Dose";
const totalDoseAllocVar = "Total Doses Allocated";
const totalDoseAdminVar = "Vaccine Doses Administered";
const fullyVaxVar = "People Fully Vaccinated";

const formatCommaNumber = commaNum => Number(commaNum.replace(/,/g, ''));
const returnPercentage = (numerator, denominator) => (formatCommaNumber(numerator)*100/formatCommaNumber(denominator)).toFixed(2)

d3.csv("data/tx_county_recent.csv").then(data=> {
  console.log(data[229])

  svgCounty.append("text")
    .attr("x", 0)
    .attr("y", 15)
    .attr("class", "county-name")
    .text(`${data[229]["County Name"]} County`);

  gCounty.append("rect")
    .attr("width", 500)
    .attr("height", BARHEIGHT)
    .attr("fill", " #f2e4d4")
  gCounty.append("text")
    .attr("x", 505)
    .attr("y", 0)
    .text(`Population 16+: ${data[229][populationVar]}`)
  gCounty.append("text")
    .attr("x", 505)
    .attr("y", 20)
    .text(`Pct with 1 dose: ${returnPercentage(data[229][atLeastOneVar], data[229][populationVar])}%`)
  gCounty.append("text")
    .attr("x", 505)
    .attr("y", 40)
    .text(`Pct with 2 dose: ${returnPercentage(data[229][fullyVaxVar], data[229][populationVar])}%`)

  gCounty.append("rect")
    .attr("width", xScaleC(formatCommaNumber(data[229][totalDoseAllocVar])))
    .attr("height", BARHEIGHT)
    .attr("fill", "#fa9441")
  gCounty.append("text")
    .attr("x", xScaleC(formatCommaNumber(data[229][totalDoseAllocVar])))
    .attr("y", -5)
    .attr("fill-opacity", "50%")
    .text(`Allocated: ${data[229][totalDoseAllocVar]}`)

  gCounty.append("rect")
    .attr("width", xScaleC(formatCommaNumber(data[229][totalDoseAdminVar])))
    .attr("height", BARHEIGHT)
    .attr("fill", "#97d4ea")
  gCounty.append("text")
    .attr("x", xScaleC(formatCommaNumber(data[229][totalDoseAdminVar])))
    .attr("y", 55)
    .text(`Administered: ${data[229][totalDoseAdminVar]}`)

  gCounty.append("rect")
    .attr("width", xScaleC(formatCommaNumber(data[229][atLeastOneVar])))
    .attr("height", BARHEIGHT)
    .attr("fill", "#00bde3")
  gCounty.append("text")
    .attr("x", xScaleC(formatCommaNumber(data[229][atLeastOneVar])))
    .attr("y", 75)
    .text(`One Dose: ${data[229][atLeastOneVar]}`)
  gCounty.append("line")
    .attr("x1", xScaleC(formatCommaNumber(data[229][atLeastOneVar])))
    .attr("y1", 40)
    .attr("x2", xScaleC(formatCommaNumber(data[229][atLeastOneVar])))
    .attr("y2", 65)
    .attr("stroke", "#00bde3")
    .attr("stroke-dasharray", "3 1")

  gCounty.append("rect")
    .attr("width", xScaleC(formatCommaNumber(data[229][fullyVaxVar])))
    .attr("height", BARHEIGHT)
    .attr("fill", "#07648d")
  gCounty.append("text")
    .attr("x", xScaleC(formatCommaNumber(data[229][fullyVaxVar])))
    .attr("y", 95)
    .text(`Both Doses: ${data[229][fullyVaxVar]}`)
  gCounty.append("line")
    .attr("x1", xScaleC(formatCommaNumber(data[229][fullyVaxVar])))
    .attr("y1", 40)
    .attr("x2", xScaleC(formatCommaNumber(data[229][fullyVaxVar])))
    .attr("y2", 80)
    .attr("stroke", "#07648d")
    .attr("stroke-width", 2)


    // quick and dirty harris county
  svgCounty.append("text")
    .attr("x", 0)
    .attr("y", 215)
    .attr("class", "county-name")
    .text(`${data[103]["County Name"]} County`);

  gCounty.append("rect")
    .attr("width", 500)
    .attr("height", BARHEIGHT)
    .attr("fill", " #f2e4d4")
    .attr("transform", "translate(0, 200)")
  gCounty.append("text")
    .attr("x", 505)
    .attr("y", 200)
    .text(`Population 16+: ${data[103][populationVar]}`)
    gCounty.append("text")
    .attr("x", 505)
    .attr("y", 220)
    .text(`Pct with 1 dose: ${returnPercentage(data[103][atLeastOneVar], data[103][populationVar])}%`)
  gCounty.append("text")
    .attr("x", 505)
    .attr("y", 240)
    .text(`Pct with 2 dose: ${returnPercentage(data[103][fullyVaxVar], data[103][populationVar])}%`)

  gCounty.append("rect")
    .attr("width", xScaleH(formatCommaNumber(data[103][totalDoseAllocVar])))
    .attr("height", BARHEIGHT)
    .attr("fill", "#fa9441")
    .attr("transform", "translate(0, 200)")
  gCounty.append("text")
    .attr("x", xScaleH(formatCommaNumber(data[103][totalDoseAllocVar])))
    .attr("y", 195)
    .attr("fill-opacity", "50%")
    .text(`Allocated: ${data[103][totalDoseAllocVar]}`)

  gCounty.append("rect")
    .attr("width", xScaleH(formatCommaNumber(data[103][totalDoseAdminVar])))
    .attr("height", BARHEIGHT)
    .attr("fill", "#97d4ea")
    .attr("transform", "translate(0, 200)")
  gCounty.append("text")
    .attr("x", xScaleH(formatCommaNumber(data[103][totalDoseAdminVar])))
    .attr("y", 255)
    .text(`Administered: ${data[103][totalDoseAdminVar]}`)

  gCounty.append("rect")
    .attr("width", xScaleH(formatCommaNumber(data[103][atLeastOneVar])))
    .attr("height", BARHEIGHT)
    .attr("fill", "#00bde3")
    .attr("transform", "translate(0, 200)")
  gCounty.append("text")
    .attr("x", xScaleH(formatCommaNumber(data[103][atLeastOneVar])))
    .attr("y", 275)
    .text(`One Dose: ${data[103][atLeastOneVar]}`)
  gCounty.append("line")
    .attr("x1", xScaleH(formatCommaNumber(data[103][atLeastOneVar])))
    .attr("y1", 240)
    .attr("x2", xScaleH(formatCommaNumber(data[103][atLeastOneVar])))
    .attr("y2", 265)
    .attr("stroke", "#00bde3")
    .attr("stroke-dasharray", "3 1")

  gCounty.append("rect")
    .attr("width", xScaleH(formatCommaNumber(data[103][fullyVaxVar])))
    .attr("height", BARHEIGHT)
    .attr("fill", "#07648d")
    .attr("transform", "translate(0, 200)")
  gCounty.append("text")
    .attr("x", xScaleH(formatCommaNumber(data[103][fullyVaxVar])))
    .attr("y", 295)
    .text(`Both Doses: ${data[103][fullyVaxVar]}`)
  gCounty.append("line")
    .attr("x1", xScaleH(formatCommaNumber(data[103][fullyVaxVar])))
    .attr("y1", 240)
    .attr("x2", xScaleH(formatCommaNumber(data[103][fullyVaxVar])))
    .attr("y2", 280)
    .attr("stroke", "#07648d")
    .attr("stroke-width", 2)


})






