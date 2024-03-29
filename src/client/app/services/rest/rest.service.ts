import { Injectable} from '@angular/core';
import { Config } from '../../shared/index';
import { Http, Response, Headers } from '@angular/http';
import { AlertsComponent } from '../../modules/alerts/alerts.component';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class RestService {
	http:Http;
	alerts:AlertsComponent;
	//construimos los metodos
	constructor(http: Http, private router: Router) {
		this.http = http;
	}
	public post(data:any, uri:string) {
		let body:string = '';
		for(let key in data) {
			if(data[key] !== null && data[key] !== '') {
				if(typeof data[key] === 'object') data[key] = JSON.stringify(data[key]);
				body += key+`=${data[key]}&`;
			}
		}
		body = body.substring(0,(body.length-1));
		let header = this.createHeaders();
		return this.http.post(Config.API+uri, body, {
	      	headers: header,
	      	withCredentials: true
	    }).map((res:Response) => {
			console.log(res.status);
			let response = res.json();

			return response;
		});
	}
	public postMap(data:any, uri:string) {
		let body:string = '';
		for(let key in data) {
			if(data[key] !== null && data[key] !== '') {
				if(typeof data[key] === 'object') data[key] = JSON.stringify(data[key]);
				body += key+`=${data[key]}&`;
			}
		}
		body = body.substring(0,(body.length-1));
		let header = this.createHeaders();
		return this.http.post(Config.API+uri, body, {
	      	headers: header,
	      	withCredentials: true
	    });
	}
	// FOR JWT IMPLEMENTATION (FUTURE)
	public get(uri:string) {
		let header = this.createHeaders();
		return this.http.get(Config.API+uri, {
	      	headers: header,
	      	withCredentials: true
	    }).map((res:Response) => {
	    	console.log(res.json());
			let response = res.json();
			return response;
		});
	}
	// FOR JWT IMPLEMENTATION (FUTURE)
	public getWithParam(data:any, uri:string) {
		let body:string = '';
		for(let key in data) {
			if(data[key] !== null && data[key] !== '') {
				if(typeof data[key] === 'object') data[key] = JSON.stringify(data[key]);
				body += key+`=${data[key]}&`;
			}
		}
		body = body.substring(0,(body.length-1));
		let header = this.createHeaders();
		return this.http.get(Config.API+uri+"?"+body, {
	      	headers: header,
	      	withCredentials: true
	    }).map((res:Response) => {
	    	if(res.status != 200) this.message(res);
			let response = res.json();
			console.log(response);
			return response;
		});
	}
	public getMap(uri:string) {
		let header = this.createHeaders();
		return this.http.get(Config.API+uri, {
	      	headers: header,
	      	withCredentials: true
	    }).map((res:Response) => {
			let response = res.json();
			return response;
		});
	}
	public delete(id:number,uri:string) {
		let header = this.createHeaders();
		return this.http.delete(Config.API+uri+'/'+id, {
	      	headers: header,
	      	withCredentials: true
	    }).map((res:Response) => {
			let response = res.json();
			return response;
		});
	}
	public put(id:number,uri:string, data:any) {
		let body:string = '';
		for(let key in data) {
			if(data[key] !== null && data[key] !== '') {
				if(typeof data[key] === 'object') data[key] = JSON.stringify(data[key]);
				body += key+`=${data[key]}&`;
			}
		}
		body = body.substring(0,(body.length-1));
		let header = this.createHeaders();
		return this.http.put(Config.API+uri+'/'+id, body,{
	      	headers: header,
	      	withCredentials: true
	    }).map((res:Response) => {
			let response = res.json();
			return response;
		});
	}
	private createHeaders() {
		var headers = new Headers();
	    headers.append('Content-Type', 'application/x-www-form-urlencoded');
		return headers;
	}
	public reg_alert(alert:AlertsComponent){
		this.alerts = alert;
	}
	private message(res:Response){
		if(res.status == 500) this.alerts.error(res.text());
		if(res.status == 404) this.alerts.warning(res.text());
		if(res.status == 403) this.alerts.warning(res.text());
		if(res.status == 403) this.alerts.warning(res.text());
		if(res.status == 201) this.alerts.success(res.text());
		if(res.status == 400) this.alerts.error(res.text());
	}
}
