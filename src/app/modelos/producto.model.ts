export class Producto {
    _id?: number
    codigoPro: number
    nombrePro: string
    precioPro: number
    categoriaPro: number
    fotoPro: string

    constructor( codigoPro: number, nombrePro:string, precioPro: number, categoriaPro: number, fotoPro:string){
        this.codigoPro = codigoPro
        this.nombrePro = nombrePro
        this.precioPro = precioPro
        this.categoriaPro = categoriaPro
        this.fotoPro = fotoPro
    }
}
