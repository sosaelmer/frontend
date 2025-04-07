import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserDTO } from './interfaces/products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private router: Router) { 
  }

  title = 'parcial2';

  user: UserDTO = {
    nombre: '',
    valor: 0,
    
  };

  onUserSubmitted(userData: UserDTO) {
    this.user = userData; 
    console.log(this.user);
    this.router.navigate(['/productos']).then(success => {
      if (success) {
        console.log('navigation success');
      } else {
        console.log('navigation failed');
      }
    });
  }

}
