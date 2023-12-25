import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  userForm = {
    name: '',
    username: '',
    password: '',
    email: '',
    mobile: ''
  }
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  submitForm(usrForm: NgForm) {
    console.log(usrForm)
    if(usrForm.status === "VALID") {
      this.authService.registerUser(this.userForm)
      .subscribe((res: any)=>{
        console.log('registration success::', res)
        localStorage.setItem('user', JSON.stringify({
          email: res.email,
          mobile: res.mobile,
          name: res.name,
          username: res.username,
          userId: res._id
        }))
      })
    } else {
      alert('please fill all the fields properly');
    }
  }
}
