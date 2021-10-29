import { Component, OnInit } from '@angular/core';
import { DepartamentosService } from '../../_service/departamentos.service'
@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  constructor(private departamentosService: DepartamentosService) { }

  ngOnInit(): void {
  }

}
