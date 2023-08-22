import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/modelos/categoria.model';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  public frmCategoria!: FormGroup
  public categoria!: Categoria
  public mensaje: string = ""
  public listaCategorias: any

  constructor(private location: Location, private service: CategoriaService) { }

  getCategorias() {
    this.service.getCategorias().subscribe(data => {
      console.log(data)
      this.listaCategorias = data
    }, err => {
      console.log(err)
    })
  }

  public addCategoria = (frmCategoriaValue: { nombreCat: string }) => {
    if (this.frmCategoria.valid) {
      this.categoria = new Categoria(frmCategoriaValue.nombreCat.valueOf())
    }
    this.service.addCategoria(this.categoria).subscribe(res => {
      console.log(res)
      this.mensaje = "Funciono, se agrego la categoria"
    }, err => {
      console.log(err)
      this.mensaje = "No Funciona :c"
    })
  }

  ngOnInit(): void {
    this.frmCategoria = new FormGroup({
      nombreCat: new FormControl('', [
        Validators.required, Validators.maxLength(60)
      ])
    })
  }

}
