import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ConsultVolComponent } from '../../Dialog/consult-vol/consult-vol.component';
import { DeleteVolComponent } from '../../Dialog/delete-vol/delete-vol.component';
import { InsertVolComponent } from '../../Dialog/insert-vol/insert-vol.component';
import { UpdateVolComponent } from '../../Dialog/update-vol/update-vol.component';
import { Vol } from '../../models/vols/vols.model';
import { VolsService } from '../../services/vols/vols.service';

@Component({
  selector: 'app-vols',
  templateUrl: './vols.component.html',
  styleUrls: ['./vols.component.css']
})
export class VolsComponent implements OnInit {
  public vols: Vol[] = []; // Tableau pour stocker les vols récupérés
  public displayedColumns: string[] = ['numvol', 'numavion', 'numpilote', 'villedep', 'heuredep', 'villearr', 'heurearr', 'action']; // Colonnes à afficher dans le tableau
  public dataSource!: MatTableDataSource<any>; // Source de données pour le tableau

  // Récupération des éléments de pagination et de tri
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private VolsService: VolsService, public dialog: MatDialog, private toastr: ToastrService) { }

  // Méthode exécutée lors de l'initialisation du composant
  public ngOnInit(): void {
    // Récupération des vols depuis le service
    this.VolsService.getFlights().subscribe(
      (data: Vol[]) => {
        this.vols = data;
        console.log(this.vols); // Affichage des vols récupérés dans la console
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

  // Méthode pour ajouter un nouveau vol
  public addVol(): void {
    const dialogRef = this.dialog.open(InsertVolComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result != undefined) {
        // Création d'un objet Vol à partir des données saisies
        const payload: Vol = {
          numvol: result.numVol,
          numpilote: result.numPilote,
          numavion: result.numAvion,
          villedep: result.villeDepart,
          villearr: result.villeArrivee,
          heuredep: result.heureDepart,
          heurearr: result.heureArrivee
        };
        // Appel du service pour créer un nouveau vol
        this.VolsService.createFlight(payload)
          .subscribe(
            (response) => {
              console.log('Vol créé avec succès:', response); // Affichage du succès dans la console
              // Actualisation des vols après la création du nouveau vol
              this.VolsService.getFlights().subscribe(
                (data: Vol[]) => {
                  this.vols = data;
                  console.log(this.vols); // Affichage des vols dans la console
                  // Configuration de la source de données pour le tableau
                  this.dataSource = new MatTableDataSource(data);
                  // Configuration du paginator et du sort
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
                  // Affichage d'un message de succès avec Toastr
                  this.toastr.success('Vol créé avec succès:', 'vol crée!');
                },
                (error) => {
                  console.error('Une erreur s\'est produite :', error); // Affichage de l'erreur dans la console en cas de problème
                }
              );
            },
            (error) => {
              console.error('Erreur lors de la création du vol:', error); // Affichage de l'erreur dans la console en cas de problème
              // Affichage d'un message d'erreur avec Toastr
              this.toastr.error('Erreur lors de la création du vol:');
            }
          );
      } else {
        // Affichage d'un message d'info avec Toastr en cas d'annulation de la création du vol
        this.toastr.info('Erreur lors de la création du vol:', 'Creation Annuler!');
      }
    });
  }

  // Méthode pour consulter un vol
  public consultVol(vol: Vol): void {
    console.log('Ajouter le vol:', vol);
    const dialogRef = this.dialog.open(ConsultVolComponent, {
      data: { vol: vol },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  // Méthode pour supprimer un vol
  public deleteVol(vol: Vol): void {
    var myvol = vol.numvol;
    const dialogRef = this.dialog.open(DeleteVolComponent, {
      data: { vol: vol },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result == 'OK' && myvol) {
        // Appel du service pour supprimer le vol
        this.VolsService.deleteFlight(myvol)
          .subscribe(
            () => {
              // Actualisation des vols après la suppression du vol
              this.VolsService.getFlights().subscribe(
                (data: Vol[]) => {
                  this.vols = data;
                  console.log(this.vols); // Affichage des vols dans la console
                  // Configuration de la source de données pour le tableau
                  this.dataSource = new MatTableDataSource(data);
                  // Configuration du paginator et du sort
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
                  console.log('Vol supprimé avec succès'); // Affichage du succès dans la console
                  // Affichage d'un message de succès avec Toastr
                  this.toastr.success('Vol supprimé avec succès');
                },
                (error) => {
                  console.error('Une erreur s\'est produite :', error); // Affichage de l'erreur dans la console en cas de problème
                }
              );
            },
            (error) => {
              console.error('Erreur lors de la suppression du vol:', error); // Affichage de l'erreur dans la console en cas de problème
              // Affichage d'un message d'erreur avec Toastr
              this.toastr.error('Erreur lors de la suppression du vol');
            }
          );
      }
    });
  }

  // Méthode pour éditer un vol
  public editVol(vol: Vol): void {
    console.log('Ajouter le vol:', vol);
    const dialogRef = this.dialog.open(UpdateVolComponent, {
      data: { vol: vol },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // Affichage d'un message de warning avec Toastr
      this.toastr.warning('Hello world!', 'Toastr fun!');
    });
  }
}
