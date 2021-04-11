import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-criarproduto',
  templateUrl: './criarproduto.component.html',
  styleUrls: ['./criarproduto.component.css']
})
export class CriarprodutoComponent implements OnInit {
  produto: Produto = new Produto

  categoria: Categoria = new Categoria()
  listaCategorias: Categoria[]
  idCategoria: number

  usuario: Usuario = new Usuario()
  idUsuario = environment.cpf

  constructor(private produtoService: ProdutoService, 
    private categoriaService: CategoriaService, 
    private router: Router,
    private alertas: AlertasService) { }

  ngOnInit() {
    window.scroll(0,0)
    this.findAllCategorias()
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

  criarProduto() {
    this.categoria.idCategoria = this.idCategoria
    this.produto.categoria = this.categoria

    this.usuario.cpf = this.idUsuario
    this.produto.usuario = this.usuario

    this.produtoService.criarProdutoPorUsuario(this.produto, environment.cpf).subscribe((resp: Produto) => {
      this.produto = resp
      this.alertas.showAlertSuccess('Parabéns pelo novo produto!')
      this.router.navigate(['/meuPerfil/meusProdutos'])
    })
  }
}