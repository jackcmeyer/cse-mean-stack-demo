import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";

import "rxjs/add/operator/toPromise";
import {TODOItem} from "./app.component";

@Injectable()
export class TODOService {

	hostAddress: string = 'http://localhost:3000/';

	private headers = new Headers({'Content-Type': 'application/json'});

	constructor(private http: Http) {
	}

	getTODOList(): Promise<TODOItem[]> {
		return this.http
			.get(this.hostAddress + 'todo/all')
			.toPromise()
			.then(res => this.helper(res))
			.catch(this.handleError);
	}

	private helper(res): TODOItem[] {
		console.log(res.json());
		return res.json() as TODOItem[];
	}

	addTODOItem(description: string): Promise<TODOItem> {
		return this.http
			.post(this.hostAddress + 'todo/add', {description: description}, {headers: this.headers})
			.toPromise()
			.then(res => res.json().data as TODOItem)
			.catch(this.handleError);
	}

	completeTODOItem(id: string): Promise<boolean> {
		console.log(id);
		return this.http
			.post(this.hostAddress + 'todo/complete', {id: id}, {headers: this.headers})
			.toPromise()
			.then(res => res.json().data as boolean)
			.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error(error);
		return Promise.reject(error.message || error);
	}

}
