import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth/auth.service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  icon: String;

  constructor(private authService: AuthServiceService, private _snackBar: MatSnackBar, private router: Router) { 
    this.icon = 'visibility_off'

  }

  ngOnInit(): void {
    this.initForm()
  }

  toggleIcon(){
    console.log()
    if(this.icon === 'visibility_off'){
      this.icon = 'visibility'
    }
    else{
      this.icon = 'visibility_off'
    }
  }

  doLogin(){
    this.authService.login(this.loginForm.value["email"], this.loginForm.value["password"]).subscribe(data =>{
      this._snackBar.open('Inicio de sesion exitoso', '',{
        duration:2000
      })
      this.router.navigate(['/', 'dashboard'])

    }, err =>{
      this._snackBar.open(err, '', {
        duration:2000
      })
    })
  }

  hasError(field: string): boolean{
    return this.loginForm.get(field).invalid;
  }

  hasErrorForValidation(field: string, validation: string): boolean{
    return this.loginForm.get(field).hasError(validation);
  }


  private initForm(){
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)])
    })
  }

}
