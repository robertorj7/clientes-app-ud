import { Component, OnInit } from '@angular/core';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { ServicoPrestadoBusca } from './servico-prestado-busca';

@Component({
  selector: 'app-servico-prestado-lista',
  templateUrl: './servico-prestado-lista.component.html',
  styleUrls: ['./servico-prestado-lista.component.css']
})
export class ServicoPrestadoListaComponent implements OnInit {

  nome!: string;
  mes!: number;
  meses!: number[];
  lista!: ServicoPrestadoBusca[];
  message!: string;

  constructor(private servicoPrestadoService: ServicoPrestadoService) {
    this.meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
   }

  ngOnInit(): void {
  }

  consultar() {
    this.servicoPrestadoService
      .buscar(this.nome, this.mes)
      .subscribe({
        next: (response) => {
          this.lista = response;
          
          if (this.lista.length <= 0) {
            this.message = "Nenhum registro encontrado!";
          } else {
            this.message = '';
          }
        }
      });
  }

}
