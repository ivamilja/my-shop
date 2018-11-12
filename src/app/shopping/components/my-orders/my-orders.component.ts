import { switchMap } from 'rxjs/operators';
import { AuthService } from 'shared/services/auth.service';
import { Component} from '@angular/core';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders$;
  constructor(private orderService: OrderService, private authService: AuthService) {
      this.orders$=authService.user$.pipe(switchMap(user=>orderService.getOrdersByUser(user.uid)));
  }
 

}
