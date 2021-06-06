import { catchError, map } from 'rxjs/operators';
import { Client } from './client.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  baseUrl = " http://localhost:3001/clients"

  constructor(private snackBar: MatSnackBar,
    private http: HttpClient) { }

  showMessage(msg: string, isError: boolean= false): void {
    this.snackBar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-sucesso']
    });
  }

  create(client: Client): Observable<Client> {
    return this.http.post<Client>(this.baseUrl, client).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
    
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu erro no Backend!', true)
    return EMPTY
  }



  read(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl)
  }

  readById(id: string): Observable<Client> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Client>(url)
  }

  update(client: Client): Observable<Client> {
    const url = `${this.baseUrl}/${client.id}`
    return this.http.put<Client>(url, client)
  }

  delete(id: number): Observable<Client> {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Client>(url)
  }
}
