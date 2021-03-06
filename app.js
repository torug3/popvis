d3.csv("mydata.csv").then(function(data){

    // Variables
    var chart_width = 800
    var chart_height = 625
    var padding = 5;
    
        
    // Create SVG Element
    var svg = d3.select("#chart")   
    .append("svg")
    .attr("width", chart_width)
    .attr("height", chart_height);

    // Data
    var dataset = [ ];
    var ward_name = [ ];
    data.forEach(function(d, i){
        dataset.push(d.pop_199510);
        ward_name.push(d.ward);
        console.log(dataset);
        console.log(ward_name);
    })
    
    // Create Scales
    var x_scale         =   d3.scaleLinear()
        .domain([0, 210000])
        .range([ padding, chart_width - padding * 2 ]);
        
    var y_scale         =   d3.scaleLinear()
        .domain([ 0, d3.max(dataset, function(d){
            return d;
        })])
        .range([ chart_height, 0 ]);

    
    // Create Rectangle
    function draw_graph(){
    svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("width", 0)    
    .attr("y", function(d, i){
        return i *25;
    })
    .on("mouseover", function(d, i){
        var x = parseInt(x_scale(d));
        var y = parseInt(i*25+padding*4);
        d3.select(this)
            .style("fill","orange");
        d3.select("#tooltip")
            .style("left", x+"px")
            .style("top", y+"px")
            .style("display", "block")
            .text(d+"人");
    })
    .on("mouseout", function(){
        d3.select(this)
            .style("fill","#7ED26D");
        d3.select("#tooltip")
            .style("display", "none");
    })

    // Animation
    .transition()
    .duration(1000)
    .attr("x", padding)
    .attr("y", function(d, i){
        return i *25;
    })
    .attr("width", function(d, i){
        return x_scale(d)+"px";
    })
    .attr("height", "20px")
    .attr( 'fill', '#7ED26D');
    }
    draw_graph();

    // Create Axis
    var x_axis          =   d3.axisBottom( x_scale )
         .tickValues([ 0, 50000, 100000, 150000, 200000 ])
         .tickSize(-chart_height);
    svg.append( 'g' )
        .attr( 'class', 'x-axis' )
        .attr(
            'transform',
            'translate(0,' + (chart_height-padding*5) + ')'
        )
        .call( x_axis );

    
        
    // Create Labels (Show ward Names)
    svg.append( 'g' ).selectAll( 'text' )
    .data( ward_name )
    .enter()
    .append( 'text' )
    .attr("class", "barName")
    .text(function(d,i) {
        return ward_name[i];
    })
    .attr("x", padding*5)
    .attr("y", function(d, i){
        return (i *25+12.5);
    });


    
    // Button reaction
    d3.select("#dataSelect")
        .selectAll("input[type='button']")
        .on("click", function(){
            var Year = d3.select(this)
                        .attr("data-pop");
        dataset = [];
        ward_name = [];
        data.forEach(function(d, i){
            dataset.push(d[Year]);
            ward_name.push(d.ward);
            console.log(dataset);
            console.log(ward_name);
        })
        d3.select("#chart")
        .selectAll("*")
        .remove();
        

        // Create Scales
        var x_scale         =   d3.scaleLinear()
        .domain([0, 210000])
        .range([ padding, chart_width - padding * 2 ]);

        var y_scale         =   d3.scaleLinear()
        .domain([ 0, d3.max(dataset, function(d){
            return d;
        })])
        .range([ chart_height, 0 ]);

        var svg = d3.select("#chart")   
        .append("svg")
        .attr("width", chart_width)
        .attr("height", chart_height);
        

        svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("width", 0)    
        .attr("y", function(d, i){
            return i *25;
        })
        .on("mouseover", function(d, i){
            var x = parseInt(x_scale(d));
            var y = parseInt(i*25+padding*4);
            d3.select(this)
                .style("fill","orange");
            d3.select("#tooltip")
                .style("left", x+"px")
                .style("top", y+"px")
                .style("display", "block")
                .text(d+"人");
        })
        .on("mouseout", function(){
            d3.select(this)
                .style("fill","#7ED26D");
            d3.select("#tooltip")
                .style("display", "none");
        })

        // Animation
        .transition()
        .duration(1000)
        .attr("x", padding)
        .attr("y", function(d, i){
            return i *25;
        })
        .attr("width", function(d, i){
            return x_scale(d)+"px";
        })
        .attr("height", "20px")
        .attr( 'fill', '#7ED26D');


        // Create Axis
        var x_axis          =   d3.axisBottom( x_scale )
            .tickValues([ 0, 50000, 100000, 150000, 200000 ])
            .tickSize(-chart_height);
        svg.append( 'g' )
            .attr( 'class', 'x-axis' )
            .attr(
                'transform',
                'translate(0,' + (chart_height-padding*5) + ')'
            )
            .call( x_axis );

        
            
        // Create Labels (Show ward Names)
        svg.append( 'g' ).selectAll( 'text' )
        .data( ward_name )
        .enter()
        .append( 'text' )
        .attr("class", "barName")
        .text(function(d,i) {
            return ward_name[i];
        })
        .attr("x", padding*5)
        .attr("y", function(d, i){
            return (i *25+12.5);
        });


        
    })


});

