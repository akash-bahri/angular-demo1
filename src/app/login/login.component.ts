import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginError: string | null = null;


  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log("line 1");
    if (this.loginForm.valid) {
      console.log("line 2");
      
      if (this.authService.login(this.loginForm.value)) {
        this.loginError = null;
      } 
      else {
        console.log("line 3");
        this.loginError = 'Invalid username or password';
        setTimeout(() => {
          this.loginError = null;
        }, 1000);
      }
      
    }
    else {
      console.log("line 4");
      this.loginError = 'Form is invalid';
      setTimeout(() => {
        this.loginError = null;
      }, 1000);
    }
    console.log("line 5");
  }
 

}
