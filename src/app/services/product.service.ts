import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDTO } from '../interfaces/products';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Obtener producto por ID
  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/findByIdByPathVariable/${id}`);
  }

  // Crear producto
  create(product: UserDTO): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

  // Actualizar producto
  update(id: number, product: UserDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, product);
  }

  // Eliminar producto
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
