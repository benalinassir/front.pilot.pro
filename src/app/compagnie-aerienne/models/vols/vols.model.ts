export class Vol {
    numvol: string  | null;
    numpilote: number  | null;
    numavion: number  | null;
    villedep: string  | null;
    villearr: string  | null;
    heuredep: Date  | null;
    heurearr: Date  | null;


    constructor(
        numvol: string,
        numpilote: number,
        numavion: number,
        villedep: string,
        villearr: string,
        heuredep: Date,
        heurearr: Date
    ) {
        this.numvol = numvol;
        this.numpilote = numpilote;
        this.numavion = numavion;
        this.villedep = villedep;
        this.villearr = villearr;
        this.heuredep = heuredep;
        this.heurearr = heurearr;
    }
}
