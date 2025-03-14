import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h2>Liste des Voitures</h2>
      
      <div *ngIf="loading" class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Chargement...</span>
        </div>
      </div>
      
      <div *ngIf="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>
      
      <div *ngIf="!loading && !errorMessage && cars.length === 0" class="alert alert-info">
        Aucune voiture disponible.
      </div>
      
      <div class="row">
        <div *ngFor="let car of cars" class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ car.brand }} {{ car.model }}</h5>
              <p class="card-text">
                <strong>ID:</strong> {{ car.id }}<br>
                <strong>Marque:</strong> {{ car.brand }}<br>
                <strong>Modèle:</strong> {{ car.model }}<br>
                <strong>Couleur:</strong> {{ car.color }}
              </p>
              <div class="d-flex">
                <a [routerLink]="['/cars', car.id]" class="btn btn-info btn-sm me-2">Détails</a>
                <a *ngIf="authService.isAdmin()" [routerLink]="['/cars/edit', car.id]" class="btn btn-warning btn-sm me-2">Modifier</a>
                <button *ngIf="authService.isAdmin()" (click)="deleteCar(car.id)" class="btn btn-danger btn-sm">Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div *ngIf="authService.isAdmin()" class="mt-3">
        <a routerLink="/cars/add" class="btn btn-primary">Ajouter une voiture</a>
      </div>
    </div>
  `
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private carService: CarService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.loading = true;
    this.carService.getCars().subscribe({
      next: (cars) => {
        this.cars = cars;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des voitures';
        this.loading = false;
        console.error('Error loading cars:', error);
      }
    });
  }

  deleteCar(id?: number): void {
    if (!id) return;
    
    if (confirm('Êtes-vous sûr de vouloir supprimer cette voiture ?')) {
      this.carService.deleteCar(id).subscribe({
        next: () => {
          this.cars = this.cars.filter(car => car.id !== id);
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors de la suppression de la voiture';
          console.error('Error deleting car:', error);
        }
      });
    }
  }
}