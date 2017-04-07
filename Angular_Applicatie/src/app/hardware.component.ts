import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';

@Component({
    moduleId: module.id,
    selector: 'hardware',
    templateUrl:'./hardware.component.html',
    styleUrls:['./hardware.component.css']
})

export class HardwareComponent implements OnInit{

    constructor(
        private route:ActivatedRoute,
        private router:Router,
        private http:Http
    ){}

    ngOnInit() {
    }

}
