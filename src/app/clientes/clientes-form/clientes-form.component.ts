import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente!: Cliente;
  sucesso: boolean = false;
  errors!: String[];
  id!: number;

  constructor(
    private clienteService: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe({
      next: (urlParams => {
        this.id = urlParams['id'];

        if (this.id) {
          this.clienteService
            .getClienteById(this.id)
            .subscribe({
              next: (response) => {
                this.cliente = response;
              },
              error: (errorResponse) => {
                this.cliente = new Cliente();
              }
            })
        }
      })
    })
  }

  voltarPraListagem() {
    this.router.navigate(['/clientes-lista']);
  }

  onSubmit() {
    if (this.id) {
      this.clienteService
        .atualizarCliente(this.cliente)
        .subscribe({
          next: (response) => {            
            this.sucesso = true;
            this.errors = [];
          },
          error: (errorResponse) => {            
            this.errors = ['Erro ao atualizar o cliente!']
          }
        })

    } else {
      this.clienteService
        .salvar(this.cliente)
        .subscribe({
          next: (response) => {
            this.cliente = response;          
            this.sucesso = true;
            this.errors = [];
          },
          error: (errorResponse) => {
            this.sucesso = false;
            this.errors = errorResponse.error.errors;
          }      
        })
    }
  }

}
