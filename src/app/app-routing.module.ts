import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './componentes/inicio/inicio.component';
import { CategoriaComponent } from './componentes/categoria/categoria.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { ViewproductosComponent } from './componentes/viewproductos/viewproductos.component';
import { UpdateproductoComponent } from './componentes/updateproducto/updateproducto.component';

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'categoria', component: CategoriaComponent},
  {path: 'producto', component: ProductosComponent},
  {path: 'productos', component: ViewproductosComponent},
  {path: 'producto/:id', component: UpdateproductoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
