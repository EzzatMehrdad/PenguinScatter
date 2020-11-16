var getGrade=function(john){

    return john.grade;     
}

var getQuizeAverage=function(bStudent)
{
    var Qstut=bStudent.quizes; 
    
    var ScoreQ=Qstut.map(getGrade); 
    var avg=d3.mean(ScoreQ);
    return avg.toFixed(2);     
}

var getHmwAvg=function(bStudent){
    
    var Hstud=bStudent.homework; 
    var HomeScore=Hstud.map(getGrade);
    var avg=d3.mean(HomeScore); 
    return avg.toFixed(2);};

var getFinalgrade=function(bStudent){

     return bStudent.final[0].grade; 
}
   
  var drawPlot1=function(students, screen, xScale, yScale)
  {
    d3.select("#graph1")
      .selectAll("circle")
      .data(students)
      .enter()
      .append("circle")
      .attr("cx", function(students)
            {
        return xScale(getHmwAvg(students));})
           
      .attr("cy", function(students)
       {return yScale(getQuizeAverage(students));})
      .attr("r", 5)
      .attr("fill", function()
           {
        if(getHmwAvg)
            {
                return "red"
                
            }
        else if(getQuizeAverage)
            {
                return "blue"
            }
        
        else
            {
                return "black"
            }
        }) }

            
 var drawPlot2=function(students, screen, xScale, yScale)
  {
    d3.select("#graph2")
      .selectAll("circle")
      .data(students)
      .enter()
      .append("circle")
      .attr("cx", function(students)
            {
        return xScale(getHmwAvg(students));})
           
      .attr("cy", function(students)
       {return yScale(getFinalgrade(students));})
      .attr("r", 5)
      .attr("fill", function()
           {
        if(getHmwAvg)
            {
                return "yellow"
                
            }
        else if(getFinalgrade)
            {
                return "blue"
            }
        
        else
            
            {
                return "black"
            }
        }) }   
  
var initGraph1=function(students)
    { 
        var screen={ width:400,height:300} 
      d3.select("#graph1")
        .attr("width", screen.width)
        .attr("height", screen.height)
        
    var xScale=d3.scaleLinear()
        .domain([0,100])
        .range([0, screen.width])
    var yScale=d3.scaleLinear()
        .domain([0,100])
        .range([screen.height, 0])
    drawPlot1(students, screen, xScale, yScale);
        
    };

var initGraph2=function(students)
    { 
        var screen={ width:300,height:400} 
      d3.select("#graph2")
        .attr("width", screen.width)
        .attr("height", screen.height)
        
    var xScale=d3.scaleLinear()
        .domain([0,100])
        .range([0, screen.width])
    var yScale=d3.scaleLinear()
        .domain([0,100])
        .range([screen.height, 0])
    drawPlot2(students, screen, xScale, yScale);
        
    };

var initTwoGraphs=function(students)
{
    
    d3.select("#first")
.on("click", function()
   {
    d3.select("#graph1")
        .classed("hidden", false);
} )   

d3.select("#second")
    .on("click", function(){
       d3.select("#graph2")
        .classed("hidden", false);
})
}
var penguinPromise=d3.json("classData.json"); 

    
var successFCN = function(students){
    
    console.log("Student Datas", students);
    initGraph1(students);
    initGraph2(students);
    drawPlot1(students);
    drawPlot2(students);
    initTwoGraphs(students);
}

   var failFCN = function(errorMsg)
  {
    console.log(errorMSG);
  };

  penguinPromise.then(successFCN,failFCN);
