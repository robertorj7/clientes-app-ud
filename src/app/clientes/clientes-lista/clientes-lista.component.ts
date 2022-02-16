import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes: Cliente[] = [];
  clienteSelecionado!: Cliente;
  mensagemSucesso!: String;
  mensagemErro!: String;

  constructor(
    private clientesService: ClientesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.clientesService
      .getClientes()
      .subscribe({
        next: (response) => {
          this.clientes = response;
        }
      });
  }

  novoCadastro() {
    this.router.navigate(['/clientes-form']);
  }

  preparaDelecao(cliente: Cliente) {
    this.clienteSelecionado = cliente;
  }

  deletarCliente() {
    this.clientesService
      .deletarCliente(this.clienteSelecionado)
      .subscribe({
        next: (response) => {
          this.mensagemSucesso = "Cliente Deletado com Sucesso!";
          this.ngOnInit();
        },
        error: () => {
          this.mensagemErro = "Ocorreu um erro ao deletar o cliente!";
        }
      })
  }

}
