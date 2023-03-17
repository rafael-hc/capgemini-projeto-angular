import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from '../carrinho.service';
import { IProdutoCarrinho } from '../produtos';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  itensCarrinho: IProdutoCarrinho[] = []

  total = 0

  constructor(
    private carrinhoService: CarrinhoService,
    private router: Router
  ) {}

  removerProduto(idProduto: number) {
    this.itensCarrinho = this.itensCarrinho.filter(item => item.id !== idProduto)
    this.carrinhoService.removerProdutoCarrinho(idProduto)
    this.calculaTotal()
  }

  calculaTotal() {
    this.total = this.itensCarrinho.reduce((acc, item) => acc += (item.preco * item.quantidade) , 0)
  }

  mudarQuantidadeProdutoNoLocalStorage() {
    this.calculaTotal()
    localStorage.setItem("carrinho", JSON.stringify(this.itensCarrinho))
  }

  comprar() {
    this.carrinhoService.limparCarrinho()
    this.router.navigate(["/produtos"])
  }

  ngOnInit(): void {
    this.itensCarrinho = this.carrinhoService.obtemCarrinho()
    this.calculaTotal()
  }

}
