# Bradesco MEI - Área logada

# Componentes

## header-notificacoes

Definir a quantidade de notificações na variável **notificacoes**.

## header-timer-logout

Definir o tempo para que o usuário seja deslogado na variável **tempoTotal**.

Adicionar dentro da função _logout_ as diretrizes para deslogar o usuário. As duas últimas linhas dentro da função _logout_ podem ser removidas.

## modal-components e card-components

Modal-parceiro -> **modal-grande**
Modal-parceiro-content -> **modal-grande-conteudo**
Modal-small -> **modal-pequeno**
card -> um componente, só escolher o css diferente

São componentes reutilizáveis, feitos para diminuir a quantidade de linhas e deixar o código mais legível.

Em cada página a ser componentizada, se deve **escrever o código HTML no template no arquivo .ts dela**.

O template recebe todo conteúdo HTML da página a ser componentizada e a tag ng-content recebe o conteúdo dinâmico das páginas filho;

No HTML, do componente a ser reutilizado, substituir tudo pela tag **ng-content**

**@Input() myModal** transmite de uma página a outra o valor dinâmico do ID;

Nas páginas HTML, seguir o exemplo a seguir:

Modal utilizando componentização, deve ser passado na primeira tag o seletor do componente e logo depois o id no bind que vem da variável do .ts;

    <modal-grande [myModal]="modal1">
        <!-- Dentro da tag, passar todo conteúdo do modal -->
    </modal-grande>

## Button

Principais class a serem usadas como padrão e seguindo o guide.

button-padrao -> **Button padrao**
button-padrao btn-red -> **Button padrao com a cor vermelha**
button-padrao btn-vazio-borda-red -> **Button padrao com a borda vermelha**
button-padrao desabilitado -> **Button padrao com a cor vermelha desativado/cinza**
button-padrao btn-vazio-desabilitado -> **Button padrao com a borda vermelha desativado/cinza**

## Fields

#### Tipos
Por enquanto existem 7 tipos de campos:

- field-default: Usado geralmente para nomes, sobrenomes, ou qualquer coisa que não requer uma validação.

- field-cpf

- field-cnpj

- field-email

- field-phone: Para celular basta acrescentar o atributo: "cellphone"

      <field-phone cellphone></field-phone>

- field-date

- field-social: Este campo é especial para "Razão social", é um campo de cnpj mas com um ícone que abre um tooltip.

#### Uso

Exemplo html:

    <form [formGroup]='totalForms'>
    
      <field-default placeholder="Nome" [fControl]='nameControl' [value]="value_name" errorMsg="Nome inválido" errorReqMsg="Campo Nome obrigatório"></field-default>
      
      <field-cnpj idinput='icnpj' placeholder="CNPJ" [fControl]='cnpjControl' [value]="value_cnpj" errorMsg="CNPJ inválida" errorReqMsg="Campo CNPJ obrigatório"></field-cnpj>

    </form>
    
Exemplo TS:
    
     customValidator = new CustomValidators();//usado para validacao de cpf, cnpj
     
     //seta os values
     value_name = "José Silva";
     value_cpf = "12345678900";
     
     //seta os controls
     nameControl = new FormControl(this.value_name,{validators: [Validators.required], updateOn: "blur"});
     cnpjControl = new FormControl(this.value_cnpj,{validators: [this.customValidator.isCNPJ(),Validators.required], updateOn: "blur"});
     
     //e adiciona os controls no FormGroup
     totalForms = new FormGroup({
        name: this.nameControl,
        cnpj: this.cnpjControl,
     });
     
     
     //Finalmente para verificar se estão válidos
     qualquerFuncaoClick(){
      if(this.totalForms.status == "VALID"){
        //todos os campos válidos
      }
     }
     
Para mais detalhes, ver a implementação em "nossos-parceiros-form".





## Deploy

Para deploy utilizar **ng build --prod --base-href /bradesco/mei-logado/**
