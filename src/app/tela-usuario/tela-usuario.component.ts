import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { Usuario } from '../model/Usuario';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-tela-usuario',
  templateUrl: './tela-usuario.component.html',
  styleUrls: ['./tela-usuario.component.css']
})
export class TelaUsuarioComponent implements OnInit {

  produto: Produto = new Produto

  categoria: Categoria = new Categoria()
  listaCategorias: Categoria[]
  idCategoria: number
  contadorArvore = environment.contadorArvore

  usuario: Usuario = new Usuario()
  idUsuario = environment.cpf
  

  constructor(private produtoService: ProdutoService, 
    private categoriaService: CategoriaService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    window.scroll(0,0)
    this.findAllCategorias()
    let id = this.route.snapshot.params['id']
    this.findByIdProduto
  }

  findByIdProduto(idProduto: number) {
    this.produtoService.getByIdProduto(idProduto).subscribe((resp: Produto) => {
      this.produto = resp
    })
  }

  findAllCategorias() {
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) =>{
      this.listaCategorias = resp
    })
  }

  findByIdCategoria() {
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categoria) => {
      this.categoria
    })
  }

  deletarProduto() {
    this.categoria.idCategoria = this.idCategoria
    this.produto.categoria = this.categoria

    this.produtoService.deletarProduto(this.produto.idProduto, environment.cpf).subscribe((resp: Produto) => {
      this.produto = resp
      alert('Produto deletado com sucesso!')
      this.router.navigate(['/meuPerfil/meusProdutos'])
    })
  }
}
