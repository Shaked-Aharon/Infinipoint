import { Component } from '@angular/core';
import { DataService } from './data.service';
import { IUserSearch } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  
  userData$ = this.dataService.userData$;

  constructor(
    private dataService: DataService
  ) { }

}
