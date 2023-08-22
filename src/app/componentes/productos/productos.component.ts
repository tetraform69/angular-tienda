import { Component } from '@angular/core';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { Producto } from 'src/app/modelos/producto.model';
import { FormGroup, Validator, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-productos',
    templateUrl: './productos.component.html',
    styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
    public form!: FormGroup
    public producto!: Producto
    public mensaje: string = ""
    categorias: any
    pathFoto: any

    constructor(private location: Location, private productoService: ProductoService, private categoriaService: CategoriaService, private router: Router) { }

    listarCategorias() {
        this.categoriaService.getCategorias().subscribe(res => {
            this.categorias = res
        })
    }

    addProducto(formValue: any) {

        const formData = new FormData()

        if (this.form.valid) {
            var codigo = formValue.codigo
            var nombre = formValue.nombre
            var precio = formValue.precio
            var categoria = formValue.categoria
            var foto = formValue.fileFoto
            formData.append('codigoPro', formValue.codigo)
            formData.append('nombrePro', formValue.nombre)
            formData.append('precioPro', formValue.precio)
            formData.append('categoriaPro', formValue.categoria)
            formData.append('fotoPro', this.form.get('foto')?.value)
            this.producto = new Producto(codigo, nombre, precio, categoria, foto)
        }
        this.productoService.addProducto(formData).subscribe(res => {
            console.log(res)
            this.router.navigate(["/", "productos"])
        }, err => {
            console.log(err)
            this.mensaje = err.message
        })
    }

    onFileSelect(event: any) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0]
            this.pathFoto = URL.createObjectURL(file)
            this.form.get('foto')?.setValue(file)
        }
    }

    ngOnInit(): void {
        this.listarCategorias()
        this.form = new FormGroup({
            codigo: new FormControl("", [Validators.required]),
            nombre: new FormControl("", [Validators.required, Validators.maxLength(60)]),
            precio: new FormControl("", [Validators.required]),
            categoria: new FormControl("", [Validators.required]),
            foto: new FormControl("", [Validators.required]),
        })
    }
}
