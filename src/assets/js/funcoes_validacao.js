$(document).ready(function () {
  $("#form-login").submit(function (e) {
    e.preventDefault();

    //validaFormLogin();
    formularioValido(); // chama metodo do login.js
  });

  $("#cadastro-form").submit(function (e) {
    e.preventDefault();
    if (validaForm()) {
      userRegister(); // cadastrar.js
    }
    VrArray = Array.prototype.slice.call(document.querySelectorAll('.msg-err')).filter(function (item, index) { return item.style.display != "none" });
    for (var i = 0; i < VrArray.length; i++) {
      texto = VrArray[i].innerText;
      VrArray[i].closest(".col-sm-6").querySelector("input").title = texto
    }

    VrArray[0].closest(".col-sm-6").querySelector("input").focus();
    jQuery(".modal-content").scrollTop(0, 0);
  });

  $("#recuperarSenha").submit(function (e) {
    e.preventDefault();
    //validaFormRecuperarSenha();
    ValidFormRecouverPassword(); // login.js
  });
});

$("input").on("blur", function () {
  validaCampo($(this).attr("id"));
});

// Removido
// function validaFormRecuperarSenha(){

//     if ($("#email-esqueci-senha").val() == "") {
//         $(".erro-email-esqueci-senha").hide();
//         $("#usuarioNaoEncontrato").hide();
//         $("#emailObrigatorio").show();

//     } else if(!isEmail($("#email-esqueci-senha").val())){
//         $(".erro-email-esqueci-senha").show();
//         $("#usuarioNaoEncontrato").hide();
//         $("#emailObrigatorio").hide();

//     }else{
//         $(".erro-email-esqueci-senha").hide();
//         $('#modal-esqueci .form').hide();
//         $('#modal-esqueci .response').show();
//     }

// }
$("#idVoltarCadastro").click(function (e) {
  removeRequestMessage(e);
});
$("#close-form").click(function (e) {
  removeRequestMessage(e);
});

function removeRequestMessage(e) {
  e.preventDefault();
}

function validaCampo(id) {
  //console.log(id);
  switch (id) {
    case "email-login":
      if ($("#email-login").val() == "" || !isEmail($("#email-login").val())) {
        jQuery("#email-login").attr("title", "E-mail inválido");
        jQuery("#erro-email-login")
          .text("E-mail inválido")
          .attr("style", "display:block");
      } else {
        jQuery("#email-login").attr(
          "title",
          "Bradesco empresas e negocios. <br>Digite o e-mail de acesso."
        );
        jQuery("#erro-email-login").text("").attr("style", "display:none");
      }
      break;

    case "senha-login":
      if ($("#senha-login").val() == "") {
        jQuery("#senha-login").attr("title", "Digite a senha.");
        jQuery(".erro-senha-login3")
          .html("Digite a senha.")
          .attr("style", "display:none");
        jQuery("#erro-senha-login")
          .html("Digite a senha.")
          .attr("style", "display:block");
      } else {
        jQuery("#senha-login").attr("title", "Digite a senha para acesso.");
        jQuery("#erro-senha-login").text("").attr("style", "display:none");
      }
      break;

    case "nome":
      if ($("#nome").val() == "") {
        $(".erro-nome").show();
        changeTitle("#nome", "#erro-nome");
        $(".erro-nome-notComplete").hide();
      } else {
        $(".erro-nome").hide();
        if (validName($("#nome").val())) {
          $(".erro-nome-notComplete").show();
          changeTitle("#nome", "#erro-nome-notComplete");
        } else {
          $(".erro-nome-notComplete").hide();
          changeTitle("#nome", "#nome");
        }
      }
      break;

    case "celular":
      if ($("#celular").val() == "" || $("#celular").val().length < 18) {
        $(".erro-celular").show();
        changeTitle("#celular", "#erro-celular");
      } else {
        $(".erro-celular").hide();
        changeTitle("#celular", "#celular");
      }
      break;

    case "cpf":
      if ($("#cpf").val() == "" || !isCpf($("#cpf").val())) {
        $(".erro-cpf").show();
        changeTitle("#cpf", "#erro-cpf");
      } else {
        $(".erro-cpf").hide();
        changeTitle("#cpf", "#cpf");
      }
      break;

    case "cnpj":
      if ($("#cnpj").val() != "") {
        if (!isCNPJ($("#cnpj").val())) {
          $(".erro-cnpj").show();
          changeTitle("#cnpj", "#erro-cnpj");
        } else {
          $(".erro-cnpj").hide();
          changeTitle("#cnpj", "#cnpj");
        }
      } else {
        $(".erro-cnpj").hide();
        changeTitle("#cnpj", "#cnpj");
      }
      break;

    case "email":
      if ($("#email").val() == "" || !isEmail($("#email").val())) {
        $(".erro-email").show();
        changeTitle("#email", "#erro-email");
      } else {
        $(".erro-email").hide();
        changeTitle("#email", "#email");
      }
      if ($("#confirmar-email").val() != "") {
        if (!isEmail($("#confirmar-email").val())) {
          $(".erro-confirmar-email").show();
          changeTitle("#confirmar-email", "#erro-confirmar-email");
          $(".erro-confirmar-email2").hide();
        } else if ($("#confirmar-email").val() != $("#email").val()) {
          $(".erro-confirmar-email").hide();
          $(".erro-confirmar-email2").show();
          changeTitle("#confirmar-email", "#erro-confirmar-email2");
        } else {
          $(".erro-confirmar-email").hide();
          $(".erro-confirmar-email2").hide();
        }
      } else {
      }

      break;

    case "confirmar-email":
      if (
        $("#confirmar-email").val() == "" ||
        !isEmail($("#confirmar-email").val())
      ) {
        $(".erro-confirmar-email").show();
        changeTitle("#confirmar-email", "#erro-confirmar-email");
        $(".erro-confirmar-email2").hide();
      } else if ($("#confirmar-email").val() != $("#email").val()) {
        $(".erro-confirmar-email").hide();
        $(".erro-confirmar-email2").show();
        changeTitle("#confirmar-email", "#erro-confirmar-email2");
      } else {
        $(".erro-confirmar-email").hide();
        $(".erro-confirmar-email2").hide();
        changeTitle("#confirmar-email", "#confirmar-email");
        changeTitle("#confirmar-email2", "#confirmar-email2");
      }
      break;

    case "input-senha":
      if (validatePassword($("#input-senha").val())) {
        $(".erro-senha").hide();
        changeTitle("#input-senha", "#input-senha");
      } else {
        $(".erro-senha").show();
        changeTitle("#input-senha", "#erro-senha");
      }

      if ($("#senha-confirm").val() != "") {
        if ($("#senha-confirm").val() != $("#input-senha").val()) {
          $(".erro-senha2").show();
          changeTitle("#input-senha", "#erro-senha2");
        } else {
          $(".erro-senha2").hide();
          changeTitle("#senha-confirm", "#senha-confirm");
        }
      }

      break;

    case "senha-confirm":
      if (
        $("#senha-confirm").val() == "" ||
        $("#senha-confirm").val() != $("#input-senha").val()
      ) {
        $(".erro-senha2").show();
        changeTitle("#senha-confirm", "#erro-senha2");
      } else {
        $(".erro-senha2").hide();
        changeTitle("#senha-confirm", "#senha-confirm");
      }
      break;

    case "email-esqueci-senha":
      // validação feita no login.js
      // if ($("#email-esqueci-senha").val() == "") {
      //     $(".erro-email-esqueci-senha").hide();
      //     $("#usuarioNaoEncontrato").hide();
      //     $("#emailObrigatorio").show();
      // } else if(!isEmail($("#email-esqueci-senha").val())){
      //     $(".erro-email-esqueci-senha").show();
      //     $("#usuarioNaoEncontrato").hide();
      //     $("#emailObrigatorio").hide();
      //     //isValid++;
      // }else{
      //     $(".erro-email-esqueci-senha").hide();
      //     $("#usuarioNaoEncontrato").hide();
      //     $("#emailObrigatorio").hide();
      // }
      break;
  }
}

function validaForm() {
  var isValid = 0;
  if ($("#nome").val() == "") {
    $(".erro-nome").show();
  } else {
    $(".erro-nome").hide();
    if (validName($("#nome").val())) {
      $(".erro-nome-notComplete").show();
    } else {
      $(".erro-nome-notComplete").hide();
      isValid++;
    }
  }

  if ($("#celular").val() == "" || $("#celular").val().length < 18) {
    $(".erro-celular").show();
  } else {
    $(".erro-celular").hide();
    isValid++;
  }

  if ($("#cpf").val() == "" || !isCpf($("#cpf").val())) {
    $(".erro-cpf").show();
  } else {
    $(".erro-cpf").hide();
    isValid++;
  }

  if ($("#cnpj").val() != "") {
    if (!isCNPJ($("#cnpj").val())) {
      $(".erro-cnpj").show();
    } else {
      $(".erro-cnpj").hide();
      isValid++;
    }
  } else {
    $(".erro-cnpj").hide();
    isValid++;
  }

  if ($("#email").val() == "" || !isEmail($("#email").val())) {
    $(".erro-email").show();
  } else {
    $(".erro-email").hide();
    isValid++;
  }

  if (
    $("#confirmar-email").val() == "" ||
    !isEmail($("#confirmar-email").val()) ||
    $("#confirmar-email").val() != $("#email").val()
  ) {
    $(".erro-confirmar-email").show();
  } else {
    $(".erro-confirmar-email").hide();
    isValid++;
  }

  if (!validatePassword($("#input-senha").val())) {
    $(".erro-senha").show();
  } else {
    $(".erro-senha").hide();
    isValid++;
  }

  if (
    $("#senha-confirm").val() == "" ||
    $("#senha-confirm").val() != $("#input-senha").val()
  ) {
    $(".erro-senha2").show();
  } else {
    $(".erro-senha2").hide();
    isValid++;
  }

  if (!$("#checkbox-adesao").prop("checked")) {
    $(".erro-checkbox-adesao").show();
  } else {
    $(".erro-checkbox-adesao").hide();
    isValid++;
  }

  if (!$("#checkbox-privacidade").prop("checked")) {
    $(".erro-checkbox-privacidade").show();
  } else {
    $(".erro-checkbox-privacidade").hide();
    isValid++;
  }

  // console.log(isValid);
  // if (isValid >= 10) {
  //    // $("form")[0].submit();

  //    $('#cadastro-form').hide();
  //    $('#cadastro-concluido').show();
  // } else {

  // }
  return isValid >= 10; // "If" acima é feito na chamada da API
}

// var tentativasLogin = 3;
// function validaFormLogin() {
//     var isValid = 0;

//     if ($("#email-login").val() == "" && $("#senha-login").val() == ""){
//         $(".erro-email-login").show();
//         $(".erro-senha-login").show();
//     }else{

//         if($("#email-login").val() != "" && $("#senha-login").val() != ""){
//             //PRIMEIRO VERIFICA O E-MAIL, SE O E-MAIL ESTIVER INVALIDO NEM VERIFICA A SENHA.
//             if (!isEmail($("#email-login").val())) {
//                 $(".erro-email-login").show();
//                 $(".erro-senha-login").hide();
//             } else {

//                 $(".erro-email-login").hide();
//                 $(".erro-senha-login").hide();

//                 //VERIFICA SE O E-MAIL EXISTE
//                 if($("#email-login").val() != "teste@teste.com"){
//                     $(".erro-email-login2").show();
//                     $(".erro-senha-login2").hide();
//                     $(".erro-senha-login3").hide();
//                 }else{
//                     //E-MAIL VÃLIDO
//                     $(".erro-email-login2").hide();
//                     //VERIFICA A SENHA
//                     if($("#senha-login").val() == "12345") {
//                         $(".erro-senha-login2").hide();

//                     }else{
//                         if(tentativasLogin < 1){
//                             $(".erro-senha-login2").hide();
//                             $(".erro-senha-login3").show();
//                             //$(".erro-senha-login2").html("Seu acesso estÃ¡ bloqueado.<br>Clique aqui para redefinir a senha.");
//                         }else{
//                             $(".erro-senha-login2").show();
//                             var t = "Senha incorreta.<br>VocÃª possui "+tentativasLogin+" TENTATIVAS.";
//                             if(tentativasLogin == 1){
//                                 t = "Senha incorreta.<br>VocÃª possui "+tentativasLogin+" TENTATIVA.";
//                             }
//                             $(".erro-senha-login2").html(t);
//                             tentativasLogin--;
//                         }

//                     }
//                     isValid++;

//                 }

//             }

//         }else{
//             $(".erro-email-login2").hide();
//             $(".erro-senha-login2").hide();

//             if ($("#email-login").val() == ""){
//                 $(".erro-email-login").show();

//             }
//             if ($("#senha-login").val() == ""){

//                 $(".erro-senha-login").show();
//             }
//         }

//     }

//     if (isValid >= 9) {

//     } else {

//     }

// }

function isEmpty(value) {
  if (value == "") return true;
  return false;
}

function isEmail(value) {
  if (isEmpty(value)) return false;

  var pattern = "([\\w-+]+(?:\\.[\\w-+]+)*@(?:[\\w-]+\\.)+[a-zA-Z]{2,7})";

  var p = new RegExp(pattern, ["i"]);
  var m = p.exec(value);

  if (m != null) return true;
  return false;
}

function isCpf(cpf) {
  cpf = cpf.replace(/\D/g, "");
  var numeros, digitos, soma, i, resultado, digitos_iguais;

  digitos_iguais = 1;

  if (cpf.length < 11) return false;

  for (i = 0; i < cpf.length - 1; i++)
    if (cpf.charAt(i) != cpf.charAt(i + 1)) {
      digitos_iguais = 0;
      break;
    }

  if (!digitos_iguais) {
    numeros = cpf.substring(0, 9);
    digitos = cpf.substring(9);
    soma = 0;
    for (i = 10; i > 1; i--) soma += numeros.charAt(10 - i) * i;
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) return false;
    numeros = cpf.substring(0, 10);
    soma = 0;
    for (i = 11; i > 1; i--) soma += numeros.charAt(11 - i) * i;
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) return false;
    return true;
  } else return false;
}

function isCNPJ(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g, "");

  if (cnpj == "") return false;

  if (cnpj.length != 14) return false;

  // Elimina CNPJs invalidos conhecidos
  if (
    cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999"
  )
    return false;

  // Valida DVs
  tamanho = cnpj.length - 2;
  numeros = cnpj.substring(0, tamanho);
  digitos = cnpj.substring(tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(0)) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(1)) return false;

  return true;
}

//existe 2 validatePassword caso altere um altere o outro
function validatePassword(value) {
  // Add custom validation rule 'password'
  var caractresEspeciais = "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";
  var regexEspaco = new RegExp("[\\s]");
  var regexNome = /[^a-zA-ZÀ-Ÿ \.]/; //não permite caracteres especiais
  var item = "";
  var contemEspaco = false;
  var contemMaiuscula = false;
  var contemMinuscula = false;
  var contemCaracterEspecial = false;

  //não deve conter espaços
  if (regexEspaco.test(value)) {
    contemEspaco = true;
  }

  for (let index = 0; index < value.split("").length; index++) {
    item = value.charAt(index);
    //deve conter letras maiúsculas
    if (!regexNome.test(item) && item.toUpperCase() == value.charAt(index)) {
      contemMaiuscula = true;
    }
    //deve conter letras minúsculas
    if (
      !regexNome.test(item) &&
      item.toLocaleLowerCase() == value.charAt(index)
    ) {
      contemMinuscula = true;
    }
    if (caractresEspeciais.indexOf(item) >= 0) {
      contemCaracterEspecial = true;
    }
  }
  return (
    contemMaiuscula &&
    contemMinuscula &&
    contemCaracterEspecial &&
    !contemEspaco &&
    value.length > 7
  );
}
