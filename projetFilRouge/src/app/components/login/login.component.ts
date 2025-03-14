import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h3 class="text-center">Connexion</h3>
            </div>
            <div class="card-body">
              <div *ngIf="errorMessage" class="alert alert-danger">
                {{ errorMessage }}
              </div>
              <form (ngSubmit)="onSubmit()">
                <div class="form-group mb-3">
                  <label for="username">Nom d'utilisateur</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="username" 
                    name="username" 
                    [(ngModel)]="username" 
                    required
                  >
                </div>
                <div class="form-group mb-3">
                  <label for="password">Mot de passe</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="password" 
                    name="password" 
                    [(ngModel)]="password" 
                    required
                  >
                </div>
                <button type="submit" class="btn btn-primary w-100">Se connecter</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.errorMessage = '';
    
    if (!this.username || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: (user) => {
        if (user) {
          this.router.navigate(['/cars']);
        } else {
          this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect';
        }
      },
      error: (error) => {
        this.errorMessage = 'Une erreur est survenue lors de la connexion';
        console.error('Login error:', error);
      }
    });
  }
}