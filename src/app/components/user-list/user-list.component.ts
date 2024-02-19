import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  constructor(private userService:UserService,
              private appComponent: AppComponent) {
                this.appComponent.showButton = true;
               }
  users:User[] = [];

  ngOnInit(): void {
    this.GetAllUsers();
  }

  GetAllUsers(): void {
    this.userService.GetAllUsers().subscribe(
      (data) => {
        this.users = data;
      }
    );
  }
}
