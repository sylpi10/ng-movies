import { Component, OnInit } from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  private _navigation: Navigation;

  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this._navigation = this.router.getCurrentNavigation();
   }
  
   public get firstName(): AbstractControl {
    return this.registerForm.controls.firstName;
  }

  public get lastName(): AbstractControl {
    return this.registerForm.controls.lastName;
  }

  public get email(): AbstractControl {
    return this.registerForm.controls.email;
  }

  public get username(): AbstractControl {
    return this.registerForm.controls.username;
  }

  public get password(): AbstractControl {
    return this.registerForm.controls.password;
  }


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: [
        '',
        Validators.compose([
          Validators.required,Validators.minLength(2)]
        )
      ],
      lastName: [
        '',
        Validators.compose([
          Validators.required,Validators.minLength(2)]
        )
      ],
      email: [
        '',
        Validators.compose([
          Validators.required,Validators.minLength(3)]
        )
      ],
      username: [
        '',
        Validators.compose(
          [Validators.required, Validators.minLength(5)]
        )
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,Validators.minLength(8)]
        )
      ]
    });
  }


  public createAccount(): void {
    console.log('You did create an account, congrats !')
  }
}
