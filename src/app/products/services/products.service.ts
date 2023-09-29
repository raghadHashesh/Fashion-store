import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
}
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  dataEmitter = new EventEmitter<number>();
  raiseData(data: number) {
    this.dataEmitter.emit(data);
  }

  constructor(private http: HttpClient) { }
  getAllProducts() {
    return this.http.get("https://fakestoreapi.com/products", httpOption);
  }

  getAllCateories(): Observable<string[]> {
    return this.http.get<string[]>("https://fakestoreapi.com/products/categories", httpOption);
  }

  getProductsByCategory(word: string) {
    return this.http.get("https://fakestoreapi.com/products/category/" + word, httpOption);
  }
  getProductById(id: any): Observable<string[]> {
    return this.http.get<string[]>("https://fakestoreapi.com/products/" + id, httpOption);
  }

}
