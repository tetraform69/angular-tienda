import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Producto } from '../modelos/producto.model';

@Injectable({
    providedIn: 'root'
})
export class ProductoService {

    url = 'http://127.0.0.1:8000/producto'

    constructor(private http: HttpClient) { }

    getProductos(): Observable<any> {
        return this.http.get(this.url)
    }

    getProducto(id: String): Observable<any> {
        return this.http.get(this.url + "/" + id)
    }

    deleteProducto(id: String): Observable<any> {
        return this.http.delete(this.url + "/" + id)
    }

    addProducto(producto: any): Observable<any> {
        return this.http.post(this.url, producto)
    }

    editProducto(id: Number, producto: any): Observable<any> {
        return this.http.put(this.url + "/" + id, producto)
    }
}
