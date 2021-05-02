import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { CartsService } from 'src/app/cart/carts.service';
import { AppState } from 'src/app/store/models/app-state.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSubscription$: Subscription;
  user: User = null;
  cartItemCount: number;

  constructor(
    private authService: AuthService,
    private cartService: CartsService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.userSubscription$ = this.authService.user.subscribe(
      (user) => (this.user = user)
    );

    this.cartService.cartUpdate.subscribe(() => {
      this.store
        .select((store) => store.cart.items.length)
        .subscribe((itemCount) => (this.cartItemCount = itemCount));
    });
  }

  ngOnDestroy(): void {
    this.userSubscription$.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
