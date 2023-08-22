import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Categoria } from '../modelos/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  url = 'http://127.0.0.1:8000/categoria'

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<any> {
    return this.http.get(this.url)
  }

  getCategoria(id: String): Observable<any> {
    return this.http.get(this.url + "/" + id)
  }

  deleteCategoria(id: String): Observable<any> {
    return this.http.delete(this.url + "/" + id)
  }

  addCategoria(categoria: Categoria): Observable<any> {
    return this.http.post(this.url, categoria)
  }

  editCategoria(id: String, categoria: Categoria): Observable<any> {
    return this.http.put(this.url + "/" + id, categoria)
  }
}
