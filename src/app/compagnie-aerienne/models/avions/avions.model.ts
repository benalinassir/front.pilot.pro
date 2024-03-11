export class Avion {
    numAvion: number;
    nomAvion: string;
    capacite: number;
    localisation: string;

    constructor(numAvion: number, nomAvion: string, capacite: number, localisation: string) {
        this.numAvion = numAvion;
        this.nomAvion = nomAvion;
        this.capacite = capacite;
        this.localisation = localisation;
    }
}
