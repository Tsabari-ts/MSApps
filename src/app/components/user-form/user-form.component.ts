import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})

export class UserFormComponent implements OnInit {
  userId: string = "";
  isNewUser: boolean = false;
  isSaveSuccessful: boolean = false;
  userData: User = { id: 0, name: '', email: '', password: '' };

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private appComponent: AppComponent) {
    this.appComponent.showButton = true;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.userId = params['id'];
        let selectedUserId = parseInt(this.userId, 10);
        this.getUserDetails(selectedUserId);
      } else {
        this.isNewUser = true;
      }
    });
  }

  getUserDetails(selectedUserId: number): void {
    this.userService.GetUserById(selectedUserId).subscribe(
      (user) => {
        if (user != undefined) {
          this.userData = user;
        }
      }
    );
  }
  idValue: number | undefined;
  nameValue: string = '';
  emailValue: string = '';
  passwordValue: string = '';
  isButtonDisabled: boolean = false;

  AddNewUser(form: any) {
    if (form.valid) {
      this.isButtonDisabled = true;
      const userData = {
        id: this.idValue,
        name: this.nameValue,
        email: this.emailValue,
        password: this.passwordValue
      };

      this.userService.AddNewUser(userData).subscribe(response => {
        setTimeout(() => {
          this.isSaveSuccessful = response;
          setTimeout(() => {
            this.router.navigate([`/users`]);
          }, 2000);
        }, 1000);
      });
    }
  }

  UpdateUser(form: any) {
    if (form.valid) {
      this.isButtonDisabled = true;
      const userData = {
        id: this.idValue,
        name: this.nameValue,
        email: this.emailValue,
        password: this.passwordValue
      };

      this.userService.UpdateUser(userData).subscribe(response => {
        setTimeout(() => {
          this.isSaveSuccessful = response;
          setTimeout(() => {
            this.router.navigate([`/users`]);
          }, 2000);
        }, 1000);
      });
    }
  }

  isValidEmail(): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(this.emailValue);
  }
}
