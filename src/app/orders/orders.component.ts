import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any[];

  constructor(
    private authService: AuthService, 
    private changeDetectorRef: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.reloadComponent();
  }

  reloadComponent() {
    this.orders = this.authService.loadOrders();
    let currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
  //   if (currentUser && currentUser._id) {
  //     let userId = currentUser._id;
      
  //         this.orders = this.orders.filter((orderItem => orderItem.user._id === userId));
       
  // }
}

  calculateTotal(order: any) {
    return order.items.reduce((total: number, item: any) => total + parseFloat(item.price), 0);
  }

  deleteOrder(order: any) {
    this.orders = this.orders.filter(orderItem => orderItem._id !== order._id);
    
    this.authService.deleteOrder(order);
    this.reloadComponent();
    
    this.changeDetectorRef.detectChanges(); // Trigger change detection
  }
}
