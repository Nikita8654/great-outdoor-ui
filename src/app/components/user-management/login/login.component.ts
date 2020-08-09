import {Component, OnInit} from '@angular/core';
import {User} from 'src/app/models/user';
import {Router} from '@angular/router';
import {LoginService} from 'src/app/services/login.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {LoginSuccessComponent} from '../login-success/login-success.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  msg = '';
  isLoginError: boolean;
  currentUser: User;

  constructor(private _router: Router, private loginService: LoginService, private dialog: MatDialog) {
    this.user = new User();
  }

  ngOnInit(): void {
  }

  loginUser() {
    this.loginService.userLogin(this.user.userId, this.user.password).subscribe(
      (data: User) => {
        console.log('Hello');
        sessionStorage.setItem('userId', data.userId);
        sessionStorage.setItem('userRole', data.userRole);
        alert(sessionStorage.getItem('userId') + ' has been Login success');
        // this._router.navigate(['/LoginSuccess']);
        this.loginService.loginServiceEvent.next('success');

        this._router.navigateByUrl('/');


        //this.displaySuccessMsg();
      },
      (err) => {
        console.log(err.error);
        // this.isLoginError=true;

        this.isLoginError = true;
        setTimeout(() => this.isLoginError = false, 4000);
        this._router.navigate(['/login']);
      }
    );

  }

  gotoregistration() {
    this._router.navigate(['/registration']);
  }

  displaySuccessMsg() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    dialogConfig.autoFocus = true;
    let dialogRef = this.dialog.open(LoginSuccessComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this._router.navigateByUrl('/');
      window.location.reload();
      //this._router.navigate['/']

      //
    });
  }

}
