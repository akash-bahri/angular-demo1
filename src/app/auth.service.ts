import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
	private readonly AUTH_TOKEN_KEY = 'authToken';

	
	 isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

	users: any[];
	orders: any[];
	constructor(private router: Router,private userService: UserService) { 
		this.checkAuthenticationStatus();
		this.loadUsers();
		this.loadOrders();
	}

	private checkAuthenticationStatus() {
		const authToken = localStorage.getItem(this.AUTH_TOKEN_KEY);
		if (authToken) {
		  this.isAuthenticatedSubject.next(true);
		}
	  }

	loadUsers() {
		this.userService.getAllUsers().subscribe(
		  (data: any) => {
			this.users = data['data'];
		  },
		  (error) => {
			console.error('Error fetching users:', error);
		  }
		);
	}
	
	loadOrders() {
		let currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
	  
	
		if (currentUser && currentUser._id) {
		  let userId = currentUser._id;
		  this.userService.getOrders().subscribe(
			(data: any) => {
			  this.orders = data['data'].filter((order: any) => order.user._id === userId);
			},
			(error) => {
			  console.error('Error fetching orders:', error);
			}
		  );
		} else {
		
		  console.error('No current user found in localStorage');
		 
		}
	  
	
		return this.orders;
	  }
	  
	

	login(credentials: { username: string; password: string }): boolean {
		const currentUser=this.users.find((user) => credentials.username === user.username && credentials.password === user.password)
		if(currentUser){
			let temp = {username:currentUser.username,_id:currentUser._id};
			localStorage.setItem(this.AUTH_TOKEN_KEY, 'Y');
			localStorage.setItem('currentUser',JSON.stringify(temp));
			this.isAuthenticatedSubject.next(true);
			this.router.navigate(['/dashboard']);
			this.loadOrders();
			return true;
		}
		else if (credentials.username === 'demo' && credentials.password === 'password') {
			localStorage.setItem(this.AUTH_TOKEN_KEY, 'Y');
			this.isAuthenticatedSubject.next(true);
			this.router.navigate(['/dashboard']);
			return true;
		} else {
			this.isAuthenticatedSubject.next(false);
			return false;
		}
		
	}

	logout(): void {
		localStorage.clear();
		this.isAuthenticatedSubject.next(false);
		this.router.navigate(['/login']);
		this.orders=[];
	}

	register(credentials: { username: string; password: string }): boolean {
		this.userService.postUser(credentials.username,credentials.password).subscribe( (data: any) => {
			const status = data['status'];
			console.log(status);
			if(status=='success'){
				this.loadUsers();
				this.router.navigate(['/login']);
				return true;
			}
			else{
				this.isAuthenticatedSubject.next(false);
				return false;
			}
		  },
		  (error) => {
			console.error('Error fetching users:', error);
		  }
		);
		return false;
	}

	createOrder(cart: any): boolean {
		this.userService.postOrder(cart,JSON.parse(localStorage.getItem('currentUser') as string)).subscribe( (data: any) => {
			const status = data['status'];
			console.log(status);
			if(status=='success'){
				this.loadOrders();
				//this.router.navigate(['/orders']);
				return true;
			}
			else{
				this.isAuthenticatedSubject.next(false);
				return false;
			}
		  });
		  return false;
	}

	deleteOrder(order: any): boolean {
		this.userService.deleteOrder(order).subscribe( (data: any) => {
			const status = data['status'];
			console.log(status);
			if(status=='success'){
				this.loadOrders();
				this.router.navigate(['/orders']);
				return true;
			}
			else{
				this.isAuthenticatedSubject.next(false);
				return false;
			}
		  });
		  return false;
	}

	isAuthenticated(): boolean {
		return this.isAuthenticatedSubject.value;
	}
}
