import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';

@Component({
  moduleId: module.id,
  selector: 'meterkastMenu',
  templateUrl:'./meterkastMenu.component.html',
  styleUrls:['./meterkastMenu.component.css']
})

export class MeterkastMenuComponent{
    private liveMeasurementUrl = "http://keijzersoft.nl:8081/apiV1/getCurrentSpeed";

  public lineChartData:Array<any> = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartType:string = 'line';
  public pieChartType:string = 'pie';

  // Pie
  public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData:number[] = [300, 500, 100];

    constructor(
        private route:ActivatedRoute,
        private router:Router,
        private http:Http,
    ){}

  ngOnInit() {
    var data = document.getElementById("hardwareData");
    if(!data) return this.router.navigate(['login']);
    console.log(data.innerHTML);
    this.refreshPowerUsage(data.innerHTML);
  }

  public randomizeType():void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
  }

  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  private refreshPowerUsage(hardwareData: string){
      var hardwareId = JSON.parse(hardwareData).hardwareId;
      this.getLiveMeasurements(hardwareId);
      var self = this;
      setInterval(function () {
            self.getLiveMeasurements(hardwareId);
      },10000);
  }

private getLiveMeasurements(hardwareId : Number){
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    let options = new RequestOptions({headers:headers});
    let urlSearchParams = new URLSearchParams();

    urlSearchParams.append('hardwareId', '' + hardwareId);
    urlSearchParams.append('serverKey', '175d6c2c2632e0f87a07f32e88a690104f921b517c7af1c6333de2dfad9be8e3');
    let body = urlSearchParams.toString();
    return this.http.post(this.liveMeasurementUrl , body, options).subscribe(
        data  => this.setLiveMeasurement(data),
        err   => this.handleError(err),
        ()    => console.log("Hardware request complete")
    )
}

    setLiveMeasurement(data:Response){
        var obJson = JSON.parse(data['_body']);
        console.log(obJson);

        let speed = document.getElementById("currentSpeed");
        let speedNumber = "" + obJson.wh;
        speed.innerHTML = speedNumber.split('.')[0];
    }

    handleError(error:Response){
        console.info(error.toString());
    }
}
