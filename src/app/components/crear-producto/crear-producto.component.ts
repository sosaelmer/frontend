import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { UserDTO } from '../../interfaces/products';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './crear-producto.component.html'
})
export class CrearProductoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    nombre: ['', Validators.required],
    valor: [0, [Validators.required, Validators.min(1)]]
  });

  idProducto: number | null = null;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.idProducto = +id;
        this.productService.getById(this.idProducto).subscribe(data => {
          this.form.patchValue(data);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const producto: UserDTO = this.form.value as UserDTO;

    if (this.idProducto) {
      this.productService.update(this.idProducto, producto).subscribe(() => {
        this.router.navigate(['/productos']);
      });
    } else {
      this.productService.create(producto).subscribe(() => {
        this.router.navigate(['/productos']);
      });
    }
  }
}
