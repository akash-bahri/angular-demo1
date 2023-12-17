import { Component , OnInit} from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  status: any;
  cart: any[];

  ngOnInit() {
    this.loadCart();
    this.status="";
  }
  constructor(private authservice: AuthService) {}
  loadCart() {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
  }
  removeFromCart(item: any) {
    item.addedToCart = false;
    this.cart = this.cart.filter(cartItem => cartItem._id !== item._id);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.loadCart();
  }
  checkout(){
    this.authservice.createOrder(this.cart);
    this.cart=[];
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.loadCart();
    this.authservice.loadOrders();
    this.status="Order Placed Successfully";
  }

}
