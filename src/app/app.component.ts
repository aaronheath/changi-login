import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import 'rxjs/add/operator/map';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  feedback: string;
  inProgress = false;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember_email: true,
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.restoreStoredEmail();
  }

  onSubmit(event) {
    event.preventDefault();

    this.inProgress = true;
    this.feedback = '';

    const {email, password, remember_email} = this.form.value;

    this.storeEmail(remember_email);

    this.authService.login(email, password).subscribe(response => {
      this.redirect();
    }, response => {
      console.log(response);
      this.feedback = response.error.msg ? response.error.msg : response.error;
      this.inProgress = false;
    });
  }

  invalidForm() {
    return this.form.invalid;
  }

  disableSubmitBtn() {
    return this.invalidForm() || this.inProgress;
  }

  private storeEmail(remember) {
    if(remember) {
      localStorage.setItem('email', this.form.value.email);
    } else {
      localStorage.removeItem('email');
    }
  }

  private restoreStoredEmail() {
    const email = localStorage.getItem('email');

    if(email) {
      this.form.patchValue({email});
    }
  }

  private redirect() {
    console.log('Login successful.');
  }
}
