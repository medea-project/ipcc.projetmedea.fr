within("projetmedea.fr", function(publish, subscribe){

  var
    forEach = this.forEach,

    chartsBox = document.getElementById("svg-charts"),

    CHART_BACKGROUND_COLOR = "white",

    // margins around the chart, in tiles
    TOP_MARGIN = 1,
    BOTTOM_MARGIN = 1,
    LEFT_MARGIN = 1,
    RIGHT_MARGIN = 1,

    // margin between chart and shapes, in tiles
    HEADING_MARGIN = 1,

    // line height of the chart heading and subheading, in pixels
    CHART_HEADING_LINE_HEIGHT = 20,
    CHART_SUBHEADING_LINE_HEIGHT = 20,

    // size of a tile in pixels
    TILE_WIDTH = 6,
    TILE_HEIGHT = 6,

    // radius of the circle drawn in a tile
    CIRCLE_RADIUS = 1.5;

  function drawShape(svg, shape){
    var g = svg.append("g");
    g.attr("fill", shape.color);
    g.append("title").text(shape.name);
    forEach(shape.tiles, function(tile){
      var
        circle = g.append("circle"),
        centerTop = ( TOP_MARGIN + tile[0] + 0.5 ) * TILE_HEIGHT,
        centerLeft = ( LEFT_MARGIN + tile[1] + 0.5 ) * TILE_WIDTH;
      circle.attr("r", CIRCLE_RADIUS);
      circle.attr("cx", centerLeft);
      circle.attr("cy", centerTop);
    });
  }

  function renderChart(chart){
    var
      svg = d3.select(chartsBox).append("svg"),
      width = (LEFT_MARGIN + chart.width + RIGHT_MARGIN) * TILE_WIDTH,
      headingTop = (TOP_MARGIN + chart.height + HEADING_MARGIN) * TILE_HEIGHT,
      height =
        headingTop +
        CHART_HEADING_LINE_HEIGHT +
        CHART_SUBHEADING_LINE_HEIGHT +
        BOTTOM_MARGIN * TILE_HEIGHT,
      background = svg.append("rect"),
      headingMiddleX = width / 2,
      headingBaselineY = headingTop + CHART_HEADING_LINE_HEIGHT,
      heading = svg.append("text"),
      subheadingMiddleX = headingMiddleX,
      subheadingBaselineY = headingBaselineY + CHART_SUBHEADING_LINE_HEIGHT,
      subheading = svg.append("text");

    heading.text(chart.heading);
    heading.attr("text-anchor", "middle");
    heading.attr("x", headingMiddleX);
    heading.attr("y", headingBaselineY);

    subheading.text(chart.subheading);
    subheading.attr("text-anchor", "middle");
    subheading.attr("x", subheadingMiddleX);
    subheading.attr("y", subheadingBaselineY);

    // TODO: increase width to ensure that the heading and subheading fit
    // while offsetting the left of the chart accordingly to keep it centered
    svg.attr("width", width);
    svg.attr("height", height);

    background.attr("width", width);
    background.attr("height", height);
    background.attr("fill", CHART_BACKGROUND_COLOR);

    forEach(chart.shapes, function(shape){
      drawShape(svg, shape);
    });
  }

  function renderCharts(charts){
    chartsBox.innerHTML = "";
    forEach(charts, renderChart);
    publish("svg-rendered", chartsBox.innerHTML);
  }

  subscribe("plot", renderCharts);

});
