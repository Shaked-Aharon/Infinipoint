import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { IUserSearch } from 'src/app/interfaces';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {

  filterdUsers$ = new BehaviorSubject<IUserSearch[]>(this.dataService.users$.value);
  userSearchFormControl = new FormControl('', []);
  constructor(
    private dataService: DataService
  ) { }


  ngOnInit(): void {
    this.filterdUsers$.next(this.dataService.users$.value);
    this.userSearchFormControl.valueChanges.subscribe(val => {
      if(typeof val === 'string'){ this.filterdUsers$.next(this._filter(val));}
      else { this.filterdUsers$.next(this.dataService.users$.value); this.dataService.getData(val.id); }
    });
  }

  displayFn(user: IUserSearch): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): IUserSearch[] {
    const filterValue = name.toLowerCase();
    return this.dataService.users$.value.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}
