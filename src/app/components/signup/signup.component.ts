import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { MeResponse } from '../../models/auth/meResponse.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup
  @Input() user?: MeResponse
  icon: string
  text: string

  constructor(private userService: UserService, private _snackBar: MatSnackBar,
    private router: Router, private dialogRef: MatDialogRef<SignupComponent>) {
    this.icon = 'visibility'
    this.text = 'Registrate'
  }

  ngOnInit(): void {
    this.initForm()
    if(this.user)  this.text = 'Actualizar'
  }

  submit() {
    if(this.user === undefined) {
      this.userService.create(this.signUpForm.value).subscribe(response => {
        this._snackBar.open(response, '', {
          duration: 2000
        })
        this.router.navigate(['/'])
      }, err => {
        this._snackBar.open(err, '', {
          duration: 2000
        })
      })
    } else {
      this.userService.update(this.user.id, {...this.signUpForm.value}).subscribe(response => {
        this._snackBar.open(response, '', {
          duration: 2000
        })
        this.dialogRef.close('success')
      }, err => {
        this._snackBar.open(err, '', {
          duration: 2000
        })
      })
    }

  }

  toggleIcon() {
    if(this.icon === 'visibility_off') {
      this.icon = 'visibility'
    } else {
      this.icon = 'visibility_off'
    }
  }

  hasError(field: string): boolean {
    return this.signUpForm.get(field).invalid
  }

  hasErrorForValidation(field: string, validation: string): boolean {
    return this.signUpForm.get(field).hasError(validation)
  }

  private initForm() {
    this.signUpForm = new FormGroup({
      email: new FormControl({
        value:this.user?.email ?? "",
        disabled: !!this.user,
      }, [Validators.required, Validators.email]),
      name: new FormControl(this.user !== undefined ? this.user.seudonimo.split(" ")[0] :"", [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl(this.user !== undefined ? this.user.seudonimo.split(" ")[1] :"", [Validators.required, Validators.minLength(3)]),
    })
    if(this.user === undefined) {
      this.signUpForm.addControl('password', new FormControl("", [Validators.required, Validators.minLength(8)])
      )
    }
  }

}