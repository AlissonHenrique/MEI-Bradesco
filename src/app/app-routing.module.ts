import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./pages/home/home.component";
import { NossosParceirosComponent } from "./pages/nossos-parceiros/nossos-parceiros.component";
import { ConecteSeComponent } from "./pages/conecte-se/conecte-se.component";
import { FaqComponent } from "./pages/FAQ/faq.component";
import { NotificacoesComponent } from "./pages/notificacoes/notificacoes.component";
import { ContabilComponent } from "./pages/services-pages/contabil/contabil.component";
import { GestaoNegocioComponent } from "./pages/services-pages/gestao-negocio/gestao-negocio.component";
import { FormalizacaoComponent } from "./pages/services-pages/formalizacao/formalizacao.component";
import { NossosParceirosTermoComponent } from "./pages/nossos-parceiros-termo/nossos-parceiros-termo.component";
import { NossosParceirosFormComponent } from "./pages/nossos-parceiros-form/nossos-parceiros-form.component";
import { WebviewComponent } from "./components/webview/webview.component";
import { EditFormComponent } from "./pages/edit-form/edit-form.component";
import { TermoseDadosComponent } from "./pages/termos-e-dados/termos-e-dados.component";
 
const routes: Routes = [
  
  {
    path: "",
    component: HomeComponent,
    data: { title: "Home" }
  },
  {
    path: "nossos-parceiros",
    component: NossosParceirosComponent,
    data: { title: "nossos-parceiros" }
  },
  {
    path: "conecte-se",
    component: ConecteSeComponent,
    data: { title: "conecte-se" }
  },
  {
    path: "faq",
    component: FaqComponent,
    data: { title: "FAQ" }
  },
  {
    path: "notificacoes",
    component: NotificacoesComponent,
    data: { title: "Notificações" }
  },
  {
    path: "servicos/assessoria-contabil",
    component: ContabilComponent,
    data: { title: "contabil" }
  },
  {
    path: "servicos/gestao-do-negocio",
    component: GestaoNegocioComponent,
    data: { title: "Gestão de negócio" }
  },
  {
    path: "servicos/formalizacao",
    component: FormalizacaoComponent,
    data: { title: "Formalização" }
  },
  {
    path: "nossos-parceiros-form",
    component: NossosParceirosFormComponent,
    data: { title: "Form Parceiro Termo" }
  },
  {
    path: "nossos-parceiros-termo",
    component: NossosParceirosTermoComponent,
    data: { title: "Parceiro Termo" }
  },
  {
    path: "webview",
    component: WebviewComponent,
    data: { title: "Assessoria contábil - Conectar" }
  },
  {
    path: "perfil",
    component: EditFormComponent,
    data: { title: "Editar" }
  },
  {
    path: "termos",
    component: TermoseDadosComponent,
    data: { title: "termos" }
  }

  // ERRO 404
  // {
  //   path: '**', component: HomeComponent
  // },
];


  

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
      useHash: true
    })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }