import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/model';
import { UserNewModalComponent } from './../user-new-modal/user-new-modal.component';
import { UserEditModalComponent } from './../user-edit-modal/user-edit-modal.component';
import { UserDeleteModalComponent } from './../user-delete-modal/user-delete-modal.component';
import { UserHttpService } from './../../../../services/http/user-http.service';
import { UserInsertService } from './../user-list/user-insert.service';
import { UserEditService } from './user-edit.service';
import { UserDeleteService } from './user-delete.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Array<User> = [];

  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 10
  };

  @ViewChild(UserNewModalComponent) userNewModal!: UserNewModalComponent;
  @ViewChild(UserEditModalComponent) userEditModal!: UserEditModalComponent;
  @ViewChild(UserDeleteModalComponent) userDeleteModal!: UserDeleteModalComponent;

  userId!: number;

  constructor(private userHttp: UserHttpService,
    public userInsertService: UserInsertService,
    public userEditService: UserEditService,
    public userDeleteService: UserDeleteService) {

    this.userInsertService.userListComponent = this;
    this.userEditService.userListComponent = this;
    this.userDeleteService.userListComponent = this;
  }

  ngOnInit(): void {
    this.getUsers();
   }

   getUsers(){
     this.userHttp.list({page: this.pagination.page})
     .subscribe(response => {
       this.users = response.data;
       this.pagination.totalItems = response.meta.total
       this.pagination.itemsPerPage = response.meta.per_page
     });
   }

   pageChanged(page: any){
     this.pagination.page = page;
     this.getUsers()
   }

}
