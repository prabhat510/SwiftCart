import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit, AfterViewInit {

  @Output() hideForm: EventEmitter<any> = new EventEmitter<any>();
  userForm = {
    name: '',
    username: '',
    password: '',
    email: '',
    mobile: ''
  }
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // (document.querySelector('.form-container') as HTMLElement).style.backgroundColor = "black";    
  }

  submitForm(usrForm: NgForm) {
    console.log(usrForm)
    if(usrForm.status === "VALID") {
      this.authService.registerUser(this.userForm)
      .subscribe((res: any)=>{
        console.log('registration success::', res)
        localStorage.setItem('user', JSON.stringify({
          token: res.token,
          email: res.email,
          mobile: res.mobile,
          name: res.name,
          username: res.username,
          userId: res._id
        }))
        this.hideForm.emit();
      })
    } else {
      alert('please fill all the fields properly');
    }
  }
}
