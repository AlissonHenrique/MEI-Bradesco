import { TweenMax, Power2, TimelineLite } from "gsap/all";
declare var $: any;

export class SvgControl {
  //controle usando jquery
  targetRectId = "rect-target";

  objTarget;

  arrayElements = [];
  arrayElementsDesk = [];
  arrayElementsMobile = [];
  indexElement = 0;
  indexText = 0;

  mobileMode = false;

  currentElement = {
    text: [""],
    domElement: undefined, //setado internamente nesta classe
    oldRect: undefined, //setado internamente nesta classe
    element: undefined,
    scaleX: 1,
    scaleY: 1,
    rect_width: undefined,
    rect_height: undefined,
    pivo: "left",
    curve: 0,
    fixPositionX: 0,
    fixPositionY: 0,
    fixScroll: 0,
    padding: 0,
    tipPosition: "top", //or right
    onFinish: undefined,
  };

  oldElement;

  tween;

  initRefDistX = 0;
  initRefDistY = 0;

  idTooltip = "#tooltipid";
  isClosed = false;
  inTransition = false;
  started = false;
  autoScrolling = false;
  functionAfterScroll = () => {};
  diameterCircle = 30;

  constructor() {
    this.objTarget = $("#" + this.targetRectId);

    this.objTarget.attr("width", window.innerWidth * 1.3);
    this.objTarget.attr("height", window.innerHeight * 1.3);

    //this.objTarget.attr('x', ( window.innerWidth - this.objTarget.attr('width') )/2);
    //this.objTarget.attr('y', ( window.innerHeight - this.objTarget.attr('height') )/2);
    TweenMax.set(this.objTarget, { transformOrigin: "50% 50%", scale: 1 });

    window.onresize = (event) => {
      let svgwidth = window.innerWidth;
      let svgheight = window.innerHeight;

      $("#hl-white-mask").attr("width", svgwidth);
      $("#hl-white-mask").attr("height", svgheight);

      $("#hl-main-bg").attr("width", svgwidth);
      $("#hl-main-bg").attr("height", svgheight);

      $("#hl-svg").attr("width", svgwidth);
      $("#hl-svg").attr("height", svgheight);

      this.objTarget.attr("width", window.innerWidth * 1.3);
      this.objTarget.attr("height", window.innerHeight * 1.3);

      //this.objTarget.attr('x', ( window.innerWidth - this.objTarget.attr('width') )/2);
      //this.objTarget.attr('y', ( window.innerHeight - this.objTarget.attr('height') )/2);
      TweenMax.set(this.objTarget, { transformOrigin: "50% 50%", scale: 1 });
      if (this.arrayElements.length != 0) {
        //tooltip position

        if (
          $(escopo.idTooltip).css("display") != "none" &&
          $(escopo.idTooltip).css("display") != undefined
        ) {
          /*
                    let upRight = escopo.getRefSideUpRight();

                    let newX = upRight.right + escopo.initRefDistX  + window.pageXOffset;
                    let newY = upRight.up + escopo.initRefDistY + window.pageYOffset;

                    $(escopo.idTooltip).css("left",newX);
                    $(escopo.idTooltip).css("top",newY);
                    */
          let newX = 0;
          let newY = 0;

          $("#tooltipText").html(this.currentElement.text[this.indexText]);

          let rectTool = $(this.idTooltip)[0].getBoundingClientRect();

          let rectEl = this.currentElement.domElement.getBoundingClientRect();

          if (this.currentElement.tipPosition == "right") {
            $("#arrowBottom").css("display", "none");
            $("#arrowLeft").css("display", "block");
            newX =
              rectEl.left +
              rectEl.width +
              (rectEl.width * this.currentElement.scaleX - rectEl.width) / 2 +
              this.currentElement.padding +
              this.currentElement.fixPositionX +
              window.pageXOffset;
            newY =
              rectEl.top +
              rectEl.height +
              (rectEl.height * this.currentElement.scaleY - rectEl.height) / 2 -
              this.currentElement.padding +
              this.currentElement.fixPositionY +
              window.pageYOffset;

            newX += 20;
            newY -= rectTool.height;
          } else if (this.currentElement.tipPosition == "top") {
            $("#arrowBottom").css("display", "block");
            $("#arrowLeft").css("display", "none");

            newX =
              rectEl.left -
              (rectEl.width * this.currentElement.scaleX - rectEl.width) / 2 +
              this.currentElement.padding +
              this.currentElement.fixPositionX +
              window.pageXOffset;
            newY =
              rectEl.top -
              (rectEl.height * this.currentElement.scaleY - rectEl.height) / 2 -
              this.currentElement.padding +
              this.currentElement.fixPositionY +
              window.pageYOffset;

            newX += 20;
            newY -= rectTool.height + 20;
          }

          $(this.idTooltip).css("top", newY);
          $(this.idTooltip).css("left", newX);
        }

        //VESAO MOBILE
        if (this.arrayElementsMobile) {
          if ($("#hl-main-bg").attr("width") < 768) {
            if (!this.mobileMode) {
              console.log;
              this.mobileMode = true;

              this.arrayElements = this.arrayElementsMobile;
              this.currentElement = this.arrayElements[this.indexElement];
              this.setupCurrentElement();
            }
          } else {
            if (this.mobileMode) {
              this.mobileMode = false;

              this.arrayElements = this.arrayElementsDesk;
              this.currentElement = this.arrayElements[this.indexElement];
              this.setupCurrentElement();
            }
          }
        } else {
          //CASO NÃO TENHA VERSÃO MOBILE
          //===== Restringe apenas para desktop =====

          if ($("#hl-main-bg").attr("width") < 992) {
            $("#hl-svg").css("display", "none");

            $(this.idTooltip).css("display", "none");
          } else {
            if (!this.isClosed) {
              $("#hl-svg").css("display", "block");
            }

            if ($(this.idTooltip).css("opacity") == 1) {
              $(this.idTooltip).css("display", "block");
            }
          }
        }
      }
    };
    setInterval(loopInterval, 23);
    let escopo = this;
    function loopInterval() {
      escopo.refresh();
    }
  }

  refresh() {
    if (
      $("#hl-svg").css("display") == "none" &&
      !this.isClosed &&
      $("#hl-svg").css("opacity") == 0
    ) {
      this.isClosed = true;
    }
    if (this.arrayElements.length != 0) {
      this.refreshPosition();
    }

    /*
        let display = $("svg").css("display");

        if(this.currentElement.domElement && !this.inTransition && display != "none"){

            var rect = this.currentElement.domElement.getBoundingClientRect();

        }
        */
  }

  start(_arrayElements, _arrayElementsMobile = undefined) {
    $("#hl-svg").css("display", "block");
    this.arrayElementsDesk = _arrayElements;
    this.arrayElementsMobile = _arrayElementsMobile;

    this.arrayElements = this.arrayElementsDesk;

    if (this.arrayElementsMobile) {
      if ($("#hl-main-bg").attr("width") < 768) {
        this.mobileMode = true;
        this.arrayElements = this.arrayElementsMobile;
      }
    }

    this.indexElement = 0;
    this.currentElement = this.arrayElements[this.indexElement];

    //this.highlightElement();
    this.setupCurrentElement();
    let rectEl = this.currentElement.domElement.getBoundingClientRect();
    let pbottom = rectEl.top + rectEl.height * 0.9;
    this.functionAfterScroll = this.highlightElement;
    this.scrollToElement(
      this.currentElement.domElement,
      this.currentElement.fixScroll
    );
    /*
        if( (pbottom > window.innerHeight || rectEl.top < 140) && !this.autoScrolling){
            this.functionAfterScroll = this.highlightElement;
            this.scrollToElement(this.currentElement.domElement,this.currentElement.fixScroll);
        }else{
            this.highlightElement();
        }*/
  }

  switchToolTip() {
    this.exitTooltip();
    let scope = this;
    setTimeout(function () {
      $("#tooltipText").html(scope.currentElement.text[this.indexText]);
      scope.enterTooltip();
    }, 400);
  }

  next() {
    if (this.indexElement + 1 < this.arrayElements.length) {
      //se possui mais textos
      if (
        this.indexText + 1 <
        this.arrayElements[this.indexElement].text.length
      ) {
        this.indexText++;
        this.switchToolTip();

        if (this.indexElement != 0) {
          $(".b-back").css("display", "block");
        } else {
          if (this.indexText == 0) {
            $(".b-back").css("display", "none");
          } else {
            $(".b-back").css("display", "block");
          }
        }
      } else {
        //se nao possui vai pro proximo elemento
        this.circle();
        this.exitTooltip();
        this.indexElement++;
        this.currentElement = this.arrayElements[this.indexElement];
        this.setupCurrentElement();
        this.indexText = 0;
      }
    }
  }
  previous() {
    if (this.indexElement - 1 >= 0 || this.indexText >= 0) {
      //se possui mais textos
      if (this.indexText - 1 >= 0) {
        this.indexText--;
        this.switchToolTip();

        if (this.indexElement != 0) {
          $(".b-back").css("display", "block");
        } else {
          if (this.indexText == 0) {
            $(".b-back").css("display", "none");
          } else {
            $(".b-back").css("display", "block");
          }
        }
      } else {
        //se nao possui vai pro elemento anterior
        this.circle();
        this.exitTooltip();
        this.indexElement--;
        this.currentElement = this.arrayElements[this.indexElement];
        this.setupCurrentElement();
        this.indexText = 0;
      }
    }
  }

  circle() {
    let escope = this;
    function circleFinished() {
      this.moveToCenter();
    }
    this.inTransition = true;

    let center = this.getCenter();

    this.tween = TweenMax.to(this.objTarget, 0.4, {
      x: center.x - this.diameterCircle / 2,
      y: center.y - this.diameterCircle / 2,
      width: this.diameterCircle,
      height: this.diameterCircle,
      attr: { rx: 50, ry: 50 },
      onComplete: circleFinished,
      onCompleteScope: this,
    });
  }

  moveToCenter() {
    function finishMoving() {
      this.highlightElement();
    }
    if (this.currentElement.domElement) {
      let center = this.getCenter();
      let rectEl = this.currentElement.domElement.getBoundingClientRect();
      let pbottom = rectEl.top + rectEl.height * 0.9;
      if (!this.autoScrolling) {
        this.functionAfterScroll = () => {};
        this.scrollToElement(
          this.currentElement.domElement,
          this.currentElement.fixScroll
        );
      }

      /*
      if (
        (pbottom > window.innerHeight || rectEl.top < 140) &&
        !this.autoScrolling
      ) {
        //this.functionAfterScroll = this.highlightElement;
        this.scrollToElement(
          this.currentElement.domElement,
          this.currentElement.fixScroll
        );
      }
*/
      this.inTransition = true;

      this.tween = TweenMax.to(this.objTarget, 0.8, {
        x: center.x - this.diameterCircle / 2,
        y: center.y - this.diameterCircle / 2,
        onComplete: finishMoving,
        onCompleteScope: this,
      });
    }
  }

  end() {}

  setupCurrentElement() {
    if (this.currentElement.text == undefined) this.currentElement.text = [""];

    if (this.currentElement.domElement == undefined)
      this.currentElement.domElement = $("#" + this.currentElement.element)[0];

    if (this.currentElement.scaleX == undefined) this.currentElement.scaleX = 1;
    if (this.currentElement.scaleY == undefined) this.currentElement.scaleY = 1;
    if (this.currentElement.pivo == undefined)
      this.currentElement.pivo = "center";
    if (this.currentElement.curve == undefined) this.currentElement.curve = 10;
    if (this.currentElement.fixPositionX == undefined)
      this.currentElement.fixPositionX = 0;
    if (this.currentElement.fixPositionY == undefined)
      this.currentElement.fixPositionY = 0;
    if (this.currentElement.fixScroll == undefined)
      this.currentElement.fixScroll = 0;
    if (this.currentElement.padding == undefined)
      this.currentElement.padding = 0;
    if (this.currentElement.tipPosition == undefined)
      this.currentElement.tipPosition = "top";
    if (this.currentElement.onFinish == undefined)
      this.currentElement.onFinish = this.finishEnterDefault;
  }

  highlightElement() {
    $("#hl-svg").css("opacity", 1);
    this.isClosed = false;

    this.setupCurrentElement();

    if (this.currentElement.domElement) {
      let rectEl = this.currentElement.domElement.getBoundingClientRect();

      let scaledWidth =
        rectEl.width * this.currentElement.scaleX +
        this.currentElement.padding * 2;
      let scaledHeight =
        rectEl.height * this.currentElement.scaleY +
        this.currentElement.padding * 2;

      if (this.currentElement.rect_width) {
        scaledWidth = this.currentElement.rect_width;
      }
      if (this.currentElement.rect_height) {
        scaledWidth = this.currentElement.rect_height;
      }

      let px = rectEl.left + this.currentElement.fixPositionX;
      let py = rectEl.top + this.currentElement.fixPositionY;

      if (this.currentElement.pivo == "center") {
        px += (rectEl.width - scaledWidth) / 2;
        py += (rectEl.height - scaledHeight) / 2;
      }

      this.inTransition = true;
      this.tween = TweenMax.to(this.objTarget, 0.7, {
        x: px,
        y: py,
        width: scaledWidth,
        height: scaledHeight,
        attr: { rx: this.currentElement.curve, ry: this.currentElement.curve },
        onComplete: this.currentElement.onFinish,
        onCompleteScope: this,
      });
    }
  }

  highlightOut() {
    $("body").css("overflow", "visible");
    this.inTransition = true;
    if (this.objTarget) {
      this.isClosed = true;
      this.tween = TweenMax.to(this.objTarget, 0.7, {
        x: 0,
        y: 0,
        width: window.innerWidth * 1.2,
        height: window.innerHeight * 1.2,
        attr: { rx: 0, ry: 0 },
        onComplete: this.finishOut,
      });
    }
  }
  finishOut() {
    this.inTransition = false;
    $("#hl-svg").css("display", "none");
  }
  finishEnterDefault() {
    this.inTransition = false;
    this.enterTooltip();
  }

  refreshPosition() {
    if (this.inTransition && this.autoScrolling) {
      this.moveToCenter();
    }

    if (
      this.currentElement.domElement &&
      !TweenMax.isTweening(this.objTarget) &&
      !this.isClosed &&
      !this.autoScrolling &&
      !this.inTransition
    ) {
      let rectEl = this.currentElement.domElement.getBoundingClientRect();
      if (this.currentElement.oldRect == undefined) {
        this.currentElement.oldRect = rectEl;
      }

      //apenas da refresh na posicao quando se mexe

      //if(this.currentElement.oldRect.left != rectEl.left || this.currentElement.oldRect.top != rectEl.top){

      let scaledWidth =
        rectEl.width * this.currentElement.scaleX +
        this.currentElement.padding * 2;
      let scaledHeight =
        rectEl.height * this.currentElement.scaleY +
        this.currentElement.padding * 2;

      if (this.currentElement.rect_width) {
        scaledWidth = this.currentElement.rect_width;
      }
      if (this.currentElement.rect_height) {
        scaledWidth = this.currentElement.rect_height;
      }

      let px = rectEl.left + this.currentElement.fixPositionX;
      let py = rectEl.top + this.currentElement.fixPositionY;

      if (this.currentElement.pivo == "center") {
        px += (rectEl.width - scaledWidth) / 2;
        py += (rectEl.height - scaledHeight) / 2;
      }
      this.tween = TweenMax.to(this.objTarget, 0, {
        x: px,
        y: py,
        width: scaledWidth,
        height: scaledHeight,
      });

      this.currentElement.oldRect = rectEl;
      //}
    }
  }

  getCenter() {
    let diffWidth = 0;
    let diffHeight = 0;

    let rect = this.currentElement.domElement.getBoundingClientRect();

    if (this.currentElement.pivo == "center") {
      diffWidth = rect.width * this.currentElement.scaleX - rect.width;
      diffHeight = rect.height * this.currentElement.scaleY - rect.height;
    }

    let py =
      rect.top -
      diffHeight / 2 -
      this.currentElement.padding +
      this.currentElement.fixPositionY;
    let px =
      rect.left -
      diffWidth / 2 +
      this.currentElement.fixPositionX -
      this.currentElement.padding;

    let totalWidth =
      rect.width * this.currentElement.scaleX + this.currentElement.padding * 2;
    let totalHeight =
      rect.height * this.currentElement.scaleY +
      this.currentElement.padding * 2;

    px += totalWidth / 2;
    py += totalHeight / 2;

    return { x: px, y: py };
  }

  getRefSideUpRight() {
    let diffWidth = 0;
    let diffHeight = 0;

    let rect = this.currentElement.domElement.getBoundingClientRect();

    if (this.currentElement.pivo == "center") {
      diffWidth = rect.width * this.currentElement.scaleX - rect.width;
      diffHeight = rect.height * this.currentElement.scaleY - rect.height;
    }

    let sideUp =
      rect.top +
      diffHeight / 2 -
      this.currentElement.padding +
      this.currentElement.fixPositionY;
    let sideRight =
      rect.left +
      rect.width +
      diffWidth / 2 +
      this.currentElement.fixPositionX +
      this.currentElement.padding;

    return { up: sideUp, right: sideRight };
  }

  scrollToElement(el, correction = 0) {
    let finished = false;
    var escopo = this;
    var rectElement = el.getBoundingClientRect();
    this.autoScrolling = true;

    let scrollExtra = 0;
    if (this.mobileMode) {
      scrollExtra = 60;
    }

    $("html,body").animate(
      {
        scrollTop:
          $(el).offset().top -
          window.innerHeight +
          rectElement.height * this.currentElement.scaleY +
          correction,
      },
      "slow",
      function () {
        if (!finished) {
          finished = true;
          //escopo.highlightElement();
          escopo.autoScrolling = false;
          escopo.functionAfterScroll();
        }
      }
    );
  }

  //DOM Element
  enterElement(el) {
    if ($(el).css("display") == "none") {
      $(el).css("opacity", "0");
      $(el).css("display", "block");

      let rTool = $(el)[0].getBoundingClientRect();

      let upRight = this.getRefSideUpRight();

      //let rEl = this.params.currentEl.getBoundingClientRect();

      this.initRefDistX = rTool.left - upRight.right;
      this.initRefDistY = rTool.top - upRight.up;

      $(el).css("top", "-=200");

      $(el).animate({ top: "+=200", opacity: 1 }, 400);
    }
  }
  enterTooltip() {
    if ($(this.idTooltip).length != 0) {
      let newX = 0;
      let newY = 0;

      $("#tooltipText").html(this.currentElement.text[this.indexText]);
      let rectEl = this.currentElement.domElement.getBoundingClientRect();
      if (this.mobileMode) {
        newX =
          rectEl.left -
          (rectEl.width * this.currentElement.scaleX - rectEl.width) / 2 +
          this.currentElement.padding +
          this.currentElement.fixPositionX +
          window.pageXOffset;
        newX += 20;
        $(this.idTooltip).css("left", newX);
      }

      $(this.idTooltip).css("display", "block");
      let rectTool = $(this.idTooltip)[0].getBoundingClientRect();
      $(this.idTooltip).css("display", "none");

      if (this.currentElement.tipPosition == "right") {
        $("#arrowBottom").css("display", "none");
        $("#arrowLeft").css("display", "block");
        newX =
          rectEl.left +
          rectEl.width +
          (rectEl.width * this.currentElement.scaleX - rectEl.width) / 2 +
          this.currentElement.padding +
          this.currentElement.fixPositionX +
          window.pageXOffset;
        newY =
          rectEl.top +
          rectEl.height +
          (rectEl.height * this.currentElement.scaleY - rectEl.height) / 2 -
          this.currentElement.padding +
          this.currentElement.fixPositionY +
          window.pageYOffset;

        newX += 20;
        newY -= rectTool.height;
      } else if (this.currentElement.tipPosition == "top") {
        $("#arrowBottom").css("display", "block");
        $("#arrowLeft").css("display", "none");

        newX =
          rectEl.left -
          (rectEl.width * this.currentElement.scaleX - rectEl.width) / 2 +
          this.currentElement.padding +
          this.currentElement.fixPositionX +
          window.pageXOffset;
        newY =
          rectEl.top -
          (rectEl.height * this.currentElement.scaleY - rectEl.height) / 2 -
          this.currentElement.padding +
          this.currentElement.fixPositionY +
          window.pageYOffset;

        newX += 20;
        newY -= rectTool.height + 20;
      } else {
      }

      $(this.idTooltip).css("top", newY);
      $(this.idTooltip).css("left", newX);

      $(this.idTooltip).css("display", "block");
      rectTool = $(this.idTooltip)[0].getBoundingClientRect();
      $(this.idTooltip).css("display", "none");

      //$(".b-back").css("display","none");
      if (this.indexElement != 0) {
        $(".b-back").css("display", "block");
      } else {
        if (this.indexText == 0) {
          $(".b-back").css("display", "none");
        } else {
          $(".b-back").css("display", "block");
        }
      }

      this.enterElement($(this.idTooltip)[0]);
    }
  }

  exitTooltip() {
    if ($(this.idTooltip).length > 0) this.exitElement($(this.idTooltip)[0]);
  }
  exitElement(el) {
    if ($(el).css("display") != "none") {
      $(el).animate({ top: "-=200", opacity: 0 }, 150, function () {
        $(el).css("display", "none");
      });
    }
  }
}
