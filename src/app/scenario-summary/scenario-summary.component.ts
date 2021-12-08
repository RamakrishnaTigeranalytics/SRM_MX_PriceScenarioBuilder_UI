import { Component, OnInit, Input } from '@angular/core';
import { SimulatedArray } from '../shared/models/input';
import { ApiService } from '../shared/services/api.service';
import { PriceScenarioService } from '../shared/services/price-scenario.service';
import {
  map
  
} from 'rxjs/operators';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import {
  Observable,
  of,
  from,
  BehaviorSubject,
  combineLatest,
  pipe,
} from 'rxjs';
import { ExcelServicesService } from '../shared/services/excel.service';
@Component({
  selector: 'app-scenario-summary',
  templateUrl: './scenario-summary.component.html',
  styleUrls: ['./scenario-summary.component.scss'],
})
export class ScenarioSummaryComponent implements OnInit {
  simulatedArray: SimulatedArray[] = new Array();
  isSimulate: boolean;
  form : FormGroup;
  TOTAL_OPTIONS = ['Units','Volume (in Tonnes)',
  'RSV w/o VAT','Customer Margin','LSV','TE','NSV','MAC',
  'TE,% LSV','MAC,% NSV','Customer Margin, % RSV']
  TOTAL_OPTIONS_TONNES = ['Units','Volume (in Tonnes)',
  'RSV w/o VAT/tonnes','Customer Margin/ tonnes','LSV/ tonnes','TE/ tonnes','NSV/ tonnes','MAC/ tonnes',
  'TE,% LSV','MAC,% NSV','Customer Margin, % RSV']
  TOTAL_OPTIONS_UNITS = ['Units','Volume (in Tonnes)',
  'RSV w/o VAT/units','Customer Margin/ units','LSV/ units','TE/ units','NSV/ units','MAC/ units',
  'TE,% LSV','MAC,% NSV','Customer Margin, % RSV']
  params = ['Current Values', 'Simulated', 'ABS Change', '% Change'];
  @Input() productFilterSubject : Observable<any[]>;
  @Input() categoryFilterSubject : Observable<any[]>;
  @Input() retailerFilterSubject : Observable<any[]>;

  constructor(private priceScenarioService: PriceScenarioService,
    private api: ApiService,
    private excel: ExcelServicesService,
    private formBuilder: FormBuilder) {
      this.form = this.formBuilder.group({
        simulatedArray : this.formBuilder.array([])
      })
      // this.form.get('simulatedArray').valueChanges.subscribe(data=>{
      //   console.group(data , " Value chanegs data ")
      // })
    }
    radioChange(event , index){
      let formArray = this.form.get('simulatedArray') as FormArray
      let option = this.TOTAL_OPTIONS
      if(event.value == "Per Unit"){
        option = this.TOTAL_OPTIONS_UNITS

      }
      // "Total" , 'Per Tonne' , 'Per Unit'
      else if(event.value == "Per Tonne"){
option = this.TOTAL_OPTIONS_TONNES
      }
      else{

        option = this.TOTAL_OPTIONS
      }
     
      // debugger;
      formArray.at(index).patchValue({
        table_header :option
      })
      
    }

  ngOnInit(): void {
    this.priceScenarioService.getSimulatedArray().subscribe(data=>{
      console.log(data , "DATA SIMULTED ARRAY ")
      this.simulatedArray = data;
        this.isSimulate = true;
       this.getForm(data) 

    })

  

    // combineLatest([
    //   this.priceScenarioService.getSimulatedArray(),
     
    //   this.productFilterSubject,
    //   this.retailerFilterSubject,
    //   this.categoryFilterSubject
     
    // ])
    //   .pipe(
    //     map(([simulatedSummary, 
    //       product,retailer,category
    //     ]) => {
    //       console.log(simulatedSummary , "simulatedSummary in summary")
    
    //       // if (product && product.length > 0) {
    //       //   product.unshift('ALL')
    //       //   simulatedSummary =  simulatedSummary.filter(d=> product.includes(d.key))
            
    //       // }
    //       // if (retailer && retailer.length > 0) {
    //       //   simulatedSummary =  simulatedSummary.filter(d=> product.includes(d.key))
            
    //       // }
          
    //       // if (product && product.length > 0) {
    //       //   simulatedSummary =  simulatedSummary.filter(d=> product.includes(d.key))
            
    //       // }
          
          
   
    //       return simulatedSummary;
    //     })
    //   )
    //   .subscribe((data) => {
    //     // console.log(data , "simuated array")
        
    //   //  console.log(this.form , "GENRETED FORM ")
       
        
        
        
    //   });
  
  }

  getForm(data : SimulatedArray[]){
    let arr1 : FormArray = this.form.get('simulatedArray') as FormArray;
    arr1.clear()
    // console.log(arr1 , "ARR!")
    // arr1.reset()
    // arr1 = this.formBuilder.array([])
    data.forEach(d=>{
      arr1.push(
        this.formBuilder.group({
          options :  this.formBuilder.array(["Total" , 'Per Tonne' , 'Per Unit']),
          table_header : this.formBuilder.array(this.TOTAL_OPTIONS),
          selected:['Total'],
          simulated : d
      
    
        })
      );

    })
    console.log(arr1 , "ARR2")
    console.log(this.form , "FINAL FORM")
    // arr1.clear()
    // console.log(arr1 , "ARR3")
        // debugger
   
   
  }
  public downloadE(key){
     
    for(var i=0;i<this.form.get('simulatedArray').value.length;i++){
      if(this.form.get('simulatedArray').value[i].simulated.key==key){
        var simulatedData = 
      
        [{
            "Corrent Values":{
                "units":'',
                "volume_in_tonnes":'',
                "rsv_w/o_vat":'',
                "lsv":'',
                "nsv":'',
                "te":'',
                "percentage_lsv":'',
                "mac":'',
                "percentage_nsv":'',
                "customer_margin":'',
                "percentage_rsv":''
            }
        },{
            "Simulated":{
                "units":'',
                "volume_in_tonnes":'',
                "rsv_w/o_vat":'',
                "lsv":'',
                "nsv":'',
                "te":'',
                "percentage_lsv":'',
                "mac":'',
                "percentage_nsv":'',
                "customer_margin":'',
                "percentage_rsv":14
            }
        },
        {
            "ABS Change":{
                "units":'',
                "volume_in_tonnes":'',
                "rsv_w/o_vat":'',
                "lsv":'',
                "nsv":'',
                "te":'',
                "percentage_lsv":'',
                "mac":'',
                "percentage_nsv":'',
                "customer_margin":'',
                "percentage_rsv":''
            }
        },
        {
            "% Change":{
                "units":'',
                "volume_in_tonnes":'',
                "rsv_w/o_vat":'',
                
                "lsv":'',
              
                "nsv":'',
             
                "te":'',
                "percentage_lsv":'',
                "mac":'',
                "percentage_nsv":'',
                "customer_margin":'',
                "percentage_rsv":''
            }
        }
        
            ]
        // console.log(key,this.form.get('simulatedArray').value[i].simulated);
        simulatedData[0]['Corrent Values'].units=this.form.get('simulatedArray').value[i].simulated.current.units;
        simulatedData[0]['Corrent Values']['volume_in_tonnes']=this.form.get('simulatedArray').value[i].simulated.current.tonnes;
        simulatedData[0]['Corrent Values']['rsv_w/o_vat']=this.form.get('simulatedArray').value[i].simulated.current.rsv;
        simulatedData[0]['Corrent Values']['lsv']=this.form.get('simulatedArray').value[i].simulated.current.lsv;
        simulatedData[0]['Corrent Values']['nsv']=this.form.get('simulatedArray').value[i].simulated.current.nsv;
        simulatedData[0]['Corrent Values']['te']=this.form.get('simulatedArray').value[i].simulated.current.te;
        simulatedData[0]['Corrent Values']['percentage_lsv']=this.form.get('simulatedArray').value[i].simulated.current.te_percent_lsv;
        simulatedData[0]['Corrent Values']['mac']=this.form.get('simulatedArray').value[i].simulated.current.mac;
        simulatedData[0]['Corrent Values']['percentage_nsv']=this.form.get('simulatedArray').value[i].simulated.current.mac_percent_nsv;
        simulatedData[0]['Corrent Values']['customer_margin']=this.form.get('simulatedArray').value[i].simulated.current.rp;
        simulatedData[0]['Corrent Values']['percentage_rsv']=this.form.get('simulatedArray').value[i].simulated.current.rp_percent_rsv;
        

        simulatedData[1]['Simulated'].units=this.form.get('simulatedArray').value[i].simulated.simulated.units;
        simulatedData[1]['Simulated']['volume_in_tonnes']=this.form.get('simulatedArray').value[i].simulated.simulated.tonnes;
        simulatedData[1]['Simulated']['rsv_w/o_vat']=this.form.get('simulatedArray').value[i].simulated.simulated.rsv;
        simulatedData[1]['Simulated']['lsv']=this.form.get('simulatedArray').value[i].simulated.simulated.lsv;
        simulatedData[1]['Simulated']['nsv']=this.form.get('simulatedArray').value[i].simulated.simulated.nsv;
        simulatedData[1]['Simulated']['te']=this.form.get('simulatedArray').value[i].simulated.simulated.te;
        simulatedData[1]['Simulated']['percentage_lsv']=this.form.get('simulatedArray').value[i].simulated.simulated.te_percent_lsv;
        simulatedData[1]['Simulated']['mac']=this.form.get('simulatedArray').value[i].simulated.simulated.mac;
        simulatedData[1]['Simulated']['percentage_nsv']=this.form.get('simulatedArray').value[i].simulated.simulated.mac_percent_nsv;
        simulatedData[1]['Simulated']['customer_margin']=this.form.get('simulatedArray').value[i].simulated.simulated.rp;
        simulatedData[1]['Simulated']['percentage_rsv']=this.form.get('simulatedArray').value[i].simulated.simulated.rp_percent_rsv;


        simulatedData[2]['ABS Change'].units=this.form.get('simulatedArray').value[i].simulated.absolute_change.units;
        simulatedData[2]['ABS Change']['volume_in_tonnes']=this.form.get('simulatedArray').value[i].simulated.absolute_change.tonnes;
        simulatedData[2]['ABS Change']['rsv_w/o_vat']=this.form.get('simulatedArray').value[i].simulated.absolute_change.rsv;
        simulatedData[2]['ABS Change']['lsv']=this.form.get('simulatedArray').value[i].simulated.absolute_change.lsv;
        simulatedData[2]['ABS Change']['nsv']=this.form.get('simulatedArray').value[i].simulated.absolute_change.nsv;
        simulatedData[2]['ABS Change']['te']=this.form.get('simulatedArray').value[i].simulated.absolute_change.te;
        simulatedData[2]['ABS Change']['percentage_lsv']=this.form.get('simulatedArray').value[i].simulated.absolute_change.te_percent_lsv;
        simulatedData[2]['ABS Change']['mac']=this.form.get('simulatedArray').value[i].simulated.absolute_change.mac;
        simulatedData[2]['ABS Change']['percentage_nsv']=this.form.get('simulatedArray').value[i].simulated.absolute_change.mac_percent_nsv;
        simulatedData[2]['ABS Change']['customer_margin']=this.form.get('simulatedArray').value[i].simulated.absolute_change.rp;
        simulatedData[2]['ABS Change']['percentage_rsv']=this.form.get('simulatedArray').value[i].simulated.absolute_change.rp_percent_rsv;


        simulatedData[3]['% Change'].units=this.form.get('simulatedArray').value[i].simulated.percent_change.units;
        simulatedData[3]['% Change']['volume_in_tonnes']=this.form.get('simulatedArray').value[i].simulated.percent_change.tonnes;
        simulatedData[3]['% Change']['rsv_w/o_vat']=this.form.get('simulatedArray').value[i].simulated.percent_change.rsv;
        simulatedData[3]['% Change']['lsv']=this.form.get('simulatedArray').value[i].simulated.percent_change.lsv;
        simulatedData[3]['% Change']['nsv']=this.form.get('simulatedArray').value[i].simulated.percent_change.nsv;
        simulatedData[3]['% Change']['te']=this.form.get('simulatedArray').value[i].simulated.percent_change.te;
        simulatedData[3]['% Change']['percentage_lsv']=this.form.get('simulatedArray').value[i].simulated.percent_change.te_percent_lsv;
        simulatedData[3]['% Change']['mac']=this.form.get('simulatedArray').value[i].simulated.percent_change.mac;
        simulatedData[3]['% Change']['percentage_nsv']=this.form.get('simulatedArray').value[i].simulated.percent_change.mac_percent_nsv;
        simulatedData[3]['% Change']['customer_margin']=this.form.get('simulatedArray').value[i].simulated.percent_change.rp;
        simulatedData[3]['% Change']['percentage_rsv']=this.form.get('simulatedArray').value[i].simulated.percent_change.rp_percent_rsv;
        this.api.getSummaryExcel(simulatedData,"summary").subscribe(data=>{
          // console.log(data)
          this.excel.save(data , "input")
        },
        err=>{
          // console.log(err , "error")
        })
      }
    }

  }
}
