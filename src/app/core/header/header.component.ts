import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart/cart.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatBadge } from '@angular/material/badge';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    MatToolbar,
    RouterLink,
    MatTooltip,
    MatIconButton,
    MatMenuTrigger,
    MatIcon,
    MatBadge,
    MatMenu,
    MatMenuItem,
    AsyncPipe,
  ],
})
export class HeaderComponent implements OnInit {
  totalInCart$!: Observable<number>;

  constructor(private readonly cartService: CartService) {}

  ngOnInit(): void {
    this.totalInCart$ = this.cartService.totalInCart$;
  }
}
