import { catchError, finalize } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from 'src/app/service/user-registration.service';

@Component({
  selector: 'app-search-delete',
  templateUrl: './search-delete.component.html',
  styleUrls: ['./search-delete.component.scss']
})
export class SearchDeleteComponent implements OnInit {

  users: any;
  email: any;

  constructor(
    private userService: UserRegistrationService
  ) {

  }

  ngOnInit(): void {
    this.userService.getUsers()
      .pipe(
        catchError(err => {
          console.error('Error getting all users', err);
          throw err;
        }),
        finalize(() => console.log('Getting all users completed'))
      )
      .subscribe(res => this.users = res);
  }

  delteUser(id: number) {
    this.userService.deleteUser(id)
      .pipe(
        catchError(err => {
          console.error('Error creating the user', err);
          throw err;
        }),
        finalize(() => console.log('User deleted successfully'))
      )
      .subscribe(res => this.users = res);
  }

  findUserByEmailId() {
    this.userService.getUserByEmail(this.email)
      .pipe(
        catchError(err => {
          console.error('Error getting user by email', err);
          throw err;
        }),
        finalize(() => console.log('Gotten user by email'))
      )
      .subscribe(res => this.email = res);
  }

}
