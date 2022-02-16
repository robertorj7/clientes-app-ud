import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/clientes.service';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { Cliente } from '../../clientes/cliente';
import { ServicoPrestado } from '../servico-prestado';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[] = [];
  servico!: ServicoPrestado;  
  sucesso: boolean = false;
  errors!: String[];

  constructor(
    private clienteService: ClientesService,
    private servicoPrestadoService: ServicoPrestadoService
  ) { 
    this.servico = new ServicoPrestado(); 
  }

  ngOnInit(): void {
    this.clienteService
      .getClientes()
      .subscribe({
      next: (response) => {
        this.clientes = response;
      }
    })
  }

  onSubmit() {
    this.servicoPrestadoService
      .salvar(this.servico)
      .subscribe({
        next: (response) => {            
          this.sucesso = true;
          this.errors = [];
          this.servico = new ServicoPrestado();
        },
        error: (errorResponse) => {            
         this.sucesso = false;
          this.errors = errorResponse.error.errors;
        }
      })
  }
}