import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { UserDTO } from '../../interfaces/products';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
  ],
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);

  displayedColumns: string[] = ['id', 'nombre', 'valor',];
  dataSource: (UserDTO & { id: number })[] = [];

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(): void {
    this.productService.getAll().subscribe((data: any) => {
      this.dataSource = data;
    });
  }

  eliminarProducto(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productService.delete(id).subscribe(() => {
        this.loadProductos();
      });
    }
  }

  editarProducto(id: number): void {
    this.router.navigate(['/productos', id]);
  }

  irACrear(): void {
    this.router.navigate(['/crear']);
  }
}
