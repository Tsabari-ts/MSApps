import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { DialogService } from '../../services/dialog.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  users: User[] = [];
  selectedUserId: number | undefined;
  error: boolean = false;
  errorMessage: string = "";

  constructor(private router: Router,
    private userService: UserService,
    private dialogService: DialogService,
    private appComponent: AppComponent) { 
      this.appComponent.showButton = false;
    }

  ngOnInit(): void {
    this.GetUsersData();
  }

  GetUsersData(): void {
    this.userService.GetAllUsers().subscribe(
      (data) => {
        this.users = data;
      }
    );
  }

  GetUserId() {
    if (this.users !== undefined) {
      this.userService.GetAllUsers().subscribe(
        (data) => {
          this.users = data;
        },
        (error) => {
          this.errorMessage = 'There was an error fetching the data, please try again later';
        }
      );
    }
  }

  GetUsers() {
    this.router.navigate([`/users`]);
  }

  GetUserDetails(): void {
    if (this.selectedUserId !== undefined) {
      this.router.navigate([`/users/${this.selectedUserId}`]);
    }
    else {
      this.NoUserSelected();
    }
  }

  AddNewUser() {
    this.router.navigate([`/users/new`]);
  }

  EditUserDetails() {
    if (this.selectedUserId !== undefined) {
      this.router.navigate([`/users/edit/${this.selectedUserId}`]);
    }
    else {
      this.NoUserSelected();
    }
  }

  DeleteUser() {
    if (this.selectedUserId !== undefined) {
      let selectedUserId =+ this.selectedUserId;
      const data = {
        additionalData: {
          selectedUserId: selectedUserId,
        },
      };
      this.dialogService.DeleteConfirmationDialog(data);
    }
    else {
      this.NoUserSelected();
    }
  }

  NoUserSelected() {
    this.error = true;
    this.errorMessage = "Please select a user ID";
  }
}