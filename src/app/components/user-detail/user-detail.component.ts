import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../../services/dialog.service';
import { Location } from '@angular/common';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {
  userId: string = "";
  selectedUser: User | undefined;
  selectedUserId: number = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private router: Router,
              private dialogService: DialogService,
              private location: Location,
              private appComponent: AppComponent){
                this.appComponent.showButton = true;
              }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['id'];
      this.selectedUserId = parseInt(this.userId, 10);
      this.GetUserDetails(this.selectedUserId);
    })  
    
  }

  GetUserDetails(selectedUserId:number): void {
      this.userService.GetUserById(selectedUserId).subscribe(
        (user) => {
          if(user?.id !== 0){
            this.selectedUser = user;            
          }
          else{
             this.router.navigate([`/`]); 
          }
        }
      );
  }

  EditUserDetails(){
      this.router.navigate([`/users/edit/${this.selectedUserId}`]); 
  }

  DeleteUser(){
      const data = {
        additionalData: {
          selectedUserId: this.selectedUserId,
        },
      };
      this.dialogService.DeleteConfirmationDialog(data);
  }
}