import {Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {LoginComponent} from './login.component';


export class Hardwares{
    hardwareName:string;
    hardwareId:string;
}

@Component({
    moduleId: module.id,
    selector: 'hardware',
    templateUrl:'./hardware.component.html',
    styleUrls:['./hardware.component.css'],
})

export class HardwareComponent implements OnInit{

    private getHardwareUrl = "http://87.195.159.225:8081/apiV1/getDevices";
    private hardwares:Hardwares[];
    @ViewChild(LoginComponent) loginComponent:LoginComponent;
    userid:number;
    constructor(
        private route:ActivatedRoute,
        private router:Router,
        private http:Http,
    ){}

    ngOnInit() {
            this.getHardware();
    }

    getHardware(){
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        let options = new RequestOptions({headers:headers});
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('userId', '' + '1');
        urlSearchParams.append('serverKey', '175d6c2c2632e0f87a07f32e88a690104f921b517c7af1c6333de2dfad9be8e3');
        let body = urlSearchParams.toString();
        return this.http.post(this.getHardwareUrl, body, options).subscribe(
            data  =>this.HardwareResponse(data),
            err   =>this.handleError(err),
            () =>console.log("Hardware request complete")
        )

    }

    HardwareResponse(data:Response){
        console.log(data['_body']);
        var obJson = JSON.parse(data['_body']);
        console.log(obJson);
        this.hardwares = obJson;
    }

    handleError(error:Response){
        console.info(error.toString());
    }
}
