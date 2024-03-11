import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pilot } from '../../models/pilots/pilots.model'; // Import du modèle de données Pilot
import { PilotsService } from '../../services/pilots/pilots.service'; // Import du service PilotsService

@Component({
  selector: 'app-pilotes',
  templateUrl: './pilotes.component.html',
  styleUrls: ['./pilotes.component.css']
})
export class PilotesComponent implements OnInit {
  public pilotes: Pilot[] = []; // Tableau pour stocker les pilotes récupérés
  public displayedColumns: string[] = ['numpilote', 'nompilote', 'adresse']; // Colonnes à afficher dans le tableau
  public dataSource!: MatTableDataSource<any>; // Source de données pour le tableau

  // Récupération des éléments de pagination et de tri
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private pilotsService: PilotsService) { }

  // Méthode exécutée lors de l'initialisation du composant
  ngOnInit(): void {
    this.getAllPilotes(); // Appel de la méthode pour récupérer tous les pilotes
  }

  // Méthode pour récupérer tous les pilotes
  public getAllPilotes(): void {
    this.pilotsService.getPilots().subscribe(
      (data: Pilot[]) => {
        this.pilotes = data; // Attribution des pilotes récupérés au tableau pilotes
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
