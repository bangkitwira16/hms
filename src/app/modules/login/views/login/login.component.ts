import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userApiPath } from 'src/app/constants/api-const';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  isSubmitting: boolean = false
  constructor(private fb: FormBuilder, private baseService: BaseService, private router: Router) { 
    this.loginForm = this.fb.group({})
  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(): FormGroup {
    return this.loginForm = this.fb.group({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
  }

  submit() {
    this.isSubmitting= true
    const params = this.loginForm.getRawValue()
    this.baseService.getData(userApiPath, params)
    .subscribe(res => {
      if (res) {
        localStorage.setItem('user', JSON.stringify(res[0]))
        this.router.navigate([''])
      }
    this.isSubmitting= false
    }, err => {
      this.isSubmitting= false
    })
  }

}
