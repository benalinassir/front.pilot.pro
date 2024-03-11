import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Avion } from '../../models/avions/avions.model'; // Import du modèle de données Avion
import { AvionsService } from '../../services/avions/avions.service'; // Import du service AvionsService

@Component({
  selector: 'app-avions',
  templateUrl: './avions.component.html',
  styleUrls: ['./avions.component.css']
})
export class AvionsComponent implements OnInit {
  public avions: Avion[] = []; // Tableau pour stocker les avions récupérés
  public displayedColumns: string[] = ['numavion', 'nomavion', 'capacite', 'localisation']; // Colonnes à afficher dans le tableau
  public dataSource!: MatTableDataSource<any>; // Source de données pour le tableau

  // Récupération des éléments de pagination et de tri
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private avionsService: AvionsService) { }

  // Méthode exécutée lors de l'initialisation du composant
  public ngOnInit(): void {
    this.getAllAvions(); // Appel de la méthode pour récupérer tous les avions
  }

  // Méthode pour récupérer tous les avions
  public getAllAvions(): void {
    this.avionsService.getPlanes().subscribe(
      (data: Avion[]) => {
        this.avions = data; // Attribution des avions récupérés au tableau avions
        console.log('avions', this.avions); // Affichage des avions dans la console
        // Configuration de la source de données pour le tableau
        this.dataSource = new MatTableDataSource(data);
        // Configuration du paginator et du sort
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Une erreur s\'est produite :', error); // Affichage de l'erreur dans la console en cas de problème
      }
    );
  }

  // Méthode pour appliquer un filtre sur les données du tableau
  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
