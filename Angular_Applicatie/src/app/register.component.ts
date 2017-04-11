import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';

@Component({
  moduleId: module.id,
  selector: 'register',
  templateUrl:'./register.component.html',
  styleUrls:['./register.component.css']
})

export class RegisterComponent implements OnInit{
  private registerUrl= "http://87.195.159.225:8081/apiV1/adduser";
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private http:Http
  ){}

  ngOnInit() {

  }

  register(username:string,password:string, licence:string){
    console.log("trying to regiser:");
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({ headers: headers });

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('username',username);
    urlSearchParams.append('password',password);
    urlSearchParams.append('licence',licence);
    urlSearchParams.append('serverKey', '175d6c2c2632e0f87a07f32e88a690104f921b517c7af1c6333de2dfad9be8e3');
    let body = urlSearchParams.toString()

    return this.http.post(this.registerUrl, body, options).subscribe(
        data  =>this.registerResponse(data),
        err   =>this.handleError(err),
        () =>console.log("Register request complete")

    );
  }

  registerResponse(res: Response){

    console.info(res['_body']);
    window.alert("successfull registered account");
    this.router.navigate(['login']);

  }

  handleError(error: Response){
    console.info(error.toString());
    window.alert("failed to register account \noriginal error: \n" + error.toString());
  }
}
