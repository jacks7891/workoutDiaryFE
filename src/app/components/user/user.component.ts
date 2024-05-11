import { Component, OnDestroy, OnInit } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateUserModalComponent } from 'src/app/components/modals/update-user-modal/update-user-modal.component';
import { PostUserModalComponent } from '../modals/post-user-modal/post-user-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy{
  public users!: User[];
  private subscription = new Subscription();

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ){}

  ngOnInit(){
    this.getUsers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public getUsers(): void {
    const sub: Subscription = this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    });
    this.subscription.add(sub);
  }

  public createMockUser() {
    const min = 1;
    const max = 30;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log('mathrandom for image: ',randomNumber)
    let user: User = {
      name:'test',
      email:'test@email.it',
      phone: '+391234546',
      imageUrl: `https://bootdey.com/img/Content/avatar/avatar${randomNumber}.png`,
      password:'ciao1234'
    }
    const sub = this.userService.postUser(user).subscribe();
    this.subscription.add(sub);
    window.location.reload();
  }

  public createUser() {
    const modalRef = this.modalService.open(PostUserModalComponent);
    modalRef.result.then((result) => {
      if (result == "User Created") {
        window.location.reload();
      }
    });
  }

  public findUser(id: number) {
    //TODO: qua serve per un campo di ricerca
    const sub = this.userService.getUsersById(id).subscribe();
    this.subscription.add(sub);
  }

  public updateUser(user: User) {
    const modalRef = this.modalService.open(UpdateUserModalComponent);
    modalRef.componentInstance.userData = user;
    modalRef.result.then((result) => {
      if (result == "User Updated") {
        window.location.reload();
      }
    });
  }

  public deleteUser(id: number): void {
    const sub = this.userService.deleteUser(id).subscribe();
    this.subscription.add(sub);
    window.location.reload();
  }
}
