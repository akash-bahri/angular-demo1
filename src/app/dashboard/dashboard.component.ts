import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  items: any[]=[];
  cart: any[];
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadItems();
    this.cart=[];
  }

  loadItems() {
    this.userService.getCatalog().subscribe(
      (data: any) => {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        this.items = data['data'].map((item:any) => {
          item.addedToCart = cart.some((cartItem:any) => cartItem._id === item._id);
          return item;
        });
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
    );
  }
  

  addToCart(item: any) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  
    // Check if the item is already in the cart
    const isItemInCart = cart.find((cartItem:any) => cartItem._id === item._id);
  
    if (!isItemInCart) {
      // If item is not in cart, add it
      item.addedToCart = true;
      cart.push(item);
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      // Item already in cart, you can set addedToCart to true or handle as needed
      item.addedToCart = true;
    }
  }
  

}
