import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@Component({
  moduleId: module.id,
  selector: 'meterkastMenu',
  templateUrl:'./meterkastMenu.component.html',
  styleUrls:['./meterkastMenu.component.css']
})

export class MeterkastMenuComponent{

    public lineChartData:Array<any> = [ {data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23], label:'power consumption past 24 hours (Watt/Hour)'}];
    public lineChartLabels:Array<any> = [
                '0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00','7:00','8:00','9:00','10:00', '11:00',
                '12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'
    ];

    public lineChartType:string = 'line';

    private liveMeasurementUrl = "http://keijzersoft.nl:8081/apiV1/getCurrentSpeed";
    private historyMeasurementUrl = "http://keijzersoft.nl:8081/apiV1/getHistory";
    private hardwareInfo : JSON;

    constructor(
        private route:ActivatedRoute,
        private router:Router,
        private http:Http,
    ){}


    ngOnInit() {
        var data = document.getElementById("hardwareData");
        if(!data) return this.router.navigate(['login']);
        console.log(data.innerHTML);
        this.hardwareInfo = JSON.parse(data.innerHTML);

        let header2 = document.getElementById('header');
        header2.innerHTML = 'Status '  + this.hardwareInfo['hardwareName'];

        this.refreshPowerUsage();
        this.getHistoryData();
    }

    private refreshPowerUsage(){
        this.getLiveMeasurements(this.hardwareInfo['hardwareId']);
        var self = this;
        setInterval(function () {
            self.getLiveMeasurements(self.hardwareInfo['hardwareId']);
        },10000);
    }

    private getHistoryData(){
        let hardwareId = this.hardwareInfo['hardwareId'];
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        let options = new RequestOptions({headers:headers});
        let urlSearchParams = new URLSearchParams();

        urlSearchParams.append('hardwareId', '' + hardwareId);
        urlSearchParams.append('serverKey', '175d6c2c2632e0f87a07f32e88a690104f921b517c7af1c6333de2dfad9be8e3');
        let body = urlSearchParams.toString();
        return this.http.post(this.historyMeasurementUrl , body, options).subscribe(
            data  => this.setHistoryMeasurement(data),
            err   => this.handleError(err),
            ()    => console.log("Hardware request complete")
        )
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

    private setHistoryMeasurement(data:Response){
        console.log("got history data");
        //clear previous data

        //set vars
        let obJson = JSON.parse(data['_body']);
        let dataIndex = 0;
        if(obJson.length > 24){
            dataIndex = obJson.length - 24;
        }

        let _lineChartData:Array<any> = new Array(1);
        _lineChartData[0] = {data: new Array(this.lineChartData[0].data.length), label: this.lineChartData[0].label};
        for (let j = 0; j < this.lineChartData[0].data.length; j++, dataIndex ++) {
            let usage = obJson[dataIndex].usedPower;
            _lineChartData[0].data[j] = usage * 1000;
            let time = obJson[dataIndex].time.split('T')[1].split('.')[0];
            this.lineChartLabels[j] = time.substring(0, time.length -3);
        }
        this.lineChartData = _lineChartData;
    }

    private setLiveMeasurement(data:Response){
        let obJson = JSON.parse(data['_body']);
        let speedLabel = document.getElementById("currentSpeed");
        console.log(obJson);

        let speedNumber = "" + obJson.wh;
        speedLabel.innerHTML = speedNumber.split('.')[0];
    }

    private handleError(error:Response){
        console.info(error.toString());
    }

    public randomizeType():void {
        this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    }

    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }
}
