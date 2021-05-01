import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$: Subject<User> = null;
  user: User = null;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user$ = this.authService.user;
    this.authService.user.subscribe((user) => (this.user = user));
  }

  onLogout() {
    this.authService.logout();
  }
}
