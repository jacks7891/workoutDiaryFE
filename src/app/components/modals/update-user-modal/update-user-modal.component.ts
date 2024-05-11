import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user-modal',
  templateUrl: './update-user-modal.component.html',
  styleUrls: ['./update-user-modal.component.scss']
})
export class UpdateUserModalComponent implements OnDestroy {

  @Input() userData!: User; // Dati dell'utente in input
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
      name: [this.userData.name, Validators.required],
      email: [this.userData.email, [Validators.required, Validators.email]],
      phone: [this.userData.phone, Validators.required],
      imageUrl: [this.userData.imageUrl],
      password: [''] // Lascia vuoto per non mostrare la password iniziale
    });
  }

  onSubmit(user: User) {
    if (this.userForm.valid) {

      const updatedUserData: User = {
        ...this.userData,
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        phone: this.userForm.value.phone,
        imageUrl: this.userForm.value.imageUrl
      };

      const sub = this.userService.updateUser(updatedUserData).subscribe({
        next: () => {
          this.userData = updatedUserData;
          this.modal.close("User Updated");
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
