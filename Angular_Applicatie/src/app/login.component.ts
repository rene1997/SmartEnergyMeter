import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';


@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl:'./login.component.html',
  styleUrls:['./login.component.css']
})

export class LoginComponent implements OnInit{
  private loginUrl = "http://87.195.159.225:8081/apiV1/login";
  
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private http:Http
  ){}

  ngOnInit() {
  }

  login(username:string, password:string){
    console.log('trying to login to ');
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({ headers: headers });

    let urlSearchParams = new URLSearchParams()
    urlSearchParams.append('username',username);
    urlSearchParams.append('password',password);
    urlSearchParams.append('serverKey', '175d6c2c2632e0f87a07f32e88a690104f921b517c7af1c6333de2dfad9be8e3');

    let body = urlSearchParams.toString()

    return this.http.post(this.loginUrl,body, options).subscribe(
            data => this.loginResponse(data),
            err => this.handleError(err),
            () => console.log('Random Quote Complete'))
  }

  loginResponse(res: Response){
    console.info(res['_body']);
    this.router.navigate(['todolist']);
  }

  handleError(error:Response){
    console.info(error.toString());
  }
}
