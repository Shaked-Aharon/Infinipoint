import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {

  userData$ = this.dataService.userData$;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
  }

}
