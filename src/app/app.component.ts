import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Http} from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  form = this.fb.group({
    email: '',
    password: '',
  });

  constructor(private fb: FormBuilder, private http: Http) {}

  onSubmit(event) {
    event.preventDefault();

    console.log('submitted', this.form.value);

    this.http
      .get('http://api.icndb.com/jokes/random')
      .map(response => response.json())
      .subscribe(response => console.log(response));

    console.log('here', event);
  }
}
