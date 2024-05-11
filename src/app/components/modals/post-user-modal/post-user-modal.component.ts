import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-user-modal',
  templateUrl: './post-user-modal.component.html',
  styleUrls: ['./post-user-modal.component.scss']
})
export class PostUserModalComponent {
  //@Input() userData!: User; // Dati dell'utente in input
  userData!: User;
  userForm!: FormGroup;
  private subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private userService: UserService,) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  initializeForm(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      imageUrl: [''],
      password: [''] // Lascia vuoto per non mostrare la password iniziale
    });
  }

  onSubmit() {
    if (this.userForm.valid) {

      const updatedUserData: User = {
        ...this.userData,
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        phone: this.userForm.value.phone,
        imageUrl: this.userForm.value.imageUrl
      };

      const sub = this.userService.postUser(updatedUserData).subscribe({
        next: () => {
          this.userData = updatedUserData;
          this.modal.close("User Created");
        },
        error: e => {
          alert(e)
        },
      });
      this.subscription.add(sub);
    } else {
      alert("Form is invalid")
    }
  }
}
