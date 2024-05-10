import { Component, OnDestroy, OnInit } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

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
    private route: ActivatedRoute
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

  public createUser() {
    //TODO: togli utente mock e crea form per creaione su nuova pagina o popup(modale)
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

  public findUser(id: number) {
    //TODO: qua serve un campo di ricerca
    const sub = this.userService.getUsersById(id).subscribe();
    this.subscription.add(sub);
  }

  public updateUser(user: User) {
    //TODO: anche qui deve caricare il form con i dati dell'utente però e poi permettere di modificarli
    const sub = this.userService.updateUser(user).subscribe();
    this.subscription.add(sub);
    window.location.reload();
  }

  public deleteUser(id: number): void {
    const sub = this.userService.deleteUser(id).subscribe();
    this.subscription.add(sub);
    window.location.reload();
  }
}
