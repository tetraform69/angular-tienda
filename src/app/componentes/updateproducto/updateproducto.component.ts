import { Component } from '@angular/core';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { Producto } from 'src/app/modelos/producto.model';
import { FormGroup, Validator, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-updateproducto',
    templateUrl: './updateproducto.component.html',
    styleUrls: ['./updateproducto.component.css']
})
export class UpdateproductoComponent {
    public form!: FormGroup
    public producto!: Producto
    public idProducto!: any
    public mensaje: string = ""
    categorias: any
    pathFoto: any

    constructor(private productoService: ProductoService, private categoriaService: CategoriaService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.listarCategorias()
        this.route.params.subscribe((params: Params) => {
            this.idProducto = params['id']
        })
        this.getProducto()
        this.form = new FormGroup({
            codigo: new FormControl("", [Validators.required]),
            nombre: new FormControl("", [Validators.required, Validators.maxLength(60)]),
            precio: new FormControl("", [Validators.required]),
            categoria: new FormControl("", [Validators.required]),
            foto: new FormControl("", [Validators.required]),
        })
    }

    getProducto() {
        this.productoService.getProducto(this.idProducto).subscribe(res => {
            this.producto = res
            this.form.setValue({
                codigo: this.producto.codigoPro,
                nombre: this.producto.nombrePro,
                precio: this.producto.precioPro,
                categoria: this.producto.categoriaPro,
                foto: ""
            })
        })
    }

    listarCategorias() {
        this.categoriaService.getCategorias().subscribe(res => {
            this.categorias = res
        })
    }

    onFileSelect(event: any) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0]
            this.pathFoto = URL.createObjectURL(file)
            this.form.get('foto')?.setValue(file)
        }
    }

    updateProducto(formValue: any) {

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
        this.productoService.editProducto(this.idProducto, formData).subscribe(res => {
            console.log(res)
            this.router.navigate(["/", "productos"])
        }, err => {
            console.log(err)
            this.mensaje = err.message
        })
    }
}
