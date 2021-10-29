import { Departamento } from '../_model/Departamento';
export interface Ciudad {
    idCiudad: number;
    Departamento: Departamento;
    nombre: string;
}