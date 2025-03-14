import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div *ngIf="loading" class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Chargement...</span>
        </div>
      </div>
      
      <div *ngIf="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>
      
      <div *ngIf="car" class="card">
        <div class="card-header">
          <h2>{{ car.brand }} {{ car.model }}</h2>
        </div>
        <div class="card-body">
          <p><strong>ID:</strong> {{ car.id }}</p>
          <p><strong>Marque:</strong> {{ car.brand }}</p>
          <p><strong>Modèle:</strong> {{ car.model }}</p>
          <p><strong>Couleur:</strong> {{ car.color }}</p>
        </div>
        <div class="card-footer">
          <a routerLink="/cars" class="btn btn-secondary me-2">Retour à la liste</a>
          <a *ngIf="authService.isAdmin()" [routerLink]="['/cars/edit', car.id]" class="btn btn-warning me-2">Modifier</a>
          <button *ngIf="authService.isAdmin()" (click)="deleteCar()" class="btn btn-danger">Supprimer</button>
        </div>
      </div>
    </div>
  `
})
export class CarDetailComponent implements OnInit {
  car: Car | null = null;
  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadCar(id);
    } else {
      this.errorMessage = 'ID de voiture invalide';
      this.loading = false;
    }
  }

  loadCar(id: number): void {
    this.carService.getCar(id).subscribe({
      next: (car) => {
        this.car = car;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des détails de la voiture';
        this.loading = false;
        console.error('Error loading car details:', error);
      }
    });
  }

  deleteCar(): void {
    if (!this.car || !this.car.id) return;
    
    if (confirm('Êtes-vous sûr de vouloir supprimer cette voiture ?')) {
      this.carService.deleteCar(this.car.id).subscribe({
        next: () => {
          this.router.navigate(['/cars']);
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors de la suppression de la voiture';
          console.error('Error deleting car:', error);
        }
      });
    }
  }
}