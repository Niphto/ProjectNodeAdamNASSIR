import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private authService: AuthService, private userService: UserService) {}

  login() {
    this.userService.authenticate(this.credentials.email, this.credentials.password).subscribe({
      next: (response) => {
        this.authService.login(response.user_id);
      },
      error: (error) => {
      }
    });
  }
}


