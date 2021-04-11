import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-alterarcadastro',
  templateUrl: './alterarcadastro.component.html',
  styleUrls: ['./alterarcadastro.component.css']
})
export class AlterarcadastroComponent implements OnInit {

  usuario: Usuario = new Usuario
  confirmarSenha: string
  cpfUsuario: string

  constructor(private usuarioService: UsuarioService,
     private router: Router,
     private route: ActivatedRoute,
     private alertas: AlertasService) { }

  ngOnInit() {
    window.scroll(0,0)
    this.cpfUsuario = this.route.snapshot.params['id']
    this.findByCpf(this.cpfUsuario)
    this.usuario.cpf= environment.cpf
    this.usuario.nomeSocial=environment.nomeSocial
    this.usuario.nomeCompletoUsuario=environment.nomeCompletoUsuario
    this.usuario.nomeUsuario=environment.nomeUsuario
    this.usuario.emailUsuario=environment.emailUsuario
    this.usuario.contadorArvore=environment.contadorArvore
    
  }

  confirmSenha(event: any){
    this.confirmarSenha = event.target.value
  }

  alterarCadastro() {
    if(this.usuario.senhaUsuario != this.confirmarSenha){
      this.alertas.showAlertInfo('As senhas não conferem.')
    }
    else{
      this.usuarioService.alterarCadastro(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.alertas.showAlertSuccess('Suas informações foram corrigidas! Faça o login novamente.')
        environment.token = ''
        environment.cpf = ''
        environment.contadorArvore = 0
        environment.emailUsuario = ''
        environment.nomeCompletoUsuario = ''
        environment.nomeSocial = ''
        environment.nomeUsuario= ''
        environment.senhaUsuario = ''
        this.router.navigate(['/paginaInicial'])
      })
    }
  }

  findByCpf(cpf: string) {
    this.usuarioService.getBycpf(this.cpfUsuario).subscribe((resp) => {
      this.usuario = resp
    })
  }
}