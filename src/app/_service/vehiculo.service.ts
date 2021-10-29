import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Vehiculo } from '../_model/Vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  
  private url: string = `${environment.HOST}/vehiculos`;

  constructor(private http: HttpClient) { }
    listarVehiculo(page: number, size: number){
      return this.http.get<any>(`${this.url}/pageable?page=${page}&size=${size}`);
    }
    
    listarVehiculosPorId(idVehiculo: number){
      return this.http.get<Vehiculo>(`${this.url}/listar/${idVehiculo}`);
    }

    guardarVehiculos(vehiculo: Vehiculo){
      return this.http.post(`${this.url}/guardar`, vehiculo);
    }
    
    editarVehiculo(vehiculo: Vehiculo){
      return this.http.put(`${this.url}/editar`, vehiculo);
    }

}
