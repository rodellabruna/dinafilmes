import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TermosComponent } from './termos/termos.component';
import { SobreComponent } from './sobre/sobre.component';
import { ListaAAssistirComponent } from './lista-aassistir/lista-aassistir.component';
import { ListaAssistidosComponent } from './lista-assistidos/lista-assistidos.component';
import { ListaFavoritosComponent } from './lista-favoritos/lista-favoritos.component';
import { RecomendadosComponent } from './recomendados/recomendados.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.services';
import { HttpClientModule } from '@angular/common/http';
import { CadastroComponent } from './cadastro/cadastro.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EditarNomeComponent } from './editar-nome/editar-nome.component';
import { TelaFilmeComponent } from './tela-filme/tela-filme.component';
import { EditarSenhaComponent } from './editar-senha/editar-senha.component';
import { EditarDeleteSairDaPlataformaComponent } from './editar-delete-sair-da-plataforma/editar-delete-sair-da-plataforma.component';
import { HomeComponent } from './home/home.component'; 
import { VitrineComponent } from './vitrine/vitrine.component';
import { EditarFotoComponent } from './editar-foto/editar-foto.component';
import { SafePipe } from './safe.pipe';
import { NovaSenhaComponent } from './nova-senha/nova-senha.component';
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';
import { BuscaComponent } from './busca/busca.component';
import { DenunciasComponent } from './denuncias/denuncias.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ContatosRecebidosComponent } from './contatos-recebidos/contatos-recebidos.component'; 
import { ValidarEmailComponent } from './validar-email/validar-email.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    TermosComponent,
    SobreComponent,
    ListaAAssistirComponent,
    ListaAssistidosComponent,
    ListaFavoritosComponent,
    RecomendadosComponent,
    PerfilComponent,
    LoginComponent,
    CadastroComponent,
    NavbarComponent,
    EditarNomeComponent,
    TelaFilmeComponent,
    EditarSenhaComponent,
    EditarDeleteSairDaPlataformaComponent,
    HomeComponent,
    VitrineComponent,
    EditarFotoComponent,
    SafePipe,
   NovaSenhaComponent,
   EsqueciSenhaComponent,
   BuscaComponent,
   DenunciasComponent,
   UsuariosComponent,
   UsuarioComponent,
   ContatosRecebidosComponent,
   ValidarEmailComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
