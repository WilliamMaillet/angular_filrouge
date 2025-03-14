import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>{{ isEditMode ? 'Modifier' : 'Ajouter' }} une voiture</h2>
      
      <div *ngIf="loading" class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Chargement...</span>
        </div>
      </div>
      
      <div *ngIf="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>
      
      <form (ngSubmit)="onSubmit()" *ngIf="!loading">
        <div class="form-group mb-3">
          <label for="brand">Marque</label>
          <input 
            type="text" 
            class="form-control" 
            id="brand" 
            name="brand" 
            [(ngModel)]="car.brand" 
            required
          >
        </div>
        
        <div class="form-group mb-3">
          <label for="model">Modèle</label>
          <input 
            type="text" 
            class="form-control" 
            id="model" 
            name="model" 
            [(ngModel)]="car.model" 
            required
          >
        </div>
        
        <div class="form-group mb-3">
          <label for="color">Couleur</label>
          <input 
            type="text" 
            class="form-control" 
            id="color" 
            name="color" 
            [(ngModel)]="car.color" 
            required
          >
        </div>
        
        <button type="submit" class="btn btn-primary me-2">{{ isEditMode ? 'Mettre à jour' : 'Ajouter' }}</button>
        <button type="button" class="btn btn-secondary" (click)="cancel()">Annuler</button>
      </form>
    </div>
  `
})
export class CarFormComponent implements OnInit {
  car: Car = { brand: '', model: '', color: '' };
  isEditMode = false;
  loading = false;
  errorMessage = '';

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!id;
    
    if (this.isEditMode && id) {
      this.loading = true;
      this.carService.getCar(Number(id)).subscribe({
        next: (car) => {
          this.car = car;
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors du chargement des données de la voiture';
          this.loading = false;
          console.error('Error loading car data:', error);
        }
      });
    }
  }

  onSubmit(): void {
    if (!this.car.brand || !this.car.model || !this.car.color) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    this.loading = true;
    
    if (this.isEditMode) {
      this.carService.updateCar(this.car).subscribe({
        next: () => {
          this.router.navigate(['/cars']);
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors de la mise à jour de la voiture';
          this.loading = false;
          console.error('Error updating car:', error);
        }
      });
    } else {
      this.carService.addCar(this.car).subscribe({
        next: () => {
          this.router.navigate(['/cars']);
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors de l\'ajout de la voiture';
          this.loading = false;
          console.error('Error adding car:', error);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/cars']);
  }
}