import { Component, OnInit } from '@angular/core';
import { catchError, finalize } from 'rxjs';
import { UserRegistrationService } from 'src/app/service/user-registration.service';
import { User } from 'src/model/User';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  user: User = new User("", "", 0, "");
  message:any;

  constructor(
    private userService: UserRegistrationService
  ) {

  }

  ngOnInit(): void {

  }

  registerNow() {
    this.userService.doRegistration(this.user)
      .pipe(
        catchError(err => {
          console.error('Error creating user');
          throw err;
        }),
        finalize(() => console.log('User created successfully'))
      )
      .subscribe(res => this.message = res);
  }

}
