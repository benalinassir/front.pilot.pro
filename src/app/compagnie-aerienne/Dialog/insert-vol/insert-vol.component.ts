import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Avion } from '../../models/avions/avions.model'; // Import du modèle de données Avion
import { Pilot } from '../../models/pilots/pilots.model'; // Import du modèle de données Pilot
import { AvionsService } from '../../services/avions/avions.service'; // Import du service AvionsService
import { PilotsService } from '../../services/pilots/pilots.service'; // Import du service PilotsService

@Component({
  selector: 'app-insert-vol',
  templateUrl: './insert-vol.component.html',
  styleUrls: ['./insert-vol.component.css']
})
export class InsertVolComponent implements OnInit {
  public formGroup!: FormGroup; // Formulaire de saisie des données du vol
  public pilotes: Pilot[] = []; // Tableau pour stocker les pilotes récupérés
  public avions: Avion[] = []; // Tableau pour stocker les avions récupérés

  constructor(
    private pilotsService: PilotsService, // Service pour la gestion des pilotes
    private avionsService: AvionsService, // Service pour la gestion des avions
    private formBuilder: FormBuilder, // Service pour la construction des formulaires
    public dialogRef: MatDialogRef<InsertVolComponent>, // Référence de la boîte de dialogue
    @Inject(MAT_DIALOG_DATA) public data: any, // Données injectées dans la boîte de dialogue
  ) {
    // Appel des méthodes pour récupérer les avions et les pilotes
    this.getAllAvions();
    this.getAllPilotes();
  }

  // Méthode exécutée lors de l'initialisation du composant
  public ngOnInit(): void {
    // Création du formulaire avec les champs numVol, numPilote, numAvion, villeDepart, villeArrivee, heureDepart, heureArrivee
    this.formGroup = this.formBuilder.group({
      numVol: [null],
      numPilote: [null],
      numAvion: [null],
      villeDepart: [null],
      villeArrivee: [null],
      heureDepart: [null],
      heureArrivee: [null]
    });
  }

  // Méthode appelée lors de la fermeture de la boîte de dialogue
  public onNoClick(): void {
    this.dialogRef.close();
  }

  // Méthode appelée lors de la soumission du formulaire
  public onSubmit(): void {
    // Fermeture de la boîte de dialogue avec les données du formulaire
    this.dialogRef.close(this.formGroup.value);
  }

  // Méthode pour récupérer tous les pilotes
  public getAllPilotes(): void {
    this.pilotsService.getPilots().subscribe(
      (data: Pilot[]) => {
        this.pilotes = data; // Attribution des pilotes récupérés au tableau pilotes
        console.log('pilotes', this.pilotes); // Affichage des pilotes dans la console
      },
      (error) => {
        console.error('Une erreur s\'est produite :', error); // Affichage de l'erreur dans la console en cas de problème
      }
    );
  }

  // Méthode pour récupérer tous les avions
  public getAllAvions(): void {
    this.avionsService.getPlanes().subscribe(
      (data: Avion[]) => {
        this.avions = data; // Attribution des avions récupérés au tableau avions
        console.log('avions', this.avions); // Affichage des avions dans la console
      },
      (error) => {
        console.error('Une erreur s\'est produite :', error); // Affichage de l'erreur dans la console en cas de problème
      }
    );
  }
}
