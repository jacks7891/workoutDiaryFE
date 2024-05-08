import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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
  //, private location: Location
  // ngOnChanges(): void {
  //   location.reload();
  // }

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



  public deleteUser(id: number) {
    const sub = this.userService.deleteUser(id).subscribe(
      {
        next: () => console.log('dentro al next'),
        error: (e) => console.log(e),
        complete: () => {this.router.navigate(["/"], { skipLocationChange: true }).then(() => {
          return this.router.navigate(['/users'])})}
      }
    );
    this.subscription.add(sub);
  }
}
