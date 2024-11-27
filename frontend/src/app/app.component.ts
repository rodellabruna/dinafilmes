import { Component } from '@angular/core';
import { AuthService } from './services/auth.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dina-Fimes';

  constructor(private authService: AuthService) {
    // Ao inicializar o app, verificar se há usuário logado
    this.authService.checkLocalStorageForUser();
  }
  
  
}
