IS_IPAD = navigator.userAgent.match(/iPad/i) != null;
var MOBILE_NUMBER_LENGTH = 13;
var MASK_MOBILE_NUMBER = "+55 (00) 00000-0000";
var MASK_PHONE_NUMBER = "+55 (00) 0000-00009"; // o nove no final, indica que o mesmo é opcional
var showWalkthrough = false;
//ANIMAÇÃO SECTION
function boxTop(idBox) {
  var boxOffset = $(idBox).offset().top;
  return boxOffset;
}

$(document).ready(function () {
  var $target = $(".block"),
    animationClass = "anime-init",
    windowHeight = $(window).height(),
    offset = windowHeight / 1.5;

  function animeScroll() {
    var documentTop = $(document).scrollTop();

    $target.each(function () {
      if (this.animated == undefined) {
        if (documentTop > boxTop(this) - offset) {
          this.animated = true;
          var $animes = $(this).find(".anime");
          $animes.each(function () {
            $(this).addClass(animationClass);
          });
        } else {
          //$(this).removeClass(animationClass);
        }
      }
    });
  }
  animeScroll();

  $(document).scroll(function () {
    animeScroll();
  });
  $("#email-login").show().focus();

  //Tabulacao
  // var tabindex = 1;
  // $('.tabindex').each(function() {
  //     if (this.type != "hidden") {
  //         var $input = $(this);
  //         $input.attr("tabindex", tabindex);
  //         tabindex++;
  //     }
  // });

});

//ANIMAÇÃO SECTION

function downloadTerm(filename, typeTerm) {
  var element = document.createElement("a");
  url = apiUrl + "/term/pdf/download/" + typeTerm;
  element.setAttribute("href", url);
  element.setAttribute("download", filename);
  document.body.appendChild(element);
  element.click();
  // document.body.removeChild(element);
}

function downloadTerms(typeTerm, fileName) {
  this.downloadTerm(fileName, typeTerm);
}
$("#download_adesao").click(function (e) {
  e.preventDefault(); // stop the browser from following
  downloadTerms(1, "termos-adesao.pdf");
});
$("#download_privacidade").click(function (e) {
  downloadTerms(2, "termos-privacidade.pdf");
});

// VIDEO DESTAQUE
function iOSversion() {
  if (/iP(hone|od|ad)/.test(navigator.platform)) {
    // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
    var v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
    return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
  }
}

$(document).ready(function () {
  if ($(window).width() < 768) {
    $(".banner").addClass("mobile");
  } else {
    $(".banner").removeClass("mobile");
    $(".banner").removeClass("ipad");
    ver = iOSversion();

    if (ver != undefined) {
      if (ver[0] <= 9) {
        //console.log("VERSAO: "+ver[0]);
        $(".banner").addClass("ipad");
      }
    }

    var video = $("#video");
    var source = $("#video source");
    source.attr("src", "video/banner-home.mp4");

    // <video id="video" autoplay loop muted>
    //     <source src="video/banner-home.mp4" type="video/mp4">
    // </video>
    // var sources = document.querySelectorAll('video.patient-video source');
    // Define the video object this source is contained inside
    // var video = document.querySelector('video.patient-video');
    // for(var i = 0; i<sources.length;i++) {
    // sources[i].setAttribute('src', sources[i].getAttribute('data-src'));
    // }
    // If for some reason we do want to load the video after, for desktop as opposed to mobile (I'd imagine), use videojs API to load
    video.load();
    video.muted = "muted";
  }
});

//EXPANSÍVEL PERGUNTAS FREQUENTES
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 50 + "px";
    }
  });
}
//EXPANSÍVEL PERGUNTAS FREQUENTES

// FLOAT LABEL

$(".input").focus(function () {
  var label = $(this).parent().find("label");
  $(label).addClass("move-label");
});
//tira o fundo azul do chrome
$("input[type=text]").change(function () {
  var valor = this.value;
  var input = this;

  setTimeout(function () {
    $(input).val("");
    $(input).val(valor);
  }, 200);
});

$(".input").blur(function () {
  var valor = $(this).val();
  if (valor == "") {
    var label = $(this).parent().find("label")[0];
    $(label).removeClass("move-label");
  } else {
    //para tirar o azul do chrome
    $(this).val("");
    $(this).val(valor);
  }
});
// FLOAT LABEL

//MASK CPF
$(document).ready(function () {
  $("#cpf").mask("000.000.000-00", {
    reverse: false,
  });
  $("#cnpj").mask("00.000.000/0000-00", {
    reverse: false,
  });

  var maskBehavior = function (val, e, field) {
    return val.replace(/\D/g, "").length === MOBILE_NUMBER_LENGTH
      ? MASK_MOBILE_NUMBER
      : MASK_PHONE_NUMBER;
  };
  const maskInternal = function (val, e, field, options) {
    field.mask(maskBehavior.apply({}, arguments), options);
  };
  const maskOptions = { onKeyPress: maskInternal };
  $("#celular").mask(maskBehavior, maskOptions);
});
//MASK CPF

//nao colar no campo da senha

$("#senha, #senha-login, #input-senha, #senha-confirm").on(
  "cut copy paste",
  function (e) {
    e.preventDefault();
  }
);

//MOSTRAR SENHA
$(".olho").click(function () {
  if ($("#senha").attr("type") == "text") {
    $("#senha").attr("type", "password");
    $(this).removeClass("active");
  } else {
    $("#senha").attr("type", "text");
    $(this).addClass("active");
  }
});

$(".olho-login").click(function () {
  if ($("#senha-login").attr("type") == "text") {
    $("#senha-login").attr("type", "password");
    $(this).removeClass("active");
  } else {
    $("#senha-login").attr("type", "text");
    $(this).addClass("active");
  }
});

$(".olho").click(function () {
  if ($("#input-senha").attr("type") == "text") {
    $("#input-senha").attr("type", "password");
    $(this).removeClass("active");
  } else {
    $("#input-senha").attr("type", "text");
    $(this).addClass("active");
  }
});

$(".olho-confirm").click(function () {
  if ($("#senha-confirm").attr("type") == "text") {
    $("#senha-confirm").attr("type", "password");
    $(this).removeClass("active");
  } else {
    $("#senha-confirm").attr("type", "text");
    $(this).addClass("active");
  }
});
//MOSTRAR SENHA

//MENU MOBILE
var toggle_overflow_hidden = false;
$(".entrar").click(function () {
  $(".btn-entrar").toggleClass("active");
  $(".form").toggle();
  if (!toggle_overflow_hidden) {
    toggle_overflow_hidden = true;
    $("html").css("overflow", "hidden");
  } else {
    toggle_overflow_hidden = false;
    $("html").css("overflow", "auto");
  }
});
//MENU MOBILE

// CARROSSEL MÁQUINAS

var slideAtual = 0;
$(".carousel-maquinas").on("afterChange", function (
  event,
  slick,
  currentSlide,
  nextSlide
) {
  slideAtual = currentSlide;
});

function startCarouselMaquinas(centerMode, variableWidth, arrows, slide) {
  slide = typeof slide !== "undefined" ? slide : 0;
  $(".carousel-maquinas")
    .slick({
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: false,
      variableWidth: variableWidth,
      initialSlide: slide,
      prevArrow:
        '<button class="slick-prev slick-arrow" aria-label="Máquina Anterior" type="button" style="display: block;">Máquina Anterior</button>',
      nextArrow:
        '<button class="slick-next slick-arrow" aria-label="Próxima Máquina" type="button" style="display: block;">Próxima Máquina</button>',
      arrows: true,
      mobileFirst: true,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            centerMode: centerMode,
          },
        },
      ],
    })
    .on("setPosition", function (event, slick) {
      slick.$slides.css("height", slick.$slideTrack.height() + "px");

      $(".carousel-maquinas .slick-next").mouseenter(function () {
        $(".carousel-maquinas").slick("slickNext");
      });
      $(".carousel-maquinas .slick-prev").mouseenter(function () {
        $(".carousel-maquinas").slick("slickPrev");
      });
    });
}

if (navigator.userAgent.match(/iPad/i) != null) {
  $(".carousel-maquinas").addClass("fullscreen");
  $(".carousel-maquinas").addClass("ipad");
}
startCarouselMaquinas(true, true, false);

$(".infos .cta").click(function (e) {
  window.open($(this).attr("data-href"));
});
$(".carrossel-maquina").click(function (e) {
  if (carr_full) {
    //window.open($(this).attr("data-href"));
  }
});

var carr_full = false;
$(".item-hover").mouseenter(function () {
  if ($(window).width() >= 768 && !IS_IPAD && !carr_full) {
    var slide;

    if ($(this).hasClass("item-max")) {
      slide = 0;
    } else if ($(this).hasClass("item-mob")) {
      slide = 1;
    } else if ($(this).hasClass("item-maq")) {
      slide = 2;
    }

    setTimeout(function (e) {
      carr_full = true;
    }, 100);
    $(".carousel-maquinas").slick("unslick");
    $(".carousel-maquinas").addClass("fullscreen");
    $(".container-item").removeClass("item-hover");
    startCarouselMaquinas(false, false, true, slide);
  }
});

$(".carousel-maquinas").mouseleave(function () {
  if ($(window).width() >= 768 && !IS_IPAD) {
    carr_full = false;
    $(".carousel-maquinas").slick("unslick");
    $(".carousel-maquinas").removeClass("fullscreen");
    $(".container-item").addClass("item-hover");
    startCarouselMaquinas(true, true, false, slideAtual);
  }
});

// CARROSSEL MÁQUINAS

// CARROSSEL PARCEIROS

$(".carousel-parceiros")
  .slick({
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: false,
    variableHeight: false,
    arrows: true,
    mobileFirst: true,
    rows: 0,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          centerMode: false,
          slidesToShow: 3,
          slidesToScroll: 2
        },
      },
    ],
  })
  .on("setPosition", function (event, slick) {
    var t = slick.$slideTrack.height();
    slick.$slides.css("height", t + "px");
  });

// CARROSSEL PARCEIROS

// CARROSSEL INFOS

function callSlick() {
  $(".carousel-infos").slick({
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    arrows: false,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 767,
        settings: "unslick",
      },
    ],
  });
}

var unslicked = false;

var form992 = false;
window.addEventListener(
  "resize",
  function () {
    //this.console.log("hoho");
    viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    if (viewportWidth > 768) {
      unslicked = false;
      $(".banner").removeClass("mobile");
    } else {
      if (!unslicked) {
        unslicked = true;
        callSlick();
        $(".banner").addClass("mobile");
      }
    }
    if (viewportWidth < 992 && viewportWidth >= 768) {
      $(".carousel-parceiros").slick("slickGoTo", 1);
    }
    if (viewportWidth >= 992) {
      if (!form992) {
        $(".form").css("display", "block");
        form992 = true;

        if (toggle_overflow_hidden) {
          toggle_overflow_hidden = false;
          $("html").css("overflow", "auto");
        }

        if ($(".btn-entrar").hasClass("active")) {
          $(".btn-entrar").toggleClass("active");
        }
      }
    } else {
      if (form992) {
        $(".form").css("display", "none");

        form992 = false;
      }
    }
  },
  false
);
viewportWidth = window.innerWidth || document.documentElement.clientWidth;
if (viewportWidth > 768) {
  unslicked = false;
} else {
  unslicked = true;
}

$(".carousel-infos").slick({
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  variableWidth: true,
  arrows: false,
  mobileFirst: true,
  responsive: [
    {
      breakpoint: 767,
      settings: "unslick",
    },
  ],
});

// CARROSSEL INFOS

//ANCORAGEM
$('.card-inner a[href^="#"]').on("click", function (e) {
  e.preventDefault();
  var id = $(this).attr("href"),
    targetOffset = $(id).offset().top;

  $("html, body").animate(
    {
      scrollTop: targetOffset - 88,
    },
    500
  );
});

//BUTTON VER MAIS

$("#btn-ver-mais").on("click", function (e) {
  e.preventDefault();

  $("#extra-contents").show();
  setFocusFields("#extra-content");
  $("#btn-ver-mais").hide();
  $("#btn-topo").show();

  /*
  $('html, body').animate({
    scrollTop: $(document).height() - 260
  }, 1000, "linear");
  */
});
//BUTTON VOLTAR AO TOPO

$("#btn-topo").on("click", function (e) {
  e.preventDefault();

  $("html, body").animate(
    {
      scrollTop: boxTop($("#perguntas-f")) - 150,
    },
    300,
    "linear"
  );
});

//AJUSTE MODAL CADASTRO

$(".abrir-modal").click(function () {
  $("html").css("overflow", "hidden");
  var origem = $(this).attr("data-origem");
  var text = "";
  var title = "";

  switch (origem) {
    case "menu":
      text =
        "<p>Conte com o suporte necessário para a gestão do seu negócio.</p>";
      title =
        "Antes de apresentar todos os serviços que estão à sua disposição pra facilitar o dia a dia de sua empresa, precisamos de um breve cadastro. É só informar seus dados aqui:";
      break;
    case "faixa":
      text =
        "<p>Conte com o suporte necessário para a gestão do seu negócio.</p>";
      title =
        "Antes de apresentar todos os serviços que estão à sua disposição pra facilitar o dia a dia de sua empresa, precisamos de um breve cadastro. É só informar seus dados aqui:";
      break;
    case "formalizar":
      text = "<h4>Formalização</h4><p>Sua empresa com CNPJ.</p>";
      title =
        "Antes de apresentar as informações necessárias pra formalizar sua empresa, precisamos de um breve cadastro. É só informar seus dados aqui:";
      break;
    case "gestao":
      text =
        "<h4>Gestão do negócio</h4><p>Controle de estoque, emissão de documentos fiscais e loja virtual. Tudo grátis!</p>";
      title =
        "Pra conhecer todas as soluções que facilitam o gerenciamento financeiro do seu negócio, basta preencher esse breve cadastro:";
      break;
    case "contabil":
      text =
        "<h4>Assessoria contábil</h4><p>Emita e pague o DAS, emita notas fiscais e faça sua declaração anual.</p>";
      title =
        "Pra conferir os serviços contábeis que você tem à disposição, a preços que cabem no seu bolso, é só preencher esse cadastro:";
      break;
    case "parceiros":
      text =
        "<p>Conte com o suporte necessário para a gestão do seu negócio.</p>";
      title =
        "Antes de apresentar todos os serviços que estão à sua disposição pra facilitar o dia a dia de sua empresa, precisamos de um breve cadastro. É só informar seus dados aqui:";
      break;
  }

  // $('.descricao-modal').html(text);
  $("#desc-cadastro").html(title);
});

$("#modal-cadastre-se").on("shown.bs.modal", function (e) {
  //console.log("showed");

  if ($("#modal-mensagem-login:visible").length > 0) {
    $("#modal-mensagem-login").modal("hide");
  }

  $("html").css("overflow", "hidden");

  var wh = $(window).height();
  var ww = $(window).width();
  var modalHeight = $("#modal-cadastre-se .modal-content").outerHeight();

  var modalWidth = $("#modal-cadastre-se .modal-dialog").outerWidth();
  var positionX = (ww - modalWidth) / 2 + modalWidth * 0.05;

  $(".descricao-modal").width(modalWidth * 0.3);
  $(".descricao-modal").css("left", positionX + "px");
  $(".descricao-modal").css("opacity", 1);

  if (modalHeight > wh) {
    $(".descricao-modal").addClass("fixed");
    $(".descricao-modal").css(
      "top",
      wh * 0.9 - $(".descricao-modal").outerHeight() + "px"
    );
  } else {
    $(".descricao-modal").removeClass("fixed");
    var top =
      30 + modalHeight * 0.9 - $(".descricao-modal").outerHeight() + "px";
    $(".descricao-modal").css("top", top);
  }
});

//ABRIR CHAT - BOTÃO DO RODAPÉ
$("#abrirChat").click(function () {
  var left = ($(window).width() - 465) / 2;
  var top = ($(window).height() - 610) / 2;
  window.open(
    "https://chats.bradesco/netcallcenter/chat5_juridica/Cliente/frm_login.aspx?IdArea=6&txtapelido=&cpf=&telefone=&Idioma=0&sel=HomePage&layout=default_mei",
    "ChatOnline",
    "scrollbars=no, width=465, height=610, left=" + left + ", top=" + top
  );
});

// TODO: Movido para login.js
// //RECUPERAR SENHA
// $('#btn-recuperar-senha').click(function(e){

//     e.preventDefault();
//     validaFormRecuperarSenha();
//     //$('#modal-esqueci .form').hide();
//     //$('#modal-esqueci .response').show();
// })
$("#modal-esqueci").on("show.bs.modal", function (e) {
  $("#modal-esqueci .form").show();
  $("#modal-esqueci .response").hide();
});

$("#modal-esqueci").on("show.bs.modal", function (e) {
  $("#modal-esquecii");
  $(".bg-modal").show();
});

$("#modal-mensagem-login").on("show.bs.modal", function (e) {
  $("html").css("overflow", "hidden");
  $(".bg-modal").show();
  $("#modal-mensagem-login .form").show();
});

$("#modal-confirma-email").on("show.bs.modal", function (e) {
  $("html").css("overflow", "hidden");
  $(".bg-modal").show();
  $("#modal-confirma-email .table").show();
});

// TERMOS
$(".checkbox-termo").each(function () {
  $(this).prop("checked", false);
});

$(".checkbox-termo").click(function () {
  if ($(this).prop("checked")) {
    var tipo = $(this).attr("data-termo");
    var termAdhesionTypeId = "1";
    var termPrivacyTypeId = "2";
    $(this).prop("checked", false);
    var urlViewTerm = apiUrl + "/term/pdf/";
    var urlDownloadTerm = urlViewTerm + "download/";
    var activeTermModal;
    switch (tipo) {
      case "adesao":
        activeTermModal = $("#modal-termos-adesao");
        urlViewTerm = urlViewTerm + termAdhesionTypeId;
        urlDownloadTerm = urlDownloadTerm + termAdhesionTypeId;
        break;
      case "privacidade":
        activeTermModal = $("#modal-termos-privacidade");
        urlViewTerm = urlViewTerm + termPrivacyTypeId;
        urlDownloadTerm = urlDownloadTerm + termPrivacyTypeId;
        break;
    }
    activeTermModal.modal("show");
    activeTermModal.find("iframe").attr("src", "").attr("src", urlViewTerm);
    activeTermModal
      .find(".getFile")
      .attr("href", "")
      .attr("href", urlDownloadTerm);
  }
});

$("#modal-cadastre-se").on("show.bs.modal", function () {
  clearForm();
});

$(".bg-modal,.alert,.alert2").hide();
$(".modal-termos").on("shown.bs.modal", function () {
  $("html").css("overflow", "hidden");
  $(".bg-modal").show();

  var aceite = false;
  var aceite2 = false;
  $("#aceitar-termos-adesao").click(function () {
    if (aceite == true) {
      $(".alert").hide();
      $(".modal-termos").modal("hide");
      $("#checkbox-adesao").prop("checked", true);
    } else {
      $(".alert").show();
    }
  });
  $("#aceitar-termos-privacidade").click(function () {
    if (aceite2 == true) {
      $(".alert2").hide();
      $(".modal-termos").modal("hide");
      $("#checkbox-privacidade").prop("checked", true);
    } else {
      $(".alert2").show();
    }
  });

  //// link
  $(".click1").click(function () {
    aceite = true;
    $(".alert").hide();
    $(".bt1").addClass("btn-color-red");
  });

  $(".click2").click(function () {
    aceite2 = true;
    $(".alert2").hide();
    $(".bt2").addClass("btn-color-red");
  });

  $("#aceitar-termos-adesao-2").click(function () {
    $(".modal-termos").modal("hide");
    $("#checkbox-adesao").prop("checked", true);
  });

  $("#aceitar-termos-privacidade-2").click(function () {
    $(".modal-termos").modal("hide");
    $("#checkbox-privacidade").prop("checked", true);
  });
});

$("#modal-cadastre-se").on("hide.bs.modal", function () {
  setTimeout(function () {
    $("html").css("overflow", "auto");
    $('#errorRegisteredMessage').hide();
  }, 300);

  //sempre muda para o conteudo de cadastro e nao de concluido, e limpa os campos.
  clearForm();
  setTimeout(function (e) {
    $("#cadastro-form").show();
    $("#cadastro-concluido").hide();
  }, 1000);
});

$(".modal-termos").on("hide.bs.modal", function () {
  $(".alert,.alert2").hide();
  $(".bg-modal").hide();
  $("#modal-cadastre-se").css("overflow", "auto");
  //reset scroll contents
  $("#content-termos-adesao").scrollTop(0);
  $("#content-termos-privacidade").scrollTop(0);
});

var readAll = false;

$("#aceitar-term").click(function (e) {
  $("html").css("overflow", "auto");
});

$("#content-term-text").on("scroll", function () {
  if (readAll) return;
  readAll = this.scrollHeight - this.scrollTop === this.clientHeight;
  $("html").css("overflow", "auto");

  if (readAll) {
    document.getElementById("aceitar-term").disabled = false;
  }
});

$("#modal-esqueci").on("hide.bs.modal", function () {
  $(".bg-modal").hide();
  setTimeout(function () {
    $("html").css("overflow", "auto");
    clearEsqueciSenha();
  }, 300);
});

$("#modal-mensagem-login").on("hide.bs.modal", function () {
  $(".bg-modal").hide();
  $("#modal-mensagem-login").css("overflow", "auto");
  setTimeout(function () {
    $("html").css("overflow", "auto");
  }, 300);
});

$("#modal-confirma-email").on("hide.bs.modal", function () {
  $(".bg-modal").hide();
  $("#modal-confirma-email").css("overflow", "auto");
  setTimeout(function () {
    $("html").css("overflow", "auto");
  }, 300);
  showWalkthrough = true; // Seta variave de sessão para iniciar Passo a Passo (Walkthrough)
});

function clearForm() {
  $("#cadastro-form label").removeClass("move-label");
  $("#nome").val("");
  $("#celular").val("");
  $("#cpf").val("");
  $("#cnpj").val("");
  $("#email").val("");
  $("#confirmar-email").val("");
  $("#input-senha").val("");
  $("#senha-confirm").val("");
  $(".checkbox-termo").prop("checked", false);
  $(".msg-err").hide();
}

function clearEsqueciSenha() {
  $("#recuperarSenha label").removeClass("move-label");
  $("#email-esqueci-senha").val("");
  $(".msg-err").hide();
}

//Botao cadastro sucesso
$(".bt-to-init").click(function (e) { });

//FORCA A SECTION "abra-app" mostrar modo mobile para IPAD
$(document).ready(function () {
  if (IS_IPAD) {
    $("#abra-desk").css("display", "none");
    $("#abra-mobile").css("display", "block");

    //remove a barra prinicpal do banner quando é ipad
    $(".banner .principal").hide();
  }
  //FIREFOX que inicia com o campo de login preenchido
  if ($("#email-login").val().length != 0) {
    $("#l-email-login").addClass("move-label");
  }
  if (jQuery("#email-login").val().length != 0) {
    $("#l-senha-login").addClass("move-label");
  }
});

//funcao para pegar parametro url
function getParameter(theParameter) {
  var params = window.location.search.substr(1).split("&");

  for (var i = 0; i < params.length; i++) {
    var p = params[i].split("=");
    if (p[0] == theParameter) {
      return decodeURIComponent(p[1]);
    }
  }
  return false;
}

$(".btn-esqueci").click(function () {
  $("html").css("overflow", "hidden");
});

$(document).ready(function () {
  var panels = document.querySelectorAll(".tabs");
  var panel;
  var content;

  for (var x = 0; x < panels.length; x++) {
    var element = panels[x].children[0];

    element.addEventListener("click", function (event) {
      var atual = event.target;
      var t;
      panel = atual.id;
      content = atual.parentElement.children[1].id;

      setTimeout(function () {
        t = document.getElementById(panel).classList.contains("active");
        if (t == true) {
          for (var y = 0; y < panels.length; y++) {
            var elementPanel = panels[y].children[0];
            var elementContent = panels[y].children[1];

            elementPanel.classList.remove("active");
            elementContent.removeAttribute("style");
          }

          $("#" + panel).addClass("active");
          $("#" + content).attr("style", "max-height: 100%");
        } else {
          $("#" + panel).removeClass("active");
          $("#" + content).removeAttr("style", "max-height: 100%");
        }
      });
    });
  }
});
///////LOGIN MOBILE FOCUS/////
var inpPassword = document.querySelector("#senha-login");
var inpEmail = document.querySelector("#email-login");
var texto = document.querySelector(".acesso-txt");
var btn = document.querySelector("#btn-entrar");
var width = screen.width;
var height = screen.height;

var form = document.querySelector("#form-login");
// alert(width + "w" + " h " + height)
inpPassword.addEventListener("focus", function () {
  if (width === 360 && height <= 756) {
    texto.style.marginTop = "1rem";
    texto.style.marginBottom = "0";
    form.style.marginTop = "-16px";
  }
  if (width === 360 && height <= 720) {
    texto.style.fontSize = "1rem";
    btn.style.marginTop = "-20px";
  }
  if (width === 360 && height <= 640) {
    texto.style.marginTop = "0";
    texto.style.fontSize = "1rem";
    texto.style.marginBottom = "0";
    form.style.marginTop = "-30px";
    btn.style.marginTop = "-20px";
  }
});
inpPassword.addEventListener("focusout", function () {
  texto.removeAttribute("style");
  form.removeAttribute("style");
  btn.removeAttribute("style");
});

///Email////
inpEmail.addEventListener("focus", function () {
  if (width === 360 && height <= 640) {
    texto.style.marginTop = "0";
    texto.style.fontSize = "1rem";
    texto.style.marginBottom = "0";
    form.style.marginTop = "-14px";
  }
});
inpEmail.addEventListener("focusout", function () {
  texto.removeAttribute("style");
  form.removeAttribute("style");
});
