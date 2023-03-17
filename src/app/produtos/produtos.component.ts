import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduto, produtos } from '../produtos';
import { ProdutosService } from '../produtos.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit, OnDestroy {
  produtos: IProduto[] | undefined;
  private subscription: Subscription | undefined

  constructor(
    private produtoService: ProdutosService,
    private router: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    const produtos = this.produtoService.getAll()
    this.subscription = this.router.queryParamMap.subscribe(params => {
      const descricao = params.get("descricao")?.toLowerCase()

      if(descricao) {
        this.produtos = produtos.filter(produto => produto.descricao.toLowerCase().includes(descricao))
        return
      }
      this.produtos = produtos
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }

}
