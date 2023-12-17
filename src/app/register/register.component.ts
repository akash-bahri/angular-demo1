import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  registerForm: FormGroup;
  erormessage: string | null = null;
  
  constructor(private formBuilder: FormBuilder,private authService:AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.erormessage = null;
      if (this.authService.register(this.registerForm.value)) {
        this.erormessage = null;
      } else {
        this.erormessage = 'Invalid username or password';
      }
    }
    else{
      this.erormessage="Invalid username or password";
    }
  }

}
