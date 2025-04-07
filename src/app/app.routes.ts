import { Routes } from '@angular/router';
import { ProductosComponent } from './components/productos/productos.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';

export const routes: Routes = [
  { path: '', redirectTo: 'productos', pathMatch: 'full' },
  { path: 'productos', component: ProductosComponent },
  { path: 'crear', component: CrearProductoComponent },
  { path: 'editar/:id', component: CrearProductoComponent },
];
