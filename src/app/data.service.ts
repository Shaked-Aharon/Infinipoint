import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, take } from 'rxjs';
import { IAlbum, IPost, IUserData, IUserDetails, IUserSearch } from './interfaces';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  userData$ = new BehaviorSubject<IUserData | undefined>(undefined);
  users$ = new BehaviorSubject<IUserSearch[]>([]);
  constructor(
    private http: HttpClient
  ) {
    this.getUsersList().subscribe({
      next: res => this.users$.next(res)
    })
  }

  getData(userId: number) {
    combineLatest([
      this.getAlbumsByUserId(userId),
      this.getPostsByUserId(userId),
      this.getUserDetailsByUserId(userId)
    ]).subscribe(res => {
      this.userData$.next({
        albumns: res[0],
        posts: res[1],
        details: res[2],
      });
    })
  }

  private getAlbumsByUserId(userId: number) {
    return this.http.get<IAlbum[]>(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
  }

  private getPostsByUserId(userId: number) {
    return this.http.get<IPost[]>(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
  }

  private getUserDetailsByUserId(userId: number) {
    return this.http.get<IUserDetails>(`https://jsonplaceholder.typicode.com/users/${userId}`)
  }

  getUsersList() {
    return this.http.get<IUserDetails[]>(`https://jsonplaceholder.typicode.com/users`)
      .pipe(map(arr => arr.map<IUserSearch>(u => ({ name: u.name, id: u.id }))), take(1))
  }
}
