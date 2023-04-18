import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
 
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  errorMessage: string ="";

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  login() {
    // Prepare the request body
    const userLogin = { UserName: this.username, Password: this.password };

    // Make POST request to the login API
    this.http.post('https://localhost:7206/api/login', userLogin).subscribe(
      (response: any) => {
       
        // Handle successful login
        console.log('Login successful');
        this.router.navigate(['/home']);
        // Do something with the response, e.g. store token, navigate to dashboard, etc.
      },
      (error: any) => {
        // Handle error response
        console.error('Login failed:', error);
        this.errorMessage = error.error;
      }
    );
  }
}
