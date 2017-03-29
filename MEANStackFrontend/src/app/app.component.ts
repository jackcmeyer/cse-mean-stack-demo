import {Component, OnInit} from '@angular/core';
import {TODOService} from "./todo.service";


export class TODOItem {
	description: string;
	completed: boolean;
	_id: string;
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'My TODO List';

	todoList: TODOItem[] = [];

	constructor(private todoService: TODOService) {
	}

	ngOnInit() {
		this.refreshList();
	}

	refreshList(): void {
		this.todoService.getTODOList()
			.then(list => {
				this.todoList.length = 0;
				for (let item of list) {
					this.todoList.push(item);
				}
				console.log(this.todoList);
			});
	}

	addTODOItem(description: string): void {
		this.todoService.addTODOItem(description)
			.then(() => this.refreshList());
	}

	completeItem(id : string): void {
		console.log(id);
		this.todoService.completeTODOItem(id)
			.then(completed => {
				console.log(completed);
				console.log('Item was' + (completed ? ' ' : 'not ') + 'completed');
				this.refreshList();
			})
	}
}
