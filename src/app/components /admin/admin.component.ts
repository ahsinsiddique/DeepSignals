import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminUser, User } from 'src/app/models/model';
import { UsersService } from 'src/app/services/users.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { exportToCsv } from 'src/app/shared/utils';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit, OnDestroy {
  users: AdminUser[];


  page = 1;
  pageSize = 4;
  collectionSize;
  isChecked: boolean;


  displayUsers: AdminUser[];  // will store the copy of users
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsers().pipe(untilDestroyed(this)).subscribe((users: AdminUser[]) => {
      this.users = users;
      this.displayUsers = users;
      this.collectionSize = this.users.length;
      this.refreshUsers();

    })

  }


  refreshUsers() {
    this.displayUsers = this.users
      .map((user, i) => ({ id: i + 1, ...user }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  userSelected(selectedUser, checked) {

    if (checked) {
      this.users.map((user: any) => user.email == selectedUser.email ? user.isSelected = true : '');
    } else {
      this.users.map((user: any) => user.email == selectedUser.email ? user.isSelected = false : '');
    }
  }

  downloadUsers() {
    const selectedUsers = this.users.filter((user: any) => user.isSelected === true);

    exportToCsv(selectedUsers);
  }

  ngOnDestroy() {}

}
