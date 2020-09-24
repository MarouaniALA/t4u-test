import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(public authService: AuthService, private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      fullName: [],
    });
  }

  googleAuth() {
    this.authService.GoogleAuth(this.loginForm.get('fullName').value);
  }
}
