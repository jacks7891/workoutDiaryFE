import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy{
  public users!: User[];
  private subscription!: Subscription;

  constructor(private userService: UserService){}

  ngOnInit(){
    this.getUsers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public getUsers(): void {
    this.subscription = this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    });
  }

}
