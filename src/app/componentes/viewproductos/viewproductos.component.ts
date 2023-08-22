import { Component } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto.service';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewproductos',
  templateUrl: './viewproductos.component.html',
  styleUrls: ['./viewproductos.component.css']
})
export class ViewproductosComponent {
  productos: any
  categorias: any
  display = "none"
  idProducto: any
  url: any

  constructor(private productoService: ProductoService, private categoriaService: CategoriaService, private router: Router) {
    this.url = "http://127.0.0.1:8000/media/fotos"
  }

  getProductos() {
    this.productoService.getProductos().subscribe(res => {
      this.productos = res
    })
  }

  getCategorias(){
    this.categoriaService.getCategorias().subscribe(res=>{
      this.categorias = res
    })
  }

  closeModal(){
    this.display = "none"
  }

  openModalDelete(id:number){
    this.display = "block"
    this.idProducto = id
  }

  deleteProducto() {
    this.productoService.deleteProducto(this.idProducto).subscribe(res=>{
      this.router.navigate(["/","producto"])
    }, err => {
      console.log(err)
    })
    this.closeModal()
  }

  ngOnInit(): void {
    this.getCategorias()
    this.getProductos()
  }
}
