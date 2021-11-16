import { Component, OnInit,Input,OnChanges, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import * as xyz from '../data/XYZ.json';
// import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import { attr } from 'highcharts';
import { UnitModel, NewUnit } from '../shared/models/unit';
import {
  SimulatorInput,
  SimulatedSummary,
  SimulatedArray,
} from '../shared/models/input';
import { Observable, of, from, BehaviorSubject, combineLatest,ReplaySubject } from 'rxjs';
import { ApiService } from '../shared/services/api.service';
import { PriceScenarioService } from '../shared/services/price-scenario.service';
import { FormControl,FormGroup } from '@angular/forms';
import {
  distinct,
  distinctUntilChanged,
  map,
  reduce,
  filter,
  tap,
} from 'rxjs/operators';
import * as Utils from '../shared/utils/utils'
// import { threadId } from 'worker_threads';
// import { debug } from 'console';
// import { debug } from 'console';
// import { debug } from 'console';
// import * as d3Shape from 'd3-shape';
// import * as d3Array from 'd3-array';
// import * as d3Axis from 'd3-axis';
// import * as d3AxisLeft from 'd3-axis';
// import * as csv from ''

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit,OnChanges {
  @Input() product:any;
  public dropChnages:any=[];
  title = 'Line Chart';
  simulated : SimulatedArray;
  totalSimulated : SimulatedArray[]= []
  x0:any;
  x1:any;
  y1: any;
  z: any;
  g: any;
  height: any;
  width: any;
  xAxisGroup: any;
  yAxisGroup: any;
  text1: any;
  text2: any;
  rect: any; 
  legend: any
  abs = "ABS Change"
  per = "% Change"
  decimalFormat = '1.0-1';
  data: any[] = [
    { date: new Date('2010-01-01'), value: 80 },
    { date: new Date('2010-01-04'), value: 90 },
    { date: new Date('2010-01-05'), value: 95 },
    { date: new Date('2010-01-06'), value: 100 },
    { date: new Date('2010-01-07'), value: 110 },
    { date: new Date('2010-01-08'), value: 120 },
    { date: new Date('2010-01-09'), value: 130 },
    { date: new Date('2010-01-10'), value: 140 },
    { date: new Date('2010-01-11'), value: 150 },
  ];
   totalSelectedValues = {
    key:'',
    cateory:[ "G",
    "u",
    "m"],
    absolute_change: {
      "cogs": 0,
      "lsv": 0,
      "mac": 0,
      "mac_percent_nsv": 0,
      "nsv": 0,
      "nsv_tonnes": 0,
      "rp": 0,
      "rp_percent_rsv": 0,
      "rsv": 0,
      "te": 0,
      "te_percent_lsv": 0,
      "te_units": 0,
      "tonnes": 0,
      "units": 0
  },
  percent_change: {
    "cogs": 0,
    "lsv": 0,
    "mac": 0,
    "mac_percent_nsv": 0,
    "nsv": 0,
    "nsv_tonnes": 0,
    "rp": 0,
    "rp_percent_rsv": 0,
    "rsv": 0,
    "te": 0,
    "te_percent_lsv": 0,
    "te_units": 0,
    "tonnes": 0,
    "units": 0
},
current: {
  "cogs": 0,
  "lsv": 0,
  "mac": 0,
  "mac_percent_nsv": 0,
  "nsv": 0,
  "nsv_tonnes": 0,
  "rp": 0,
  "rp_percent_rsv":0,
  "rsv":0,
  "te": 0,
  "te_percent_lsv": 0,
  "te_units":0,
  "tonnes": 0,
  "units": 0,
},
simulated: {
"cogs": 0,
"lsv":0,
"mac":0,
"mac_percent_nsv": 0,
"nsv": 0,
"nsv_tonnes": 0,
"rp": 0,
"rp_percent_rsv": 0,
"rsv": 0,
"te": 0,
"te_percent_lsv":0,
"te_units": 0,
"tonnes": 0,
"units": 0,
},
retailer: {
"cogs_$_chg": 0,
"cogs_increase_percent": 0,
"competition": "Not Follows",
"gmac_lsv_per_unit": 0,
"lpi_percent": 0,
"mars_cogs_per_unit":0,
"mars_cogs_per_unit_new": 0,
"mars_mac": 0,
"mars_mac_$_chg": 0,
"mars_mac_new": 0,
"mars_mac_percent_of_nsv": 0,
"mars_mac_percent_of_nsv_new":0,
"mars_net_invoice_price": 0,
"mars_net_invoice_price_new":0,
"mars_nrv":0,
"mars_nrv_new":0,
"mars_nsv":0,
"mars_nsv_new": 0,
"mars_off_invoice": 0,
"mars_off_invoice_new":0,
"mars_on_invoice":0,
"mars_on_invoice_new":0,
"mars_percent_of_total_profit_pool": 0,
"mars_percent_of_total_profit_pool_new":0,
"mars_total_net_invoice_price":0,
"mars_total_net_invoice_price_new": 0,
"mars_total_nrv":0,
"mars_total_nrv_new": 0,
"mars_total_off_invoice":0,
"mars_total_off_invoice_new":0,
"mars_total_on_invoice": 0,
"mars_total_on_invoice_new": 0,
"new_base_units":0,
"nsv_$_chg": 0,
"off_inv_percent_new":0,
"on_inv_percent_new": 0,
"percent_cogs_$_chg": 0,
"percent_mars_mac_$_chg": 0,
"percent_nsv_$_chg": 0,
"percent_retailer_margin_$_chg": 0,
"percent_rsv_w_o_vat_$_chg": 0,
"percent_trade_expense_$_chg": 0,
"product_group_weight_in_grams_new": 0,
"retailer_margin":0,
"retailer_margin_$_chg": 0,
"retailer_margin_new": 0,
"retailer_margin_percent_of_rsp": 0,
"retailer_margin_percent_of_rsp_new": 0,
"retailer_mark_up": 0,
"retailer_mark_up_new": 0,
"retailer_percent_of_total_profit_pool":0,
"retailer_percent_of_total_profit_pool_new":0,
"rsp_increase_percent": 0,
"rsv_w_o_vat_$_chg": 0,
"suggested_list_price": 0,
"suggested_retailer_median_base_price_w_o_vat": 0,
"total_cogs": 0,
"total_cogs_new": 0,
"total_lsv": 0,
"total_lsv_new": 0,
"total_nsv":0,
"total_nsv_new": 0,
"total_rsv": 0,
"total_rsv_w_o_vat":0,
"total_rsv_w_o_vat_new":0,
"total_weight_in_tons": 0,
"total_weight_in_tons_new":0,
"tpr_budget": 0,
"tpr_budget_new": 0,
"tpr_budget_new_nrv": 0,
"tpr_budget2": 0,
"tpr_percent_new": 0,
"trade_expense": 0,
"trade_expense_$_chg": 0,
"trade_expense_new": 0,
},
}
  // private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  // private width: number;
  // private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3.Line<[number, number]>; // this is line defination
  sorted = []
  sorted2 = []
  MARGIN = { top: 10, right: 5, bottom: 10, left: 5 };
  WIDTH = 200 - this.MARGIN.left - this.MARGIN.right;
  HEIGHT = 300 - this.MARGIN.top - this.MARGIN.bottom;
  DATA = [
    [
      {
        year: '2011w',
        value: 6940,
      },
      {
        year: '201w2',
        value: 1636,
      },
      {
        year: '20w13',
        value: 4157,
      },
      {
        year: '2w014',
        value: 1869,
      },
      {
        year: 'w2015',
        value: 2288,
      },
      {
        year: '2016w',
        value: 2783,
      },
    ],
  ];
  total_rsv = 0;
  total_rsv_new = 0;
  total_lsv = 0;
  total_lsv_new = 0;
  total_trade_expense = 0;
  total_trade_expense_new = 0;
  total_nsv = 0;
  total_nsv_new = 0;
  total_cogs = 0;
  total_cogs_new = 0;
  total_mars_mac = 0;
  total_mars_mac_new = 0;
  total_retailer_margin = 0;
  total_retailer_margin_new = 0;
  total_base_units = 0;
  total_weight_in_tons = 0;
  rsv_w_o_vat_$_chg = 0;
  trade_expense_$_chg = 0;
  nsv_$_chg = 0;
  cogs_$_chg = 0;
  mars_mac_$_chg = 0;
  retailer_margin_$_chg = 0;
  rsv_w_o_vat_$_chg_percent = 0;
  trade_expense_$_chg_percent = 0;
  nsv_$_chg_percent = 0;
  cogs_$_chg_percent = 0;
  mars_mac_$_chg_percent = 0;
  retailer_margin_$_chg_percent = 0;

  tableData$: Observable<NewUnit[]>;
  filters: any;
  units: NewUnit[];
  constructor(private apiservice: ApiService,private priceScenarioService : PriceScenarioService) {
    //   this.width = 960 - this.margin.left - this.margin.right;
    //   this.height = 500 - this.margin.top - this.margin.bottom;
  }

  
  ngOnInit(): void {

    
// starting
this.retailers.valueChanges.subscribe(data=>{
  console.log(this.combination , "COMBINATON")
  console.log(data , " RETAILERS ")
  if(data && data.length > 0){
    let filtered = this.combination.filter(d=>data.includes(d.retailer))
   this.filteredProducts.next([...new Set(filtered.map(d=>d.product_group))])
   this.filteredCategories.next([...new Set(filtered.map(d=>d.category))])
  }
  console.log(this.filteredProducts , " filtered products ")
  console.log(this.filteredCategories , " filtered categories ")
})

  this.retailersFilterCtrl.valueChanges
      .subscribe((d) => {
      });
      this.productsFilterCtrl.valueChanges
      .subscribe((d) => {
       
      });
      this.categoriesFilterCtrl.valueChanges
      .subscribe((d) => {
      });
this.tableData$ = this.priceScenarioService.getUnits();
this.tableData$.subscribe((data: NewUnit[]
  ) => {
    console.log(data , "UNITSSSSSSSSSSSSSSSS")
    this.units = data;
    // setTimeout(()=>{
      // setInterval(()=>{
      this.dropChnages = [...new Set(data.map(item => item.product_group))];
      // debugger

    // } ,5000)

    // this.dropChnages = [...new Set(data.map(item => item.product_group))];

    console.log("dropValues",this.dropChnages)
 
});
// this.applyFilter();
this.priceScenarioService.getInitUnits().
pipe(
  filter(data => data.length > 0)
).subscribe(data=>{
  this.populateFilter( data);
})


// ending


    this.rangeChart();
 
    this.tableData$ =   
    this.priceScenarioService.getNewChange();
    this.rawData();
    
   

    
      // // this.draw()
      // setTimeout(()=>{
      //   // this.draw(this.getData2())
      //   this.update(this.getData2(),x0,x1,y,g,height,width,z,svg,xAxisGroup,yAxisGroup,text1,text2,rect,legend)
      // },5000)

  
   
  }
 rawData(){
  this.priceScenarioService.getSimulatedArray().subscribe(data=>{
    this.totalSimulated= data;
    this.simulated =  (data as SimulatedArray[]).find(d=>d.key == "ALL")
    console.log("key values", data)
    this.update(this.getData1(),this.x0,this.x1,this.y,this.g,this.height,this.width,this.z,this.svg,this.xAxisGroup,this.yAxisGroup,this.text1,this.text2,this.rect ,this.legend)
    this.update2(this.getData3(),this.x02,this.x12,this.y2,this.g2,this.height2,this.width2,this.z2,this.svg2,this.xAxisGroup2,this.yAxisGroup2,this.text12,this.text22,this.rect2 ,this.legend2)
 
   })
 }
  rangeChart(){
    let ele = '#my_dataviz'
    let ele2 = '#my_dataviz2'
    var margin = { top: 20, right: 20, bottom: 30, left: 10 }
    this.width = 890 - margin.left - margin.right,
    this.height = 300 - margin.top - margin.bottom;
    var margin2 = { top: 20, right: 20, bottom: 30, left: 10 }
    this.width2 = 200 - margin2.left - margin2.right,
    this.height2 = 300 - margin2.top - margin2.bottom;

    
this.svg = d3.select(ele).append("svg")
.attr("width",  this.width+ margin.left + margin.right)
.attr("height", this.height + margin.top + margin.bottom)

this.svg2 = d3.select(ele2).append("svg")
.attr("width", this.width2 + margin2.left + margin2.right)
.attr("height", this.height2 + margin2.top + margin2.bottom)
this.g = this.svg.append("g")
.attr("transform", "translate(" + margin.left + "," +  margin.top + ")");

this.g2 = this.svg2.append("g")
.attr("transform", "translate(" + margin2.left + "," +  margin2.top + ")");
 

this.x0 = d3.scaleBand()
.rangeRound([0, this.width])
.paddingInner(0.1);

this.x02 = d3.scaleBand()
.rangeRound([0, this.width2])
.paddingInner(0.1);

this.x1 = d3.scaleBand()
.padding(0.05);

this.x12 = d3.scaleBand()
.padding(0.05);

    this.y =  d3.scaleLinear()
    .rangeRound([this.height, 0]);

    this.y2 =  d3.scaleLinear()
    .rangeRound([this.height2, 0]);

    this.z = d3.scaleOrdinal()
    .range(["var(--color-blue-1)","var(--color-amber-1)"]);
    this.z2 = d3.scaleOrdinal()
    .range(["var(--color-blue-1)","var(--color-amber-1)"]);
   

    this.xAxisGroup =  this.g.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + this.height + ")")

    this.xAxisGroup2 =  this.g2.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + this.height2 + ")")

    this.yAxisGroup =   this.g.append("g")
    .attr("class", "axis")

    this.yAxisGroup2 =   this.g2.append("g")
    .attr("class", "axis")
    this.text1 =   this.g.append('g')
    this.text2 =  this.g.append('g') 

   this.text12 =   this.g2.append('g') 
   this.text22 = this.g2.append('g') 

   
   this.rect = this.g.append("g")
   .selectAll("g")
   this.rect2 = this.g2.append("g")
   .selectAll("g")
    // console.log(d3.range(5) , "RANGE")
     this.legend = this.g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            this.legend2 = this.g2.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
  }
  draw(data){

  
   

    
   
  }
  update(data,x0,x1,y,g,height,width,z,svg , xAxisGroup,yAxisGroup,text1,text2,rects , legend):any{
    g.selectAll("rect")
    .remove()
    .exit()
    .data(data)	

   
    text1.selectAll("text")
    .remove()
    .exit()
    .data(data)	
    text2.selectAll("text")
    .remove()
    .exit()
    .data(data)	
    

    var keys = Object.keys(data[0]).slice(1);
    x0.domain(data.map(function (d) { return d.State; }));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    
    y.domain([0, d3.max(data,
       function (d) { return d3.max(keys, function (key) { return d[key]; }); })]).nice();

      


  
   
  rects.data(data).enter().append("g")
  .attr("transform", function (d) { return "translate(" + x0(d.State) + ",0)"; })
  .selectAll("rect")
  .data(function (d) { return keys.map(function (key) { return { key: key, value: d[key] }; }); })
  .enter().append("rect")
  .attr("x", function (d) { return x1(d.key); })
  .attr("y", function (d) { return y(d.value); })
  .attr("width", x1.bandwidth())
  .attr("height", function (d) { return height - y(d.value); })
  .attr("fill", function (d) { return z(d.key); });


  xAxisGroup.call(d3.axisBottom(x0));
 
  var legend = g.append("g")
  .attr("class", "legend")
  .attr("font-family", "sans-serif")
  .attr("font-size", 10)
  .attr("text-anchor", "end")

            .selectAll("g")
            .data(keys.slice().reverse())
            .enter().append("g")
            .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("x", width - 19)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", z);

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(function (d) { return d; });


          text1.selectAll("text")
          
            .data(data)
            .enter()
            .append('text')
            .text(function(d){
              return Utils.convertCurrency(d.Base)
            } )
            .attr('x', function(d,i){
              // debugger
              
              return x0(d.State) + 10
            } )
            .attr('y', function(d,i){
              console.log(d,i , "TEXYT")
              
              return y(d.Base) - 10
            })
            .style('fill' , function(data){
                   return 'black'
            })
            .style('font-size' , '12px') 
           
           text2
           .selectAll("text")
            .data(data)
            .enter()
            .append('text')
            .text(function(d){

               return Utils.convertCurrency(d.Simulated)
            }  )
            .attr('x', function(d,i){
             
              return x0(d.State) + x1.bandwidth() + 10
            } )
            .attr('y', function(d,i){
              console.log(d,i , "TEXYT")
              
              return y(d.Simulated) -10
            })
            .style('fill' , function(data){
                   return 'black'
            })
            .style('font-size' , '12px') 
           

  }
  update2(data,x0,x1,y,g,height,width,z,svg , xAxisGroup,yAxisGroup,text1,text2,rects , legend){
    g.selectAll("rect")
    .remove()
    .exit()
    .data(data)	
    // rects.selectAll("rect").remove().exit().data(data)	
    
    text1.selectAll("text")
    .remove()
    .exit()
    .data(data)	
    text2.selectAll("text")
    .remove()
    .exit()
    .data(data)	
  
    



    var keys = Object.keys(data[0]).slice(1);
    x0.domain(data.map(function (d) { return d.State; }));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    
    y.domain([0, d3.max(data,
       function (d) { return d3.max(keys, function (key) { return d[key]; }); })]).nice();

      

       rects.data(data).enter().append("g")
       .attr("transform", function (d) { return "translate(" + x0(d.State) + ",0)"; })
       .selectAll("rect")
       .data(function (d) { return keys.map(function (key) { return { key: key, value: d[key] }; }); })
       .enter().append("rect")
       .attr("x", function (d) { return x1(d.key); })
       .attr("y", function (d) { return y(d.value); })
       .attr("width", x1.bandwidth())
       .attr("height", function (d) { return height - y(d.value); })
       .attr("fill", function (d) { return z(d.key); });


  xAxisGroup.call(d3.axisBottom(x0));


         
  text1.selectAll("text")
          
  .data(data)
  .enter()
  .append('text')
  .text(function(d){
    console.log(Utils.convertCurrency(d.Base) , "Utils.convertCurrency(d.Base)")
    return Utils.convertCurrency(d.Base,d.State)
  } )
  .attr('x', function(d,i){
    // debugger
    
    return x0(d.State) + 10
  } )
  .attr('y', function(d,i){
    console.log(d,i , "TEXYT")
    
    return y(d.Base) - 10
  })
  .style('fill' , function(data){
         return 'black'
  })
  .style('font-size' , '12px') 
 
 text2
 .selectAll("text")
  .data(data)
  .enter()
  .append('text')
  .text(function(d){
    console.log(Utils.convertCurrency(d.Simulated) , "Utils.convertCurrency(d.Simulated")
     return Utils.convertCurrency(d.Simulated,d.State)
  }  )
  .attr('x', function(d,i){
   
    return x0(d.State) + x1.bandwidth() + 10
  } )
  .attr('y', function(d,i){
    console.log(d,i , "TEXYT")
    
    return y(d.Simulated) -10
  })
  .style('fill' , function(data){
         return 'black'
  })
  .style('font-size' , '12px') 
 

  }

  getData3(){
    return [
      {
          "State": "Volume(in Tonnes)",
          
          "Base": Math.ceil(this.simulated.current.tonnes),
          "Simulated":  Math.ceil(this.simulated.simulated.tonnes),
         
       }]
  }
  multiGetDataVol(){
    return [
      {
          "State": "Volume(in Tonnes)",
          
          "Base": Math.ceil(this.totalSelectedValues.current.tonnes),
          "Simulated":  Math.ceil(this.totalSelectedValues.simulated.tonnes),
         
       }]
  }
  getData1(){
    console.log("simulated value", this.simulated);
     if(typeof this.simulated !== "undefined"){
       console.log("Base"+ Math.ceil(this.simulated.current.rsv),
       "Simulated"+ Math.ceil(this.simulated.simulated.rsv));
    let d = [
    //   {
    //     "State": "Volume",
        
    //     "Base": Math.ceil(this.simulated.current.tonnes),
    //     "Simulated":  Math.ceil(this.simulated.simulated.tonnes),
       
    //  },
     {
      "State": "RSV w/o VAT",
     
      "Base":  Math.ceil(this.simulated.current.rsv),
      "Simulated":  Math.ceil(this.simulated.simulated.rsv),
  
   },
   {
    "State": "Customer Margin",
   
    "Base":  Math.ceil(this.simulated.current.rp),
    "Simulated":  Math.ceil(this.simulated.simulated.rp),
 
 },
      {
         "State": "LSV",
         
         "Base": Math.ceil(this.simulated.current.lsv),
         "Simulated":  Math.ceil(this.simulated.simulated.lsv),
        
      },
    
      {
         "State": "Trade Expense",
        
         "Base":  Math.ceil(this.simulated.current.te),
         "Simulated":  Math.ceil(this.simulated.simulated.te),
        
      },
      {
         "State": "Net Sales Value",
       
         "Base": Math.ceil(this.simulated.current.nsv),
         "Simulated":  Math.ceil(this.simulated.simulated.nsv),
        
      },
      {
        "State": "MARS MAC",
       
        "Base":  Math.ceil(this.simulated.current.mac),
        "Simulated":  Math.ceil(this.simulated.simulated.mac),
      
     },
      {
         "State": "COGS",
         
         "Base":  Math.ceil(this.simulated.current.cogs ),
         "Simulated":  Math.ceil(this.simulated.simulated.cogs ),
        
      },
   
     
   ]
    // console.log(JSON.parse(vals) , "JSON VALUE ")
    console.log(d , "GENERATED VALUE")
    return d
    }
  }
  multiGetData(){
    console.log("simulated value", this.totalSelectedValues);
     if(typeof this.simulated !== "undefined"){
       console.log("Base"+ Math.ceil(this.totalSelectedValues.current.rsv),
       "Simulated"+ Math.ceil(this.totalSelectedValues.simulated.rsv));
    let d = [
    //   {
    //     "State": "Volume",
        
    //     "Base": Math.ceil(this.simulated.current.tonnes),
    //     "Simulated":  Math.ceil(this.simulated.simulated.tonnes),
       
    //  },
     {
      "State": "RSV w/o VAT",
     
      "Base":  Math.ceil(this.totalSelectedValues.current.rsv),
      "Simulated":  Math.ceil(this.totalSelectedValues.simulated.rsv),
  
   },
   {
    "State": "Customer Margin",
   
    "Base":  Math.ceil(this.totalSelectedValues.current.rp),
    "Simulated":  Math.ceil(this.totalSelectedValues.simulated.rp),
 
 },
      {
         "State": "LSV",
         
         "Base": Math.ceil(this.totalSelectedValues.current.lsv),
         "Simulated":  Math.ceil(this.totalSelectedValues.simulated.lsv),
        
      },
    
      {
         "State": "Trade Expense",
        
         "Base":  Math.ceil(this.totalSelectedValues.current.te),
         "Simulated":  Math.ceil(this.totalSelectedValues.simulated.te),
        
      },
      {
         "State": "Net Sales Value",
       
         "Base": Math.ceil(this.totalSelectedValues.current.nsv),
         "Simulated":  Math.ceil(this.totalSelectedValues.simulated.nsv),
        
      },
      {
        "State": "MARS MAC",
       
        "Base":  Math.ceil(this.totalSelectedValues.current.mac),
        "Simulated":  Math.ceil(this.totalSelectedValues.simulated.mac),
      
     },
      {
         "State": "COGS",
         
         "Base":  Math.ceil(this.totalSelectedValues.current.cogs ),
         "Simulated":  Math.ceil(this.totalSelectedValues.simulated.cogs ),
        
      },
   
     
   ]
    // console.log(JSON.parse(vals) , "JSON VALUE ")
    console.log(d , "GENERATED VALUE")
    return d
    }
  }
  getData2(){
    let num = -1000000000;
    let num2 = -1000000000;
    if(typeof this.simulated !== "undefined"){
    // var vals = '[{"State":"CA","Under 5 Years":2704659,"5 to 13 Years":4499890,"14 to 17 Years":2159981,"18 to 24 Years":3853788,"25 to 44 Years":10604510,"45 to 64 Years":8819342,"65 Years and Over":4114496},{"State":"TX","Under 5 Years":2027307,"5 to 13 Years":3277946,"14 to 17 Years":1420518,"18 to 24 Years":2454721,"25 to 44 Years":7017731,"45 to 64 Years":5656528,"65 Years and Over":2472223},{"State":"NY","Under 5 Years":1208495,"5 to 13 Years":2141490,"14 to 17 Years":1058031,"18 to 24 Years":1999120,"25 to 44 Years":5355235,"45 to 64 Years":5120254,"65 Years and Over":2607672},{"State":"FL","Under 5 Years":1140516,"5 to 13 Years":1938695,"14 to 17 Years":925060,"18 to 24 Years":1607297,"25 to 44 Years":4782119,"45 to 64 Years":4746856,"65 Years and Over":3187797},{"State":"IL","Under 5 Years":894368,"5 to 13 Years":1558919,"14 to 17 Years":725973,"18 to 24 Years":1311479,"25 to 44 Years":3596343,"45 to 64 Years":3239173,"65 Years and Over":1575308},{"State":"PA","Under 5 Years":737462,"5 to 13 Years":1345341,"14 to 17 Years":679201,"18 to 24 Years":1203944,"25 to 44 Years":3157759,"45 to 64 Years":3414001,"65 Years and Over":1910571}]';
    let d = [
      
      //   {
      //     "State": "Volume",
          
      //     "Base": Math.ceil(this.simulated.current.tonnes),
      //     "Simulated":  Math.ceil(this.simulated.simulated.tonnes),
         
      //  },
    //    {
    //     "State": "RSV w/o VAT",
       
    //     "Base":  Math.ceil(this.simulated.current.rsv) + num ,
    //     "Simulated":  Math.ceil(this.simulated.simulated.rsv)+ num2,
    
    //  },
     {
      "State": "Customer Margin",
     
      "Base":  Math.ceil(this.simulated.current.rp) + num,
      "Simulated":  Math.ceil(this.simulated.simulated.rp) + num2,
   
   },
        {
           "State": "LSV",
           
           "Base": Math.ceil(this.simulated.current.lsv) + num,
           "Simulated":  Math.ceil(this.simulated.simulated.lsv) + num2,
          
        },
      
        {
           "State": "Trade Expense",
          
           "Base":  Math.ceil(this.simulated.current.te) + num,
           "Simulated":  Math.ceil(this.simulated.simulated.te) + num2,
          
        },
        {
           "State": "Net Sales Value",
         
           "Base": Math.ceil(this.simulated.current.nsv) + num,
           "Simulated":  Math.ceil(this.simulated.simulated.nsv) + num2,
          
        },
        {
          "State": "MARS MAC",
         
          "Base":  Math.ceil(this.simulated.current.mac) + num,
          "Simulated":  Math.ceil(this.simulated.simulated.mac) + num2,
        
       },
        {
           "State": "COGS",
           
           "Base":  Math.ceil(this.simulated.current.cogs ) + num ,
           "Simulated":  Math.ceil(this.simulated.simulated.cogs ) + num2,
          
        },
     
       
     ]
      // console.log(JSON.parse(vals) , "JSON VALUE ")
      console.log(d , "GENERATED VALUE getdata2")
      return d
  
  }
  }


//   draw(){

//     let ele = '#my_dataviz'
//     var margin = {top: 20, right: 20, bottom: 30, left: 40},
//     width = 960 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom;
 

// var x0 = d3.scaleBand()
// .domain([0,6])
// .range([0, width], .2);

// var x1 = d3.scaleBand()
//     .domain([0,5])
//     .range([0, x0.bandwidth() - 10]);

//     var y = d3.scaleLinear()
//     .domain([0, 1])
//     .range([height, 0]);

// var xAxis = d3.svg.axis()
//     .scale(x0)
//     .tickSize(0)
//     .orient("bottom");

// var yAxis = d3.svg.axis()
//     .scale(y)
//     .orient("left");

// var color = d3.scaleOrdinal()
//     .range(["#ca0020","#f4a582","#d5d5d5","#92c5de","#0571b0"]);

// var svg = d3.select(ele).append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// // d3.json("data.json", function(error, data) {
//  let data = this.getData1()
//   var categoriesNames = data.map(function(d) { return d.categorie; });
//   var rateNames = data[0].values.map(function(d) { return d.rate; });

//   x0.domain(categoriesNames);
//   x1.domain(rateNames).rangeRound([0, x0.rangeBand()]).padding(0.1);
//   y.domain([0, d3.max(data, function(categorie) { return d3.max(categorie.values, function(d) { return d.value; }); })]);

//   svg.append("g")
//       .attr("class", "x axis")
//       .attr("transform", "translate(0," + height + ")")
//       .call(xAxis);

//   svg.append("g")
//       .attr("class", "y axis")
//       .style('opacity','0')
//       .call(yAxis)
//   .append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 6)
//       .attr("dy", ".71em")
//       .style("text-anchor", "end")
//       .style('font-weight','bold')
//       .text("Value");

//   svg.select('.y').transition().duration(500).delay(1300).style('opacity','1');

//   var slice = svg.selectAll(".slice")
//       .data(data)
//       .enter().append("g")
//       .attr("class", "g")
//       .attr("transform",function(d) { return "translate(" + x0(d.categorie) + ",0)"; });

//   slice.selectAll("rect")
//       .data(function(d) { return d.values; })
//   .enter().append("rect")
//       .attr("width", x1.rangeBand())
//       .attr("x", function(d) { return x1(d.rate); })
//       .style("fill", function(d) { return color(d.rate) })
//       .attr("y", function(d) { return y(0); })
//       .attr("height", function(d) { return height - y(0); })
//       .on("mouseover", function(d) {
//           d3.select(this).style("fill", d3.rgb(color(d.rate)).darker(2));
//       })
//       .on("mouseout", function(d) {
//           d3.select(this).style("fill", color(d.rate));
//       });

//   slice.selectAll("rect")
//       .transition()
//       .delay(function (d) {return Math.random()*1000;})
//       .duration(1000)
//       .attr("y", function(d) { return y(d.value); })
//       .attr("height", function(d) { return height - y(d.value); });

//   //Legend
//   var legend = svg.selectAll(".legend")
//       .data(data[0].values.map(function(d) { return d.rate; }).reverse())
//   .enter().append("g")
//       .attr("class", "legend")
//       .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
//       .style("opacity","0");

//   legend.append("rect")
//       .attr("x", width - 18)
//       .attr("width", 18)
//       .attr("height", 18)
//       .style("fill", function(d) { return color(d); });

//   legend.append("text")
//       .attr("x", width - 24)
//       .attr("y", 9)
//       .attr("dy", ".35em")
//       .style("text-anchor", "end")
//       .text(function(d) {return d; });

//   legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");

// // });
//   }
 
  getData(){
    return [
      {
          "categorie": "Student", 
          "values": [
              {
                  "value": 0, 
                  "rate": "Not at all"
              }, 
              {
                  "value": 4, 
                  "rate": "Not very much"
              }, 
              {
                  "value": 12, 
                  "rate": "Medium"
              }, 
              {
                  "value": 6, 
                  "rate": "Very much"
              }, 
              {
                  "value": 0, 
                  "rate": "Tremendously"
              }
          ]
      }, 
      {
          "categorie": "Liberal Profession", 
          "values": [
              {
                  "value": 1, 
                  "rate": "Not at all"
              }, 
              {
                  "value": 21, 
                  "rate": "Not very much"
              }, 
              {
                  "value": 13, 
                  "rate": "Medium"
              }, 
              {
                  "value": 18, 
                  "rate": "Very much"
              }, 
              {
                  "value": 6, 
                  "rate": "Tremendously"
              }
          ]
      }, 
      {
          "categorie": "Salaried Staff", 
          "values": [
              {
                  "value": 3, 
                  "rate": "Not at all"
              }, 
              {
                  "value": 22, 
                  "rate": "Not very much"
              }, 
              {
                  "value": 6, 
                  "rate": "Medium"
              }, 
              {
                  "value": 15, 
                  "rate": "Very much"
              }, 
              {
                  "value": 3, 
                  "rate": "Tremendously"
              }
          ]
      }, 
      {
          "categorie": "Employee", 
          "values": [
              {
                  "value": 12, 
                  "rate": "Not at all"
              }, 
              {
                  "value": 7, 
                  "rate": "Not very much"
              }, 
              {
                  "value": 18, 
                  "rate": "Medium"
              }, 
              {
                  "value": 13, 
                  "rate": "Very much"
              }, 
              {
                  "value": 6, 
                  "rate": "Tremendously"
              }
          ]
      }, 
      {
          "categorie": "Craftsman", 
          "values": [
              {
                  "value": 6, 
                  "rate": "Not at all"
              }, 
              {
                  "value": 15, 
                  "rate": "Not very much"
              }, 
              {
                  "value": 9, 
                  "rate": "Medium"
              }, 
              {
                  "value": 12, 
                  "rate": "Very much"
              }, 
              {
                  "value": 3, 
                  "rate": "Tremendously"
              }
          ]
      }, 
      {
          "categorie": "Inactive", 
          "values": [
              {
                  "value": 6, 
                  "rate": "Not at all"
              }, 
              {
                  "value": 6, 
                  "rate": "Not very much"
              }, 
              {
                  "value": 6, 
                  "rate": "Medium"
              }, 
              {
                  "value": 2, 
                  "rate": "Very much"
              }, 
              {
                  "value": 3, 
                  "rate": "Tremendously"
              }
          ]
      }
  ]
  
  }


  // new changes
  
 

  product_filter = [];
  products = new FormControl();
  public filteredProducts : ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public productsFilterCtrl: FormControl = new FormControl('');
  

  retailer_filter = [];
  retailers = new FormControl();
  public filteredRetailers : ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public retailersFilterCtrl: FormControl = new FormControl('');

  categories_filter = [];
  categories = new FormControl();
  public filteredCategories : ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public categoriesFilterCtrl: FormControl = new FormControl('');

  combination = []

  populateFilter(datas) {
    
    this.retailer_filter = []
    this.categories_filter = []    
    this.product_filter = []
    of(...datas)
      .pipe(distinct((unit: NewUnit) => unit.retailer))
      .subscribe((data) => {
        this.retailer_filter.push(data.retailer);
        this.filteredRetailers.next(this.retailer_filter)
       },err=>{

      },()=>{
        
        
         
      });
      of(...datas)
      .pipe(distinct((unit: NewUnit) => unit.category))
      .subscribe((data) => {
        this.categories_filter.push(data.category);
        this.filteredCategories.next(this.categories_filter)
      });
     
  
      of(...datas)
      .pipe(distinct((unit: NewUnit) => unit.product_group))
      .subscribe((data) => {
        this.product_filter.push(data.product_group);
        this.filteredProducts.next(this.product_filter);
      });

      // of(...datas)
      // .pipe(distinct((unit: NewUnit) => unit.retailer+"-"+unit.product_group+"-"+unit.category))
      // .subscribe((data) => {
      //   this.combination.push(data)
         
      //  });

       
     
  }

 
  ngOnChanges(changes:SimpleChanges){
    console.log(changes)
 }

  filterValue($event) {

    var multiSelectedValues = [];
    if($event.value.length > 1){
      for(var i=0;i<$event.value.length;i++ ){
          for(var j=0;j<this.totalSimulated.length;j++){
              if(this.totalSimulated[j].key==$event.value[i]){
                multiSelectedValues.push(this.totalSimulated[j]);
              }
          }
      }
      // this.simulatedEmpty();
     this.totalSelectedValues = {
        key:'',
        cateory:[ "G",
        "u",
        "m"],
        absolute_change: {
          "cogs": 0,
          "lsv": 0,
          "mac": 0,
          "mac_percent_nsv": 0,
          "nsv": 0,
          "nsv_tonnes": 0,
          "rp": 0,
          "rp_percent_rsv": 0,
          "rsv": 0,
          "te": 0,
          "te_percent_lsv": 0,
          "te_units": 0,
          "tonnes": 0,
          "units": 0
      },
      percent_change: {
        "cogs": 0,
        "lsv": 0,
        "mac": 0,
        "mac_percent_nsv": 0,
        "nsv": 0,
        "nsv_tonnes": 0,
        "rp": 0,
        "rp_percent_rsv": 0,
        "rsv": 0,
        "te": 0,
        "te_percent_lsv": 0,
        "te_units": 0,
        "tonnes": 0,
        "units": 0
    },
    current: {
      "cogs": 0,
      "lsv": 0,
      "mac": 0,
      "mac_percent_nsv": 0,
      "nsv": 0,
      "nsv_tonnes": 0,
      "rp": 0,
      "rp_percent_rsv":0,
      "rsv":0,
      "te": 0,
      "te_percent_lsv": 0,
      "te_units":0,
      "tonnes": 0,
      "units": 0,
    },
    simulated: {
    "cogs": 0,
    "lsv":0,
    "mac":0,
    "mac_percent_nsv": 0,
    "nsv": 0,
    "nsv_tonnes": 0,
    "rp": 0,
    "rp_percent_rsv": 0,
    "rsv": 0,
    "te": 0,
    "te_percent_lsv":0,
    "te_units": 0,
    "tonnes": 0,
    "units": 0,
    },
    retailer: {
    "cogs_$_chg": 0,
    "cogs_increase_percent": 0,
    "competition": "Not Follows",
    "gmac_lsv_per_unit": 0,
    "lpi_percent": 0,
    "mars_cogs_per_unit":0,
    "mars_cogs_per_unit_new": 0,
    "mars_mac": 0,
    "mars_mac_$_chg": 0,
    "mars_mac_new": 0,
    "mars_mac_percent_of_nsv": 0,
    "mars_mac_percent_of_nsv_new":0,
    "mars_net_invoice_price": 0,
    "mars_net_invoice_price_new":0,
    "mars_nrv":0,
    "mars_nrv_new":0,
    "mars_nsv":0,
    "mars_nsv_new": 0,
    "mars_off_invoice": 0,
    "mars_off_invoice_new":0,
    "mars_on_invoice":0,
    "mars_on_invoice_new":0,
    "mars_percent_of_total_profit_pool": 0,
    "mars_percent_of_total_profit_pool_new":0,
    "mars_total_net_invoice_price":0,
    "mars_total_net_invoice_price_new": 0,
    "mars_total_nrv":0,
    "mars_total_nrv_new": 0,
    "mars_total_off_invoice":0,
    "mars_total_off_invoice_new":0,
    "mars_total_on_invoice": 0,
    "mars_total_on_invoice_new": 0,
    "new_base_units":0,
    "nsv_$_chg": 0,
    "off_inv_percent_new":0,
    "on_inv_percent_new": 0,
    "percent_cogs_$_chg": 0,
    "percent_mars_mac_$_chg": 0,
    "percent_nsv_$_chg": 0,
    "percent_retailer_margin_$_chg": 0,
    "percent_rsv_w_o_vat_$_chg": 0,
    "percent_trade_expense_$_chg": 0,
    "product_group_weight_in_grams_new": 0,
    "retailer_margin":0,
    "retailer_margin_$_chg": 0,
    "retailer_margin_new": 0,
    "retailer_margin_percent_of_rsp": 0,
    "retailer_margin_percent_of_rsp_new": 0,
    "retailer_mark_up": 0,
    "retailer_mark_up_new": 0,
    "retailer_percent_of_total_profit_pool":0,
    "retailer_percent_of_total_profit_pool_new":0,
    "rsp_increase_percent": 0,
    "rsv_w_o_vat_$_chg": 0,
    "suggested_list_price": 0,
    "suggested_retailer_median_base_price_w_o_vat": 0,
    "total_cogs": 0,
    "total_cogs_new": 0,
    "total_lsv": 0,
    "total_lsv_new": 0,
    "total_nsv":0,
    "total_nsv_new": 0,
    "total_rsv": 0,
    "total_rsv_w_o_vat":0,
    "total_rsv_w_o_vat_new":0,
    "total_weight_in_tons": 0,
    "total_weight_in_tons_new":0,
    "tpr_budget": 0,
    "tpr_budget_new": 0,
    "tpr_budget_new_nrv": 0,
    "tpr_budget2": 0,
    "tpr_percent_new": 0,
    "trade_expense": 0,
    "trade_expense_$_chg": 0,
    "trade_expense_new": 0,
    },
    }
      for(var i=0;i<multiSelectedValues.length;i++){
        // this.simulated.key = "multiSelect";
        this.totalSelectedValues.cateory = multiSelectedValues[i].cateory;
       this.totalSelectedValues.absolute_change = multiSelectedValues[i].absolute_change;
        this.totalSelectedValues.percent_change = multiSelectedValues[i].percent_change;
  
        this.totalSelectedValues.current.cogs += multiSelectedValues[i].current.cogs;
        this.totalSelectedValues.current.lsv +=multiSelectedValues[i].current.lsv;
       this.totalSelectedValues.current.mac += multiSelectedValues[i].current.mac;
       this.totalSelectedValues.current.mac_percent_nsv +=multiSelectedValues[i].current.mac_percent_nsv;
       this.totalSelectedValues.current.nsv += multiSelectedValues[i].current.nsv;
       this.totalSelectedValues.current.nsv_tonnes +=multiSelectedValues[i].current.nsv_tonnes;
       this.totalSelectedValues.current.rp += multiSelectedValues[i].current.rp;
       this.totalSelectedValues.current.rp_percent_rsv +=multiSelectedValues[i].current.rp_percent_rsv;
       this.totalSelectedValues.current.rsv += multiSelectedValues[i].current.rsv;
       this.totalSelectedValues.current.te +=multiSelectedValues[i].current.te;
       this.totalSelectedValues.current.te_percent_lsv += multiSelectedValues[i].current.te_percent_lsv;
       this.totalSelectedValues.current.te_units +=multiSelectedValues[i].current.te_units;
       this.totalSelectedValues.current.tonnes += multiSelectedValues[i].current.tonnes;
       this.totalSelectedValues.current.units +=multiSelectedValues[i].current.units;
  
  
       this.totalSelectedValues.simulated.cogs += multiSelectedValues[i].simulated.cogs;
       this.totalSelectedValues.simulated.lsv +=multiSelectedValues[i].simulated.lsv;
       this.totalSelectedValues.simulated.mac += multiSelectedValues[i].simulated.mac;
       this.totalSelectedValues.simulated.mac_percent_nsv +=multiSelectedValues[i].simulated.mac_percent_nsv;
       this.totalSelectedValues.simulated.nsv += multiSelectedValues[i].simulated.nsv;
       this.totalSelectedValues.simulated.nsv_tonnes +=multiSelectedValues[i].simulated.nsv_tonnes;
       this.totalSelectedValues.simulated.rp += multiSelectedValues[i].simulated.rp;
       this.totalSelectedValues.simulated.rp_percent_rsv +=multiSelectedValues[i].simulated.rp_percent_rsv;
       this.totalSelectedValues.simulated.rsv += multiSelectedValues[i].simulated.rsv;
       this.totalSelectedValues.simulated.te +=multiSelectedValues[i].simulated.te;
       this.totalSelectedValues.simulated.te_percent_lsv += multiSelectedValues[i].simulated.te_percent_lsv;
       this.totalSelectedValues.simulated.te_units +=multiSelectedValues[i].simulated.te_units;
       this.totalSelectedValues.simulated.tonnes += multiSelectedValues[i].simulated.tonnes;
       this.totalSelectedValues.simulated.units +=multiSelectedValues[i].simulated.units;
  
       this.totalSelectedValues.retailer.cogs_$_chg += multiSelectedValues[i].retailer.cogs_$_chg;
       this.totalSelectedValues.retailer.cogs_increase_percent +=multiSelectedValues[i].retailer.cogs_increase_percent;
       this.totalSelectedValues.retailer.competition += multiSelectedValues[i].retailer.competition;
       this.totalSelectedValues.retailer.gmac_lsv_per_unit +=multiSelectedValues[i].retailer.gmac_lsv_per_unit;
       this.totalSelectedValues.retailer.lpi_percent += multiSelectedValues[i].retailer.lpi_percent;
       this.totalSelectedValues.retailer.mars_cogs_per_unit +=multiSelectedValues[i].retailer.mars_cogs_per_unit;
  
       this.totalSelectedValues.retailer.mars_cogs_per_unit_new += multiSelectedValues[i].retailer.mars_cogs_per_unit_new;
       this.totalSelectedValues.retailer.mars_mac +=multiSelectedValues[i].retailer.mars_mac;
       this.totalSelectedValues.retailer.mars_mac_$_chg += multiSelectedValues[i].retailer.mars_mac_$_chg;
       this.totalSelectedValues.retailer.mars_mac_new +=multiSelectedValues[i].retailer.mars_mac_new;
       this.totalSelectedValues.retailer.mars_mac_percent_of_nsv += multiSelectedValues[i].retailer.mars_mac_percent_of_nsv;
       this.totalSelectedValues.retailer.mars_mac_percent_of_nsv_new +=multiSelectedValues[i].retailer.mars_mac_percent_of_nsv_new;
       this.totalSelectedValues.retailer.mars_net_invoice_price += multiSelectedValues[i].retailer.mars_net_invoice_price;
       this.totalSelectedValues.retailer.mars_net_invoice_price_new +=multiSelectedValues[i].retailer.mars_net_invoice_price_new;
       this.totalSelectedValues.retailer.mars_nrv += multiSelectedValues[i].retailer.mars_nrv;
       this.totalSelectedValues.retailer.mars_nrv_new +=multiSelectedValues[i].retailer.mars_nrv_new;
       this.totalSelectedValues.retailer.mars_nsv += multiSelectedValues[i].retailer.mars_nsv;
       this.totalSelectedValues.retailer.mars_nsv_new +=multiSelectedValues[i].retailer.mars_nsv_new;
       this.totalSelectedValues.retailer.mars_off_invoice += multiSelectedValues[i].retailer.mars_off_invoice;
       this.totalSelectedValues.retailer.mars_off_invoice_new +=multiSelectedValues[i].retailer.mars_off_invoice_new;
       this.totalSelectedValues.retailer.mars_on_invoice += multiSelectedValues[i].retailer.mars_on_invoice;
       this.totalSelectedValues.retailer.mars_on_invoice_new +=multiSelectedValues[i].retailer.mars_on_invoice_new;
       this.totalSelectedValues.retailer.mars_percent_of_total_profit_pool += multiSelectedValues[i].retailer.mars_percent_of_total_profit_pool;
       this.totalSelectedValues.retailer.mars_percent_of_total_profit_pool_new +=multiSelectedValues[i].retailer.mars_percent_of_total_profit_pool_new;
       this.totalSelectedValues.retailer.mars_total_net_invoice_price += multiSelectedValues[i].retailer.mars_total_net_invoice_price;
       this.totalSelectedValues.retailer.mars_total_net_invoice_price_new +=multiSelectedValues[i].retailer.mars_total_net_invoice_price_new;
       this.totalSelectedValues.retailer.mars_total_nrv += multiSelectedValues[i].retailer.mars_total_nrv;
       this.totalSelectedValues.retailer.mars_total_nrv_new +=multiSelectedValues[i].retailer.mars_total_nrv_new;
        
  
       this.totalSelectedValues.retailer.mars_total_off_invoice += multiSelectedValues[i].retailer.mars_total_off_invoice;
       this.totalSelectedValues.retailer.mars_total_off_invoice_new +=multiSelectedValues[i].retailer.mars_total_off_invoice_new;
       this.totalSelectedValues.retailer.mars_total_on_invoice += multiSelectedValues[i].retailer.mars_total_on_invoice;
       this.totalSelectedValues.retailer.mars_total_on_invoice_new +=multiSelectedValues[i].retailer.mars_total_on_invoice_new;
       this.totalSelectedValues.retailer.new_base_units += multiSelectedValues[i].retailer.new_base_units;
       this.totalSelectedValues.retailer.nsv_$_chg +=multiSelectedValues[i].retailer.nsv_$_chg;
       this.totalSelectedValues.retailer.off_inv_percent_new += multiSelectedValues[i].retailer.off_inv_percent_new;
       this.totalSelectedValues.retailer.on_inv_percent_new +=multiSelectedValues[i].retailer.on_inv_percent_new;
       this.totalSelectedValues.retailer.percent_cogs_$_chg += multiSelectedValues[i].retailer.percent_cogs_$_chg;
       this.totalSelectedValues.retailer.percent_mars_mac_$_chg +=multiSelectedValues[i].retailer.percent_mars_mac_$_chg;
       this.totalSelectedValues.retailer.percent_nsv_$_chg += multiSelectedValues[i].retailer.percent_nsv_$_chg;
       this.totalSelectedValues.retailer.percent_retailer_margin_$_chg +=multiSelectedValues[i].retailer.percent_retailer_margin_$_chg;
       this.totalSelectedValues.retailer.percent_rsv_w_o_vat_$_chg += multiSelectedValues[i].retailer.percent_rsv_w_o_vat_$_chg;
       this.totalSelectedValues.retailer.percent_trade_expense_$_chg +=multiSelectedValues[i].retailer.percent_trade_expense_$_chg;
       this.totalSelectedValues.retailer.product_group_weight_in_grams_new += multiSelectedValues[i].retailer.product_group_weight_in_grams_new;
       this.totalSelectedValues.retailer.retailer_margin +=multiSelectedValues[i].retailer.retailer_margin;
       this.totalSelectedValues.retailer.retailer_margin_$_chg += multiSelectedValues[i].retailer.retailer_margin_$_chg;
       this.totalSelectedValues.retailer.retailer_margin_new +=multiSelectedValues[i].retailer.retailer_margin_new;
  
       this.totalSelectedValues.retailer.retailer_margin_percent_of_rsp += multiSelectedValues[i].retailer.retailer_margin_percent_of_rsp;
       this.totalSelectedValues.retailer.retailer_margin_percent_of_rsp_new +=multiSelectedValues[i].retailer.retailer_margin_percent_of_rsp_new;
       this.totalSelectedValues.retailer.retailer_mark_up += multiSelectedValues[i].retailer.retailer_mark_up;
       this.totalSelectedValues.retailer.retailer_mark_up_new +=multiSelectedValues[i].retailer.retailer_mark_up_new;
       this.totalSelectedValues.retailer.retailer_percent_of_total_profit_pool += multiSelectedValues[i].retailer.retailer_percent_of_total_profit_pool;
       this.totalSelectedValues.retailer.retailer_percent_of_total_profit_pool_new +=multiSelectedValues[i].retailer.retailer_percent_of_total_profit_pool_new;
       this.totalSelectedValues.retailer.rsp_increase_percent += multiSelectedValues[i].retailer.rsp_increase_percent;
       this.totalSelectedValues.retailer.rsv_w_o_vat_$_chg +=multiSelectedValues[i].retailer.rsv_w_o_vat_$_chg;
       this.totalSelectedValues.retailer.suggested_list_price += multiSelectedValues[i].retailer.suggested_list_price;
       this.totalSelectedValues.retailer.suggested_retailer_median_base_price_w_o_vat +=multiSelectedValues[i].retailer.suggested_retailer_median_base_price_w_o_vat;
       this.totalSelectedValues.retailer.total_cogs += multiSelectedValues[i].retailer.total_cogs;
       this.totalSelectedValues.retailer.total_cogs_new +=multiSelectedValues[i].retailer.total_cogs_new;
       this.totalSelectedValues.retailer.total_lsv += multiSelectedValues[i].retailer.total_lsv;
       this.totalSelectedValues.retailer.total_lsv_new +=multiSelectedValues[i].retailer.total_lsv_new;
       this.totalSelectedValues.retailer.total_nsv += multiSelectedValues[i].retailer.total_nsv;
       this.totalSelectedValues.retailer.total_nsv_new +=multiSelectedValues[i].retailer.total_nsv_new;
       this.totalSelectedValues.retailer.total_rsv += multiSelectedValues[i].retailer.total_rsv;
       this.totalSelectedValues.retailer.total_rsv_w_o_vat +=multiSelectedValues[i].retailer.total_rsv_w_o_vat;
  
        
       this.totalSelectedValues.retailer.total_rsv_w_o_vat_new += multiSelectedValues[i].retailer.total_rsv_w_o_vat_new;
       this.totalSelectedValues.retailer.total_weight_in_tons +=multiSelectedValues[i].retailer.total_weight_in_tons;
       this.totalSelectedValues.retailer.total_weight_in_tons_new += multiSelectedValues[i].retailer.total_weight_in_tons_new;
       this.totalSelectedValues.retailer.tpr_budget +=multiSelectedValues[i].retailer.tpr_budget;
       this.totalSelectedValues.retailer.tpr_budget_new += multiSelectedValues[i].retailer.tpr_budget_new;
       this.totalSelectedValues.retailer.tpr_budget_new_nrv +=multiSelectedValues[i].retailer.tpr_budget_new_nrv;
       this.totalSelectedValues.retailer.tpr_budget2 += multiSelectedValues[i].retailer.tpr_budget2;
       this.totalSelectedValues.retailer.tpr_percent_new +=multiSelectedValues[i].retailer.tpr_percent_new;
       this.totalSelectedValues.retailer.trade_expense += multiSelectedValues[i].retailer.trade_expense;
       this.totalSelectedValues.retailer.trade_expense_$_chg +=multiSelectedValues[i].retailer.trade_expense_$_chg;
       this.totalSelectedValues.retailer.trade_expense_new += multiSelectedValues[i].retailer.trade_expense_new;
       } 
       this.update(this.multiGetData(),this.x0,this.x1,this.y,this.g,this.height,this.width,this.z,this.svg,this.xAxisGroup,this.yAxisGroup,this.text1,this.text2,this.rect,this.legend)
       this.update2(this.multiGetDataVol(),this.x02,this.x12,this.y2,this.g2,this.height2,this.width2,this.z2,this.svg2,this.xAxisGroup2,this.yAxisGroup2,this.text12,this.text22,this.rect2,this.legend2)

    }else{
      this.simulated =this.totalSimulated.find(d=>$event.value.includes(d.key))
      this.update(this.getData1(),this.x0,this.x1,this.y,this.g,this.height,this.width,this.z,this.svg,this.xAxisGroup,this.yAxisGroup,this.text1,this.text2,this.rect,this.legend)
        this.update2(this.getData3(),this.x02,this.x12,this.y2,this.g2,this.height2,this.width2,this.z2,this.svg2,this.xAxisGroup2,this.yAxisGroup2,this.text12,this.text22,this.rect2,this.legend2)
    }


           
    
    
  
  }


     x02:any;
     x12:any;
     y2:any;
     g2:any;
     height2:any;
     width2:any;
     z2:any;
     svg2:any;
     xAxisGroup2:any;
     yAxisGroup2:any;text12:any;text22:any;rect2 :any; legend2:any;
}
 

 



 