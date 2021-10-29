import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { VehiculoService } from 'src/app/_service/vehiculo.service';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { validateHorizontalPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.component.html',
  styleUrls: ['./agregar-vehiculo.component.css'],
})
export class AgregarVehiculoComponent implements OnInit {
  
  seleccionarMarca: string;
  seleccionarTipoVehiculo: string;
  private editando: boolean;
  private idVehi: number;

  Vehiculoformulario = this.fb.group({
    placa: ['', Validators.required],
    modelo: [null, Validators.required],
    marca: ['', Validators.required],
    tipoVehiuclo: ['', Validators.required],
    capacidad: ['', Validators.required],
  });

 
  

  constructor(private serviceAgregarVehiculo: VehiculoService,
              private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {this.idVehi = params['idVehiculo']; this.editando = params['idVehiculo'] != null;
    }); this.iniciarFormularioVacio();
    if (this.editando === true) {
      this.cargarDatos();
    }
  }

  iniciarFormularioVacio() {
    this.Vehiculoformulario = new FormGroup({
      'placa': new FormControl('', [Validators.required]),
      'modelo': new FormControl(null, [Validators.required,Validators.max(2022),Validators.min(1950)]),
      'marca': new FormControl('', [Validators.required]),
      'tipoVehiuclo': new FormControl('', [Validators.required]),
      'capacidad': new FormControl('', [Validators.required]),
    });
  }

  cargarDatos() {
    this.serviceAgregarVehiculo.listarVehiculosPorId(this.idVehi).subscribe((data) => {
      console.log(data);
      this.Vehiculoformulario.get('placa').setValue(data.placa);
      this.Vehiculoformulario.get('modelo').setValue(data.modelo);
      this.Vehiculoformulario.get('marca').setValue(data.marca);
      this.Vehiculoformulario.get('tipoVehiuclo').setValue(data.tipoVehiuclo);
      this.Vehiculoformulario.get('capacidad').setValue(data.capacidad);
    });
  }

  guardarVehiculoss() {
    let vehiculo = new Vehiculo();
    vehiculo.placa = this.Vehiculoformulario.value['placa'];
    vehiculo.modelo = this.Vehiculoformulario.value['modelo'] + '';
    vehiculo.marca = this.Vehiculoformulario.value['marca'];
    vehiculo.tipoVehiuclo = this.Vehiculoformulario.value['tipoVehiuclo'];
    vehiculo.capacidad = this.Vehiculoformulario.value['capacidad'];

    if (this.editando === true) {
      vehiculo.idVehiculo = this.idVehi;
      this.serviceAgregarVehiculo.editarVehiculo(vehiculo).subscribe(() => {
        this.Vehiculoformulario.reset();
        this.router.navigate(['/vehiculo']);
      });
      this.snackBar.open('El vehiculo se edito con exito','',{
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      })
    } else {
      this.serviceAgregarVehiculo.guardarVehiculos(vehiculo).subscribe(() => {
        this.Vehiculoformulario.reset();
        this.router.navigate(['/vehiculo']);
      });
      this.snackBar.open('El vehiculo se guardo con exito','',{
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      })
    }
  }

  get placa() {
    return this.Vehiculoformulario.get('placa');
  }
  get modelo() {
    return this.Vehiculoformulario.get('modelo');
  }
  get marca() {
    return this.Vehiculoformulario.get('marca');
  }
  get tipoVehiculo() {
    return this.Vehiculoformulario.get('tipoVehiuclo');
  }
  get capacidad() {
    return this.Vehiculoformulario.get('capacidad');
  }



  marcasVehiculo = [
    { value: 'Alfa Romeo' },{ value: 'Audi' },{ value: 'BMW' },{ value: 'Chevrolet' },{ value: 'Ferrari' },{ value: 'Ford' },{ value: 'Kia' },{ value: 'Mazda' },{ value: 'Mercedes' },{ value: 'Nissan' },{ value: 'Peugeot' },{ value: 'Porsche' },{ value: 'Toyota' },{ value: 'Volvo' },
  ];
  tiposDeVehiculo = [
    { tipo: 'Camioneta' },{ tipo: 'Campero' },{ tipo: 'Carro' },{ tipo: 'Furgon' },
  ];


}