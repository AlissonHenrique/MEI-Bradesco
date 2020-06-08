var login_url = '/login/authenticateUser';
var recovery_url = '/login/recoverPassword/';
var invalidLoginMessage = 'Usuário/Senha inválidos.';
var success = 'success';
var invalidLoginMessageAttempts = 'Usuário e/ou senha inválidos.<br> Você tem mais {0} tentativas de acesso.';
var rememberField = 'input:checked';
var rememberEmailKey = 'login_mei';
var email_login = '#email-login';
var erro_senha_login = '#erro-senha-login';
var erro_email_login = '#erro-email-login';
var erro_remember_password = '#errorRememberPassword';
var olho_login = '.olho-login';
var erro_senha_login3 = '.erro-senha-login3';
var url_walkthrough = '?tipo=onboard';

$(document).ready(function () {

    $(email_login).val(window.localStorage.getItem(rememberEmailKey));

    if ($(email_login).val().length > 0) {
        $(this).find("label[for =email-login]").addClass("move-label");  // Remove o label de dentro do input
    }

    $(erro_senha_login).html('');
    $(erro_email_login).html('');
    $(erro_remember_password).html('');

});

// $('#btn-recuperar-senha').click(function(e){
//     ValidFormRecouverPassword();
// })
function clearLoginMessage() {
    $(erro_senha_login).html('');
    $(erro_senha_login3).html('');
    $(erro_email_login).html('');
}


function ValidFormRecouverPassword() {
    clearLoginMessage();
    var usuario = $("#email-esqueci-senha").val();
    if (usuario.trim() == '') {
        $("input:text:eq(0):visible").focus();
        $(erro_remember_password).text('Informe o email.').show();
        $("#email-esqueci-senha").prop('title', 'Informe o email.');
        return false;
    } else if (!isEmail($("#email-esqueci-senha").val())) {
        $(erro_remember_password).text('Digite o campo E-MAIL corretamente.').show();
        $("#email-esqueci-senha").show().focus();
        $("#email-esqueci-senha").prop('title', 'Digite o campo E-MAIL corretamente.');
        return false;
    } else {
        recuperarSenha(usuario);
    }
}

function formularioValido() {
    clearLoginMessage();
    var usuario = $(email_login).val();
    var senha = $("#senha-login").val();
    if (usuario.trim() == '' || senha.trim() == '') {
        ValidateLogin();
        return false;
    }

    var dados = new Object();
    dados.username = usuario.toLowerCase().trim();
    dados.password = senha.trim();
    efetuarLogin(dados);

    return false;
}

function ValidateLogin() {
    clearLoginMessage();
    if ($(email_login).val().length == 0 || !isEmail($(email_login).val())) {
        jQuery('#email-login').attr('title', 'E-mail inválido');
        jQuery('#erro-email-login').text('E-mail inválido').attr('style', 'display:block');
        jQuery('#email-login').focus();
    } else if ($("#senha-login").val().length == 0) {
        jQuery('#senha-login').attr('title', 'Digite a senha.');
        jQuery('#erro-senha-login').html('Digite a senha.').attr('style', 'display:block');
        jQuery('#senha-login').focus();
    }

}

function efetuarLogin(dados) {
    clearLoginMessage();
    var errorMessage = $(erro_senha_login);
    callApi('POST', login_url, JSON.stringify(dados), 'application/json', function (callbackData) {

        if (success === callbackData.status) {
            if (showWalkthrough) {
                window.location.href = meiApplicationRedirPath + url_walkthrough;
                showWalkthrough = false;
            } else {
                window.location.href = meiApplicationRedirPath;
            }

        } else {
            if (callbackData && callbackData.data && callbackData.data.responseJSON &&
                (callbackData.data.responseJSON.status == 401
                    || callbackData.data.responseJSON.status == 403
                    || callbackData.data.responseJSON.status == 412)) {
                var recoveryPasswordMessage = '<p class=\"msg-err erro-senha-login3\" data-toggle=\"modal\" data-target=\"#modal-esqueci\" data-origem=\"menu\">{0}<br>{1}';

                if (callbackData.data.responseJSON.status == 412) {
                    if (callbackData.data.responseJSON.errorCode == 1) {
                        $("#modalTitulo").html('Confirmação de <span>e-mail</span>');
                        $("#messagePassword").html('Para entrar na plataforma, você precisa acessar o link que enviamos em seu e-mail.<br><br>Se não conseguiu localizar, verifique sua caixa de spam.');
                        $('#modal-mensagem-login').modal('show');

                    } else if (callbackData.data.responseJSON.errorCode == 4) {
                        // usuário com senha temporaria expirada
                        $(olho_login).parent().parent().find('p').html('')
                        $(olho_login).parent().parent().append(recoveryPasswordMessage.formatUnicorn('Sua senha temporária expirou.', '<u>Aqui</u>, você consegue recuperá-la.')).css('cursor', 'pointer').show();
                        $(olho_login).parent().parent().find('p').show();

                    } else if (callbackData.data.responseJSON.errorCode == 5) {
                        // usuário suspenso
                        if (window.innerWidth > 990) {
                            errorMessage.html("A plataforma digital MEI está indisponível.<p></p>Por favor, tente mais tarde.").css('cursor', 'default');
                        } else {
                            errorMessage.html("A plataforma digital MEI está indisponível. Por favor, tente mais tarde.").css('cursor', 'default');
                        }
                        errorMessage.show();
                    } else { // Usuario Bloqueado
                        //permite ao usuário reenviar a senha.
                        $(olho_login).parent().parent().find('p').html('')
                        $(olho_login).parent().parent().append(recoveryPasswordMessage.formatUnicorn(invalidLoginMessage, 'Clique <u>aqui</u> para recuperar a senha.')).css('cursor', 'pointer').show();
                        $(olho_login).parent().parent().find('p').show();
                        
                    }
                } else if (callbackData.data.responseJSON.status == 403) {
                    $(olho_login).parent().parent().find('p').html('')
                    $(olho_login).parent().parent().append(recoveryPasswordMessage.formatUnicorn('Você excedeu as tentativas.', 'Seu acesso foi bloqueado, recupere <u>aqui</ul>.')).css('cursor', 'pointer').show();
                    $(olho_login).parent().parent().find('p').show();
                }
                else {
                    if (callbackData.data.responseJSON.quantityAttempts != null)
                        if (callbackData.data.responseJSON.quantityAttempts == 0) {
                            $(olho_login).parent().parent().find('p').html('')
                            $(olho_login).parent().parent().append(recoveryPasswordMessage.formatUnicorn('Você excedeu as tentativas.', 'Seu acesso foi bloqueado, recupere <u>aqui</ul>.')).css('cursor', 'pointer').show();
                            $(olho_login).parent().parent().find('p').show();
                        }
                        else {
                            $(olho_login).parent().parent().find('p').html('');
                            errorMessage.html(invalidLoginMessageAttempts.formatUnicorn(callbackData.data.responseJSON.quantityAttempts)).css('cursor', 'default');
                            errorMessage.show();
                        }
                    else {
                        //acesso negado
                        $(olho_login).parent().parent().find('p').html('');
                        errorMessage.html(callbackData.data.responseJSON.message).css('cursor', 'default');
                        errorMessage.show();
                    }
                }

            } else {
                // Usário não encontrado 
                if (callbackData.status === 'user not found') {
                    $("#modalTitulo").html('Dados <span>inválidos</span>');
                    $("#messagePassword").html('Antes de acessar a plataforma digital MEI, você precisa fazer seu cadastro.<br><br>É só clicar em  <a href="#modal-cadastre-se" class="abrir-modal tabindex" data-toggle="modal" >Cadastrar </a> e seguir o passo a passo.');
                } else {
                    // não conseguiu conexão com a API (ex.: queda de conexão rede.)
                    $("#modalTitulo").html('Algo deu <span>errado...</span>');
                    $("#messagePassword").html('No momento, não é possível acessar a plataforma digital MEI.<br><br>Por favor, tente novamente mais tarde.');
                }
                $('#modal-mensagem-login').modal('show');
            }
        }
    });
}

String.prototype.formatUnicorn = String.prototype.formatUnicorn ||
    function () {
        "use strict";
        var str = this.toString();
        if (arguments.length) {
            var t = typeof arguments[0];
            var key;
            var args = ("string" === t || "number" === t) ?
                Array.prototype.slice.call(arguments)
                : arguments[0];

            for (key in args) {
                str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
            }
        }

        return str;
    };

function recuperarSenha(usuario) {
    var errorMessage = $(erro_remember_password);
    // $('#errorRememberPassword').text('Usuário não econtrado').show()
    errorMessage.html('');
    $("#temporaryPassword").html('');

    callApi('PUT', recovery_url + usuario, usuario, 'application/json', function (callbackData) {

        if (4 === callbackData.data.status) {
            $("#temporaryPassword").html('Senha temporária: ' + callbackData.data.password); // TODO: Remover para produção.
            $('#modal-esqueci .form').hide();
            $('#modal-esqueci .response').show();
        } else if (500 === callbackData.data.status) {
            setTimeout(function () { setFocusEmail("block") }, 10);
            if (callbackData.data.responseJSON.type == "br.com.bradesco.pdpj.business.exception.BusinessException") {
                if (callbackData.data.responseJSON.message === 'Usuário não foi encontrado.'){
                    $("#errorRememberPassword").html('Antes de acessar a plataforma digital MEI, você precisa fazer seu cadastro.<br><br>É só clicar em  <a href="#modal-cadastre-se" id="linkCadastro" class="abrir-modal tabindex" data-toggle="modal" >Cadastrar </a> e seguir o passo a passo.').show();
                    $("#linkCadastro").click(function () {
                        $('#modal-esqueci').modal('hide');
                        $('#modal-cadastre-se').css('overflow-y', 'scroll');
                    });
                } else {
                    errorMessage.text(callbackData.data.responseJSON.message).show();
                }
            } else {
                errorMessage.text(invalidUser).show();
            }

        } else if (0 === callbackData.data.status) {
            setTimeout(function () { setFocusEmail("block") }, 10);
            errorMessage.text(invalidRecoveryMessage).show();
        }
    });
}
