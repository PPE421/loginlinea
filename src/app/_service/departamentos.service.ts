import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Departamento } from '../_model/Departamento';
import { Ciudad } from '../_model/Ciudad';
@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  private url: string = `${environment.HOST}/departamentos`;
  
  constructor(private http: HttpClient) { }

  public listar(){
    return this.http.get<Departamento[]>(`${this.url}/listar`);
  }

  /* Enviar token - No optimo 
    public listar() {
      return this.http.get<Departamento[]>(`${this.url}/listar`, {
        headers: new HttpHeaders().set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsibWl0b3Jlc291cmNlaWQiXSwidXNlcl9uYW1lIjoiYWRtaW4iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNjM1MjA1MTY3LCJhdXRob3JpdGllcyI6WyJBZG1pbmlzdHJhZG9yIl0sImp0aSI6IjE2Y2UwMzAxLThlYmQtNDFkNy1hYWY0LTQxNWI3YTZhMWQ3MiIsImNsaWVudF9pZCI6Im1pdG9tZWRpYXBwIn0.EuW7xY6W2HEy5bDnJmBaKW-6jw5JDlHgMvMYdh2n_6k')
      });
    }
  */
  public listarCiudadPorDepartamento(idDepartamento: number){
    return this.http.get<Ciudad[]>(`${this.url}/ciudad/listarPorDepartamnto/${idDepartamento}`);
  }
}