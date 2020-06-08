var register_url = "/user";
var email_confirmation_url = "/user/emailConfirmation/";
var modalRegisterField = ".c-modal--cadastro";
var errorRegisterMessage =
  "No momento, não é possível concluir seu cadastro. Por favor, tente novamente mais tarde.";
var success = "success";
var cadastro_form = "#cadastro-form";

jQuery(document).ready(function () {
  confirmEmail();

  /*tabIndex*/
  var indexAux;
  jQuery("header .tabindex").each(function (index) {
    indexAux = index + 1;
    jQuery(this).attr("tabindex", indexAux);
  });
  jQuery("section.banner .tabindex").each(function (index) {
    indexAux = indexAux + 1;
    jQuery(this).attr("tabindex", indexAux);
  });
  jQuery("section.informacoes .tabindex").each(function (index) {
    indexAux = indexAux + 1;
    jQuery(this).attr("tabindex", indexAux);
  });
  jQuery("section.gestao-financeira .tabindex").each(function (index) {
    indexAux = indexAux + 1;
    jQuery(this).attr("tabindex", indexAux);
  });
  jQuery("section.assessoria-contabil .tabindex").each(function (index) {
    indexAux = indexAux + 1;
    jQuery(this).attr("tabindex", indexAux);
  });
  jQuery("section.parceiros .tabindex").each(function (index) {
    indexAux = indexAux + 1;
    jQuery(this).attr("tabindex", indexAux);
  });
  jQuery("section.perguntas-frequentes .tabindex").each(function (index) {
    indexAux = indexAux + 1;
    jQuery(this).attr("tabindex", indexAux);
  });
  jQuery("footer .tabindex").each(function (index) {
    indexAux = indexAux + 1;
    jQuery(this).attr("tabindex", indexAux);
  });
  jQuery(".faixa-cadastre-se .tabindex").each(function (index) {
    indexAux = indexAux + 1;
    jQuery(this).attr("tabindex", indexAux);
  });
  jQuery("#modal-esqueci .tabindex").each(function (index) {
    indexAux = indexAux + 1;
    jQuery(this).attr("tabindex", indexAux);
  });
  jQuery(".modal-confirma-email .tabindex").each(function (index) {
    indexAux = indexAux + 1;
    jQuery(this).attr("tabindex", indexAux);
  });
  jQuery(".modal-termos-adesao .tabindex").each(function (index) {
    indexAux = indexAux + 1;
    jQuery(this).attr("tabindex", indexAux);
  });
  jQuery(".modal-termos-privacidade .tabindex").each(function (index) {
    indexAux = indexAux + 1;
    jQuery(this).attr("tabindex", indexAux);
  });
  jQuery(".modal-cadastre-se").each(function () {
    jQuery(this).focus();
  });

  /*tabIndex*/
  jQuery("#lkCadastre").keypress(function (event) {
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == "13") {
      jQuery(window).scrollTop(jQuery("#cadastre").offset().top - 100);
      jQuery("#cadastre .row").children().focus();
    }
  });
  jQuery("#lkGestao-financeira").keypress(function (event) {
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == "13") {
      jQuery(window).scrollTop(jQuery(".gestao-financeira").offset().top - 100);
      jQuery(".gestao-financeira .row").children().focus();
    }
  });
  jQuery("#lkAbra-pelo-app").keypress(function (event) {
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == "13") {
      jQuery(window).scrollTop(jQuery(".abra-app").offset().top - 100);
      jQuery(".abra-app .row").children().focus();
    }
  });
  jQuery("#lkAssessoria-contabil").keypress(function (event) {
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == "13") {
      jQuery(window).scrollTop(
        jQuery(".assessoria-contabil").offset().top - 100
      );
      jQuery(".assessoria-contabil .row").children().focus();
    }
  });
  jQuery("#lkMaquinas").keypress(function (event) {
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == "13") {
      jQuery(window).scrollTop(jQuery(".maquinas").offset().top - 100);
      jQuery(".maquinas .row").children().focus();
    }
  });
});

function getQueryString() {
  var key = false,
    res = {},
    itm = null;
  // get the query string without the ?
  var qs = location.search.substring(1);
  // check for the key as an argument
  if (arguments.length > 0 && arguments[0].length > 1) key = arguments[0];
  // make a regex pattern to grab key/value
  var pattern = /([^&=]+)=([^&]*)/g;
  // loop the items in the query string, either
  // find a match to the argument, or build an object
  // with key/value pairs
  while ((itm = pattern.exec(qs))) {
    if (key !== false && decodeURIComponent(itm[1]) === key)
      return decodeURIComponent(itm[2]);
    else if (key === false)
      res[decodeURIComponent(itm[1])] = decodeURIComponent(itm[2]);
  }
  return key === false ? res : null;
}

function confirmEmail() {
  url = getQueryString();

  if (url.confirmationId) {
    var uri = window.location.toString();
    var clean_uri = uri.substring(0, uri.indexOf("?"));
    window.history.replaceState({}, document.title, clean_uri);

    callApi(
      "PUT",
      email_confirmation_url + url.confirmationId,
      url.confirmationId,
      "application/json",
      function (callbackData) {
        if (callbackData.status == "success") {
          $("#modal-confirma-email").modal("show");
        } else {
          $("#modal-confirma-email-erro").modal("show");
        }
      }
    );
  }
}

function validName(value) {
  //Deve conter pelo menos 2 nomes com mais de duas letras separados por espaço.
  var parts = value.split(" ");
  var validParts = [];
  var valid = parts.length > 1;
  var regexNome = /[^a-z A-Z À-Ÿ \.]/;

  for (let index = 0; index < parts.length; index++) {
    const item = parts[index];
    if (item.length > 2) {
      validParts.push(item);
    } //verifica se a parte do nome tem mais de 2 letras
  }
  //tem que ter pelo menos 2 nomes, e estes dois nomes tem que ter mais de 2 letras
  return !(valid && validParts.length > 1 && !regexNome.test(value));
}

function userRegister() {
  var data = {};
  data.name = $(cadastro_form).find("#nome").val().trim();
  data.additionalData = {};
  data.additionalData.cnpj = $(cadastro_form)
    .find("#cnpj")
    .val()
    .replace(/\D/g, "");
  data.cpf = $(cadastro_form).find("#cpf").val();
  data.email = $(cadastro_form).find("#email").val().toLowerCase();
  data.confirmarEmail = $(cadastro_form)
    .find("#confirmar-email")
    .val()
    .toLowerCase();
  data.phoneNumber = $(cadastro_form).find("#celular").val().replace(/\D/g, ""); //somente numeros;
  data.password = $(cadastro_form).find("#input-senha").val();
  data.confirmPassword = $(cadastro_form).find("#senha-confirm").val();
  data.termAccepted = $(cadastro_form).find("#checkbox-adesao").is(":checked");
  data.privacyAccepted = $(cadastro_form)
    .find("#checkbox-privacidade")
    .is(":checked");

  callApi(
    "POST",
    register_url,
    JSON.stringify(data),
    "application/json",
    function (callbackData) {
      console.log(callbackData);
      if (success === callbackData.status) {
        $(modalRegisterField + " form").toggle(); //remove o formulário de cadastro.
        $(modalRegisterField + " .sucessoCadastro").toggle(); //exibe a mensagem de cadastro.
        $(cadastro_form).hide();
        $("#cadastro-concluido").show();
        setFocusFields("#registeredSuccess");
      } else {
        if (
          callbackData &&
          callbackData.data &&
          callbackData.data.responseJSON &&
          callbackData.data.responseJSON.message
        ) {
          if (
            callbackData.data.responseJSON.message === "Usuário já cadastrado."
            || callbackData.data.responseJSON.message === "O CPF ou o e-mail informado já é cadastrado. Por favor, tente se cadastrar novamente."
          ) {
            $("#errorRegisteredMessage").html('O CPF ou o e-mail informado já está cadastrado. Para acessar,  <a href="javascript:window.location.reload(true)" id="linkLogin" >clique aqui</a>. <br /> Se você ainda não possui cadastro, por favor, verifique seus dados.');    
          } else if (
            callbackData.data.responseJSON.message ===
            "Identificador do aceite inválido."
          ) {
            $("#errorRegisteredMessage").html(errorRegisterMessage);
          } else {
            $("#errorRegisteredMessage").html(callbackData.data.responseJSON.message);
          }
        } else {
          $("#errorRegisteredMessage").html(errorRegisterMessage);
        }
        setFocusFields("#errorRegisteredMessage");
      }
    }
  );
}

//Setta foco nos campos do modal de cadastro
function setFocusFields(value) {
  var fieldSelected = value;
  $(fieldSelected).show().focus();
}

function changeTitle(fieldName, errorName) {
  var errorSelected = errorName;
  var nameSelected = fieldName;

  switch (errorSelected) {
    case "#erro-nome":
      $(nameSelected).prop("title", "Digite o campo NOME corretamente.");
      break;
    case "#erro-nome-notComplete":
      $(nameSelected).prop("title", "Seu nome precisa ser preenchido completo.");
      break;
    case "#erro-celular":
      $(nameSelected).prop("title", "Digite o campo TELEFONE corretamente.");
      break;
    case "#erro-cpf":
      $(nameSelected).prop("title", "Digite o campo CPF corretamente.");
      break;
    case "#erro-cnpj":
      $(nameSelected).prop("title", "Digite o campo CNPJ corretamente.");
      break;
    case "#erro-email":
      $(nameSelected).prop("title", "Digite o campo EMAIL corretamente.");
      break;
    case "#erro-confirmar-email":
      $(nameSelected).prop("title", "Digite o campo EMAIL corretamente.");
      break;
    case "#erro-confirmar-email2":
      $(nameSelected).prop(
        "title",
        "As senhas estão diferentes. Digite novamente."
      );
      break;
    case "#erro-senha":
      $(nameSelected).prop(
        "title",
        "senha deve ter no mínimo 8 caracteres, letras (maiúsculas e minúsculas), números e caracteres especiais, sem espaços."
      );
      break;
    case "#erro-senha2":
      $(nameSelected).prop(
        "title",
        "As senhas estão diferentes. Digite novamente."
      );
      break;
    case nameSelected:
      $(nameSelected).prop("title", "");
      break;
  }
}
