import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarrinhoService } from 'src/app/carrinho.service';
import { NotificacaoService } from 'src/app/notificacao.service';
import { IProduto, IProdutoCarrinho, produtos} from 'src/app/produtos';
import { ProdutosService } from 'src/app/produtos.service';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent implements OnInit {
  produto: IProduto | undefined
  id: number | null = null
  quantidade = 1
  
  constructor(
    private router: ActivatedRoute,
    private produtoService: ProdutosService,
    private notificacaoService: NotificacaoService,
    private carrinhoService: CarrinhoService
    ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.id = Number(params.get("id"))      
    })
    this.produto = this.produtoService.getOne(this.id!)
  }

  adicionarAoCarrinho() {
    this.notificacaoService.notificar(`${this.produto?.descricao} foi adicionado ao carrinho com sucesso!`)
    const produto: IProdutoCarrinho = {
      ...this.produto!,
      quantidade: this.quantidade
    }
    this.carrinhoService.adicionarAoCarrinho(produto)
  }

}
