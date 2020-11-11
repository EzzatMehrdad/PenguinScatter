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
   
  var drawPlot=function(students, screen, xScale, yScale)
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
       {return yScale(getFinalgrade(students));})
      .attr("r", 5)
      .attr("fill", function()
           {
        if(getHmwAvg)
            {
                return "red"
                
            }
        else if(getFinalgrade)
            {
                return "blue"
            }
        
        else
            
            {
                return "black"
            }
        }) 
      
      .on("click", function()
         
         {
        
         d3.select("#first")
          .select("#graph1")
          .classed("hidden", false) });
  }
  
            

var initGraph=function(students)
    { 
        var screen={ width:600,height:600} 
      d3.select("#graph")
        .attr("width", screen.width)
        .attr("height", screen.height)
        
    var xScale=d3.scaleLinear()
        .domain([0,100])
        .range([0, screen.width])
    var yScale=d3.scaleLinear()
        .domain([0,100])
        .range([screen.height, 0])
    drawPlot(students, screen, xScale, yScale);
        
    }

var penguinPromise=d3.json("classData.json"); 

    
var successFCN = function(students){
    
    console.log("Student Datas", students);
    initGraph(students);
    drawPlot(students);
}

   var failFCN = function(errorMsg)
  {
    console.log(errorMSG);
  };

   
  penguinPromise.then(successFCN,failFCN);
