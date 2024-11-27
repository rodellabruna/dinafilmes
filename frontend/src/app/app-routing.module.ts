import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermosComponent } from './termos/termos.component';
import { SobreComponent } from './sobre/sobre.component';
import { RecomendadosComponent } from './recomendados/recomendados.component';
import { ListaAAssistirComponent } from './lista-aassistir/lista-aassistir.component';
import { ListaFavoritosComponent } from './lista-favoritos/lista-favoritos.component';
import { ListaAssistidosComponent } from './lista-assistidos/lista-assistidos.component';
import { PerfilComponent } from './perfil/perfil.component';
// import { ListaAssistidosComponent } from './lista-assistidos/lista-assistidos.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { TelaFilmeComponent } from './tela-filme/tela-filme.component';
import { HomeComponent } from './home/home.component';
import { VitrineComponent } from './vitrine/vitrine.component';
import { NovaSenhaComponent } from './nova-senha/nova-senha.component';
import { BuscaComponent } from './busca/busca.component';
import { DenunciasComponent } from './denuncias/denuncias.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { AdminGuard } from './guards/admin.guard';
import { ContatosRecebidosComponent } from './contatos-recebidos/contatos-recebidos.component';
import { ValidarEmailComponent } from './validar-email/validar-email.component';

const routes: Routes = [
  {path:'termos',component:TermosComponent},
  {path:'sobre',component:SobreComponent},
  {path:'recomendados',component:RecomendadosComponent},
  {path:'lista-aassistir',component:ListaAAssistirComponent},
  {path:'lista-favoritos',component:ListaFavoritosComponent},
  {path:'lista-assistidos',component:ListaAssistidosComponent},
  {path:'perfil',component:PerfilComponent},
  {path:'login', component:LoginComponent },
  {path:'cadastro', component:CadastroComponent},
  {path:'tela-filme', component:TelaFilmeComponent},
  {path:'home', component:HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'tela-filme/:codigoFilme', component: TelaFilmeComponent },
  { path: 'vitrine', component: VitrineComponent },
  { path: 'nova-senha', component: NovaSenhaComponent },
  { path: 'busca', component: BuscaComponent},
  { path: 'denuncia', component: DenunciasComponent,  canActivate: [AdminGuard]},  
  { path: 'usuarios', component: UsuariosComponent,  canActivate: [AdminGuard]},  
  { path: 'usuario', component: UsuarioComponent,  canActivate: [AdminGuard]}, 
  { path: 'usuario/:codigoUsuario', component: UsuarioComponent,  canActivate: [AdminGuard] },
  { path: 'contatos-recebidos', component: ContatosRecebidosComponent, canActivate: [AdminGuard] },
  { path: 'validar-email', component: ValidarEmailComponent },

 
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
