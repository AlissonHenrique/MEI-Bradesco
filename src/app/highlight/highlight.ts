import * as PIXI from 'pixi.js-legacy'
declare var createjs:any;
declare var $: any;

export class Highlight {

    
    graphics = new PIXI.Graphics();
    bgBlack = new PIXI.Graphics();
    canvas:HTMLCanvasElement;
    renderer;
    stage;

    container;

    rectTop = new PIXI.Graphics();
    rectRight = new PIXI.Graphics();
    rectBottom = new PIXI.Graphics();
    rectLeft = new PIXI.Graphics();

    rectBg = new PIXI.Graphics();

    currentRect = {
        x: 0,
        y: 0,
        width:0,
        height:0
    };

    currentEl;
    scaleX = 1;
    scaleY = 1;
    pivo = "left";
    curve = 0;

    onFinish;

    inTransition = false;

    initRefDistX = 0;
    initRefDistY = 0;

    params = {
        currentEl: undefined,
        scaleX: 1,
        scaleY: 1,
        pivo: "left",
        curve: 0,
        fixPositionX:0,
        fixPositionY:0,
        padding: 0,
        onFinish: undefined

    };

    hasScrollbar = null;
    scrollFix = 0;

    isClosed = false;

    //beeSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 26 64" enable-background="new 0 0 64 64"><path fill="#3f3438" d="M53.24 49.886 62 60.795 48.703 56.52z"/><path fill="#ffce31" d="m51.03 30.786l-.242 2.564 1.87-1.798-.488 2.538 2.05-1.609-.78 2.464 2.231-1.351-1.091 2.345 2.397-1.041-1.417 2.172 2.53-.68-1.74 1.93 2.6-.29-2.01 1.645 2.612.097-2.23 1.348 2.571.448-2.391 1.046 2.497.766-2.507.82 2.39 1.12-2.58.526 2.23 1.384-2.631.22 2.051 1.64-2.64-.08 1.85 1.857-2.61-.377 1.63 2.05-2.557-.65 1.397 2.2-2.47-.9 1.171 2.33-2.371-1.14.94 2.433-2.26-1.353.713 2.506-2.122-1.546.479 2.557-1.97-1.727.26 2.594-1.828-1.881.042 2.597-1.664-2.02-.168 2.6-1.502-2.144-.374 2.574-1.317-2.25-.581 2.537-1.14-2.347-.778 2.49-.96-2.43-.96 2.43-.77-2.49-1.14 2.348-.578-2.538-1.322 2.25-.377-2.574-1.493 2.144-.17-2.6-1.665 2.03.041-2.608-1.824 1.882.258-2.594-1.98 1.727.483-2.557-2.122 1.544.709-2.504-2.253 1.351.939-2.431-2.373 1.14 1.171-2.33-2.473.9 1.4-2.204-2.551.654z"/><path fill="#3f3438" d="m10.896 39.65l36.404-11.824-.487 2.533 2.048-1.605-.771 2.466 2.22-1.353-1.08 2.343 2.392-1.04-1.412 2.17 2.519-.681-1.732 1.934 2.598-.293-2.01 1.648 2.607.102-2.227 1.34 2.567.452-2.39 1.046 2.502.762-2.502.828 2.38 1.114-2.579.528 2.229 1.389-2.63.221 2.055 1.64-2.637-.09 1.848 1.86-2.616-.373 1.633 2.046-2.553-.653 1.398 2.21-2.468-.91 1.17 2.334-2.376-1.14.939 2.436-2.253-1.359.71 2.509-2.12-1.549.479 2.559-1.977-1.72.258 2.59-1.82-1.88.04 2.598-1.664-2.02-.166 2.594-1.499-2.14-.378 2.576-1.313-2.256-.585 2.54-1.14-2.347-.776 2.487-.959-2.422-.959 2.422-.771-2.487-1.145 2.347-.575-2.54-1.323 2.256-.378-2.576-1.489 2.15-.177-2.603-1.662 2.023.039-2.6-1.824 1.88.262-2.59-1.981 1.72.484-2.559-2.121 1.549.705-2.51-2.253 1.35.939-2.429-2.371 1.14 1.17-2.331-2.475.91 1.403-2.21-2.556.65 1.63-2.047-2.612.377 1.848-1.86-2.637.08 2.051-1.634-2.628-.221 2.232-1.385-2.586-.527 2.386-1.115z"/><g fill="#c9e4f2"><path d="m60.05 4.332c-3.603-4.513-10.246-2.28-14.839 4.994-4.595 7.272-7.952 19.966-7.952 19.966s15.536 2.551 20.13-4.715c4.594-7.268 6.265-15.731 2.664-20.245"/><path d="m3.917 8.889c-3.541 4.339-1.892 12.395 2.62 19.291 4.518 6.894 19.788 4.308 19.788 4.308s-3.305-12.08-7.818-18.973c-4.517-6.898-11.05-8.967-14.59-4.626"/></g><path fill="#ffce31" d="m33.61 25.23l.975-1.805.339 2.02 1.086-1.748.21 2.037 1.193-1.675.064 2.05 1.318-1.585-.101 2.044 1.446-1.469-.287 2.03 1.587-1.32-.508 1.985 1.725-1.137-.741 1.911 1.856-.913-.99 1.798 1.966-.655-1.234 1.644 2.039-.373-1.463 1.451 2.07-.086-1.642 1.241 2.065.182-1.793 1.031 2.029.421-1.899.83 1.973.633-1.976.694 1.893.883-2.038.492 1.788 1.08-2.08.278 1.67 1.253-2.1.059 1.524 1.422-2.09-.153 1.37 1.569-2.065-.366 1.203 1.695-2.02-.559 1.024 1.8-1.95-.75.852 1.89-1.872-.93.667 1.96-1.778-1.096.481 2.02-1.667-1.257.297 2.048-1.55-1.401.104 2.07-1.414-1.531-.08 2.071-1.27-1.65-.268 2.05-1.116-1.751-.452 2.02-.954-1.84-.632 1.973-.793-1.914-.792 1.914-.623-1.973-.96 1.84-.453-2.02-1.115 1.751-.269-2.05-1.263 1.65-.09-2.072-1.411 1.532.101-2.07-1.54 1.4.289-2.048-1.668 1.258.48-2.02-1.777 1.099.666-1.96-1.871.93.851-1.89-1.955.746 1.031-1.796-2.02.556z"/><path fill="#3f3438" d="m9.237 33.14l1.773-.598-1.714-.747 1.824-.432-1.633-.908 1.854-.245-1.515-1.08 1.871-.02-1.367-1.263 1.857.213-1.187-1.426 1.812.456-.982-1.571 1.734.691-.766-1.681 1.631.906-.549-1.766 1.511 1.091-.341-1.814 1.382 1.244-.159-1.841 1.258 1.367.004-1.846 1.143 1.462.151-1.84 1.029 1.548.282-1.83.92 1.604.396-1.804.831 1.652.494-1.782.744 1.695.575-1.755.671 1.727.663-1.727.586 1.755.739-1.695.491 1.782.83-1.652.396 1.803.926-1.603.286 1.83 1.032-1.546.154 1.84 1.146-1.462v1.848l1.27-1.365-.16 1.845 1.385-1.245-.345 1.813 1.51-1.087-.55 1.763 1.629-.903-.768 1.679 1.735-.688-.987 1.568 1.814-.455-1.193 1.425 1.86-.214-1.369 1.254 1.87.03-1.521 1.08 1.86.236-1.631.908 1.821.433-1.714.746 1.774.597-1.776.657 1.706.81-1.83.493 1.62.96-1.86.32 1.523 1.111-1.888.149 1.415 1.243-1.9-.028 1.289 1.375-1.882-.21 1.15 1.488-1.857-.378 1.01 1.584-1.81-.544.84 1.667-1.75-.717.689 1.744-1.669-.874.511 1.799-1.581-1.028.336 1.839-1.476-1.17.16 1.86-1.352-1.31-.03 1.868-1.215-1.428-.216 1.85-1.067-1.54-.4 1.828-.91-1.639-.572 1.78-.747-1.717-.741 1.717-.578-1.78-.911 1.639-.401-1.828-1.07 1.54-.207-1.85-1.217 1.428-.029-1.869-1.352 1.311.155-1.87-1.474 1.178.337-1.838-1.582 1.026.516-1.798-1.675.874.687-1.742-1.751.714.849-1.674-1.812.551 1.01-1.581-1.855.374 1.15-1.484-1.882.21 1.287-1.376-1.893.029 1.412-1.245-1.889-.148 1.524-1.11-1.866-.32 1.623-.96-1.827-.494 1.705-.811z"/><path fill="#fcfcfa" d="m34.633 32.504c0 3.602-2.906 6.517-6.492 6.517-3.584 0-6.49-2.915-6.49-6.517 0-3.596 2.906-6.513 6.49-6.513 3.586 0 6.492 2.917 6.492 6.513"/><path fill="#3f3438" d="m33.619 32.504c0 2.476-1.998 4.481-4.465 4.481-2.461 0-4.461-2.01-4.461-4.481 0-2.474 2-4.48 4.461-4.48 2.467 0 4.465 2.01 4.465 4.48"/><ellipse fill="#fcfcfa" cx="14.845" cy="32.504" rx="5.41" ry="5.43"/><g fill="#3f3438"><ellipse cx="15.858" cy="32.504" rx="3.72" ry="3.734"/><path d="m36.32 16.912c-5.478-.146-8.747 1.894-10.291 6.01-.221.588.706.833.982.271 1.275-2.588 3.475-5.567 9.307-5.252 0 0 .001 0 .002 0 .635 0 .635-1.025 0-1.025"/><path d="m17.842 24.615c-3.768-3.925-7.543-4.761-11.582-2.933-.578.262-.097 1.082.499.879 2.758-.941 6.448-1.514 10.346 2.778 0 0 .001 0 .002 0 .45.444 1.184-.28.735-.724"/></g></svg>';
    //beeSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -10 120 120"><mask id="myMask"><rect x="0" y="0" width="100" height="100" fill="white" /><path d="M10,35 A20,20,0,0,1,50,35 A20,20,0,0,1,90,35 Q90,65,50,95 Q10,65,10,35 Z" fill="black" /></mask><polygon points="-10,110 110,110 110,-10" fill="orange" /><circle cx="50" cy="50" r="50" mask="url(#myMask)" /></svg>';
    //beeSvg = '<svg xmlns="http://www.w3.org/2000/svg"><mask id="aMask"><rect rx="20" ry="20" width="60" height="100" style="fill:black;stroke:white;stroke-width:1;"/></mask><rect rx="20" ry="20" width="150" height="150" mask="url(#aMask)" style="fill:green;stroke:black;stroke-width:1;opacity:1" /></svg>'

    bgSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="'+window.innerWidth+'" height="'+window.innerHeight+'">'+
                '<mask id="aMask">' +
                    '<rect x="0" y="0" width="'+window.innerWidth+'" height="'+window.innerHeight+'" fill="white" />'+
                    '<rect x="20" y="20" rx="20" ry="20" width="60" height="100" style="fill:black;stroke:black;stroke-width:1;"/>'+
                '</mask>'+
                '<rect x="0" y="0" width="'+window.innerWidth+'" height="'+window.innerHeight+'" mask="url(#aMask)" style="fill:black;stroke:black;stroke-width:1;opacity:0.6" />' +
            '</svg>';

    spriteSvg;

    constructor(_canvas=null){
        
        


        var escopo = this;
        if(_canvas != null){
            createjs.Ticker.framerate = 42;

            this.canvas = _canvas;//(<HTMLCanvasElement>_canvas.nativeElement);
            this.renderer = PIXI.autoDetectRenderer( {width:window.innerWidth, 
                                                        height:window.innerHeight, 
                                                        view: this.canvas,
                                                        transparent: true,
                                                        backgroundColor : 0x000000,
                                                        forceCanvas: true
                                                        });
            
            this.stage = new PIXI.Container();
            this.container = new PIXI.Container();
            this.stage.addChild(this.container);
            
            
            //this.container.addChild(this.rectTop);
            //this.container.addChild(this.rectRight);
            //this.container.addChild(this.rectBottom);
            //this.container.addChild(this.rectLeft);

            

            //this.container.addChild(this.rectBg);

            this.container.interactive = true;

            console.log(this.bgSvg);
            
            let texture = PIXI.Texture.from(this.bgSvg);
            this.spriteSvg = new PIXI.Sprite(texture);

            this.container.addChild(this.spriteSvg);
            
            this.container.alpha = 1;
            
            
            
            //evento de resize

            window.onresize = function (event){
                if(escopo.renderer){
                    //gh
                    if(escopo.params.currentEl != null && $("#tooltipid").length > 0 && $("#tooltipid").css("display") != "none"){
            
                        let rectTool = $("#tooltipid")[0].getBoundingClientRect();
                        let rectEl = escopo.params.currentEl.getBoundingClientRect();
            
                        //let newX = rectEl.left + rectEl.width + (rectEl.width*escopo.params.scaleX - rectEl.width)/2 + window.pageXOffset;
                        //let newY = rectEl.top + rectEl.height + (rectEl.height*escopo.params.scaleY - rectEl.height)/2 + window.pageYOffset;
                        
                        let upRight = escopo.getRefSideUpRight();

                        let newX = upRight.right + escopo.initRefDistX  + window.pageXOffset;
                        let newY = upRight.up + escopo.initRefDistY + window.pageYOffset;

                        //newX += 20;
                        //newY -= rectTool.height+16;
                        
                        $("#tooltipid").css("left",newX);
                        $("#tooltipid").css("top",newY);
                        
                        
                    }

                    //escopo.renderer.resize(window.innerWidth,window.innerHeight);
                }
                    
            }
            var loopVar = setInterval(loopInterval, 23);//16.6 ~= 60fps, 33.3 ~= 30fps

            this.container// events for drag start
            .on('mousedown', clickedContainer)
            .on('touchstart', clickedContainer);
            

            
        }
        function loopInterval(){
            
            //fix de posicao da presenca de scrollbar
            let _hasScroll = window.innerWidth > document.documentElement.clientWidth;
            
            if(_hasScroll != escopo.hasScrollbar){
                escopo.hasScrollbar = _hasScroll;
                if(escopo.hasScrollbar){
                    //$(escopo.canvas).css("left", 3);
                    escopo.scrollFix = 3;
                    
                }else{
                    //$(escopo.canvas).css("left", 0);
                    escopo.scrollFix = 0;
                }


            }

            //quando clicado botao de fechar do tootip sync no status
            if($(escopo.canvas).css("display") == "none" && !escopo.isClosed && $(escopo.canvas).css("opacity") == 0){
                       
                escopo.container.scale.x = 30;
                escopo.container.scale.y = 30;
                escopo.isClosed = true;
                
            }

            //Logica de resize
            if(escopo.renderer.width != window.innerWidth || escopo.renderer.height != window.innerHeight){
                escopo.renderer.resize(window.innerWidth,window.innerHeight);

                if(escopo.renderer.width < 992){
                    $(escopo.canvas).css("display", "none");
                    
                    $("#tooltipid").css("display", "none");
                }else{
                    
                    if(escopo.container.scale.x == 1 && !escopo.isClosed){
                        $(escopo.canvas).css("display", "block");
                    }
                   
                    if( $("#tooltipid").css("opacity") == 1){
                        $("#tooltipid").css("display", "block");
                    }
                    
                }
            }
            escopo.refresh();
            

            //  RENDERIZACAO DO PIXI SEM ELE NAO APARECE NADA
            escopo.renderer.render(escopo.stage);
        }
        function clickedContainer(){
            
            escopo.highlightOut();
        }

        

    }

    highlight(x,y,width,height){
        
        //this.graphics.lineStyle(5, 0xFEEB77, 1);
        this.inTransition = true;
        this.currentRect.x = x;
        this.currentRect.y = y;
        this.currentRect.width = width;
        this.currentRect.height = height;

        $(this.canvas).css("display", "block");

        this.drawV3(x,y,width,height);


        this.container.scale.x = 30;
        this.container.scale.y = 30;
        createjs.Tween.get(this.container.scale).to({x: 1,y:1},800,createjs.Ease.linear)
        .call(onComplete);
        var escopo = this;
        function onComplete(){
            escopo.inTransition = false;
        }

    }
    
    
    


    highlightElement(_params){

        (_params.currentEl) ? this.params.currentEl=_params.currentEl : this.params.currentEl=undefined;
        (_params.scaleX != undefined) ? this.params.scaleX=_params.scaleX : this.params.scaleX=1;
        (_params.scaleY != undefined) ? this.params.scaleY=_params.scaleY : this.params.scaleY=1;
        (_params.pivo != undefined) ? this.params.pivo=_params.pivo : this.params.pivo="left";
        (_params.curve != undefined) ? this.params.curve=_params.curve : this.params.curve=0;
        (_params.fixPositionX != undefined) ? this.params.fixPositionX=_params.fixPositionX : this.params.fixPositionX=0;
        (_params.fixPositionY != undefined) ? this.params.fixPositionY=_params.fixPositionY : this.params.fixPositionY=0;
        (_params.padding != undefined) ? this.params.padding=_params.padding : this.params.padding=0;
        (_params.onFinish != undefined) ? this.params.onFinish=_params.onFinish : this.params.onFinish=function(){};
        
        

        this.inTransition = true;

        var rect = this.params.currentEl.getBoundingClientRect();
        $(this.canvas).css("display", "block");

        var pbottom = rect.top + rect.height*0.90;
        
        if(pbottom > window.innerHeight || rect.top < 140){
            
            this.scrollToElement(this.params.currentEl);
        }else{
            console.log(this.params.padding);
            let newX = rect.left+this.params.fixPositionX-this.params.padding;
            let newY = rect.top+this.params.fixPositionY-this.params.padding;
            let newWidth = rect.width*this.params.scaleX + this.params.padding;
            let newHeight = rect.height*this.params.scaleY + this.params.padding;
            
            this.drawSvg(newX, newY, newWidth, newHeight);

            this.container.scale.x = 20;
            this.container.scale.y = 20;
            createjs.Tween.get(this.container.scale).to({x: 1,y:1},900,createjs.Ease.linear)
            .call(onComplete);
            var escopo = this;
            
        }
        
        function onComplete(){
            escopo.params.onFinish();
            escopo.inTransition = false;
        }

        
    }
    
    nextElement( _params ){
        
        this.inTransition = true;
        $("#tooltipid").animate({top:"-=200",opacity:0},150);

        createjs.Tween.get(this.container.scale).to({x: 40,y:40},600,createjs.Ease.linear)
        .call(onComplete);
        let escopo = this;
        function onComplete(){
            //escopo.inTransition = false;
            //console.log(_params.scaleX,_params.scaleY);
            escopo.highlightElement(_params);
        }
    }

    


    highlightOut(){
        this.inTransition = true;
        createjs.Tween.get(this.container.scale).to({x: 40,y:40},200,createjs.Ease.linear)
        .call(onComplete);
        let escopo = this;
        function onComplete(){
            escopo.inTransition = false;
            $(escopo.canvas).css("display", "none");
        }

        //gh
        if( $("#tooltipid").length > 0 ){
            this.exitElement("#tooltipid");
        }
        this.isClosed = true;
    }

    draw(x,y,width,height){
        this.rectTop.clear();
        this.rectRight.clear();
        this.rectBottom.clear();
        this.rectLeft.clear();

        var diffWidth = 0;
        var diffHeight = 0;
        
        
        if(this.params.pivo == "center"){
            
            diffWidth = width - width/this.params.scaleX;
            diffHeight = Math.ceil (height - height/this.params.scaleY);
           
        }

        let rY = Math.ceil(y-diffHeight/2);
        let rX = Math.ceil(x-diffWidth/2) + this.scrollFix;
        let rX2 = Math.ceil(x+width-diffWidth/2) + this.scrollFix;
        let rY2 = Math.ceil(y+height-diffHeight/2);
        let rWidth =  rX2 - rX;
        let rHeight =  rY2 - rY;

        this.rectTop.beginFill(0x000000);
        this.rectTop.drawRect(0,0,this.renderer.width, rY);
        this.rectTop.endFill();

        this.rectBottom.beginFill(0x000000);
        this.rectBottom.drawRect(0,rY2,this.renderer.width, Math.ceil(this.renderer.height-(y+height)+diffHeight/2))
        this.rectRight.endFill();

        this.rectRight.beginFill(0x000000);
        this.rectRight.drawRect(rX2, rY,this.renderer.width-(x+width)+diffWidth/2,rHeight );
        this.rectRight.endFill();

        this.rectLeft.beginFill(0x00000);
        this.rectLeft.drawRect(0,rY,rX,rHeight );
        this.rectLeft.endFill();

        // Rectangle
        /*
        this.rectLeft.lineStyle(0.5, 0x000000, 1);
        this.rectLeft.beginFill(0x000000);
        this.rectLeft.moveTo(rX,rY+20);
        this.rectLeft.arcTo(rX,rY,rX+20,rY,15);
        this.rectLeft.lineTo(rX,rY);

        this.rectLeft.moveTo(rX2-20,rY);
        this.rectLeft.arcTo(rX2,rY,rX2,rY+20,15);
        this.rectLeft.lineTo(rX2,rY);

        this.rectLeft.moveTo(rX2,rY2-20);
        this.rectLeft.arcTo(rX2,rY2,rX2-20,rY2,15);
        this.rectLeft.lineTo(rX2,rY2);

        this.rectLeft.moveTo(rX+20,rY2);
        this.rectLeft.arcTo(rX,rY2,rX,rY2-20,15);
        this.rectLeft.lineTo(rX,rY2);
        */
        

        var pivotx = x+width/2;
        var pivoty = y+height/2;
        
        
        
        this.container.pivot.x = pivotx;
        this.container.pivot.y = pivoty;

        this.container.x = pivotx;
        this.container.y = pivoty;
    }

    drawSvg(x,y,width,height){

        var diffWidth = 0;
        var diffHeight = 0;
        
        
        if(this.params.pivo == "center"){
            
            diffWidth = width - width/this.params.scaleX;
            diffHeight = Math.ceil (height - height/this.params.scaleY);
           
        }

        let rY = Math.ceil(y-diffHeight/2);
        let rX = Math.ceil(x-diffWidth/2) + this.scrollFix;
        let rX2 = Math.ceil(x+width-diffWidth/2) + this.scrollFix;
        let rY2 = Math.ceil(y+height-diffHeight/2);
        let rWidth =  rX2 - rX;
        let rHeight =  rY2 - rY;

        let theSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="'+window.innerWidth+'" height="'+window.innerHeight+'">'+
                        '<mask id="aMask">' +
                            '<rect x="0" y="0" width="'+window.innerWidth+'" height="'+window.innerHeight+'" fill="white" />'+
                            '<rect x="'+rX+'" y="'+rY+'" rx="'+this.params.curve+'" ry="'+this.params.curve+'" width="'+rWidth+'" height="'+rHeight+
                            '" style="fill:black;stroke:black;stroke-width:1;"/>'+
                        '</mask>'+
                        '<rect x="0" y="0" width="'+window.innerWidth+'" height="'+window.innerHeight+'" mask="url(#aMask)" style="fill:black;stroke:black;stroke-width:1;opacity:0.6" />' +
                    '</svg>';
        
        let pivotx = x+width/2;
        let pivoty = y+height/2;
        
        this.container.pivot.x = pivotx;
        this.container.pivot.y = pivoty;

        this.container.x = pivotx;
        this.container.y = pivoty;

        let texture = PIXI.Texture.from(theSvg);
        this.spriteSvg.texture = texture;

    }


    drawV3(x,y,width,height){
        this.rectBg.clear();

        var diffWidth = 0;
        var diffHeight = 0;
        
        if(this.params.pivo == "center"){
            
            diffWidth = width - width/this.params.scaleX;
            diffHeight = height - height/this.params.scaleY;

        }
        this.rectBg.beginFill(0x000000);
        this.rectBg.drawRect(0,0,this.renderer.width,this.renderer.height);
        this.rectBg.endFill();

        this.rectBg.beginHole();
        this.rectBg.drawRoundedRect(x-diffWidth/2,y-diffHeight/2,width,height,this.params.curve);
        this.rectBg.endHole();



        var pivotx = x+width/2;
        var pivoty = y+height/2;
        
        
        
        this.container.pivot.x = pivotx;
        this.container.pivot.y = pivoty;

        this.container.x = pivotx;
        this.container.y = pivoty;
    }


    refresh(){
        let display = $(this.canvas).css("display");
        if(this.params.currentEl && !this.inTransition && display != "none"){
            
            var rect = this.params.currentEl.getBoundingClientRect();
            this.drawSvg(rect.left,rect.top,rect.width*this.params.scaleX,rect.height*this.params.scaleY);
        }
    }
    

    scrollToElement(el){
        let finished = false;
        var escopo = this;
        var rectElement = el.getBoundingClientRect();

        $('html,body').animate({ scrollTop: $(el).offset().top-window.innerHeight+rectElement.height*this.params.scaleY }, 'slow', function(){
            if(!finished){
                finished = true;
                escopo.highlightElement(escopo.params);
            }
            
        });
       
    }

    enterElement(el){
        
        if($(el).css("display") == "none"){

            
            
            $(el).css("opacity","0");
            $(el).css("display","block");

            let rTool = $(el)[0].getBoundingClientRect();

            let upRight = this.getRefSideUpRight();

            //let rEl = this.params.currentEl.getBoundingClientRect();
            
            this.initRefDistX = rTool.left - upRight.right;
            this.initRefDistY = rTool.top - upRight.up;

            $(el).css("top", "-=200");
            
        
            $(el).animate({top:"+=200",opacity:1},400);

            
            
        }

    }

    getRefSideUpRight(){
        let diffWidth = 0;
        let diffHeight = 0;
        let rect = this.params.currentEl.getBoundingClientRect();

        if(this.params.pivo == "center"){
            
            diffWidth = rect.width*this.params.scaleX-rect.width;
            diffHeight = Math.ceil(rect.height*this.params.scaleY-rect.height);
            
        }

        let sideUp = rect.top + diffHeight/2;
        let sideRight = rect.left + rect.width + diffWidth/2;

        return {up:sideUp, right:sideRight};

    }
    

    exitElement(el){
        if($(el).css("display") != "none"){
            
            $(el).animate({top:"-=200",opacity:0},150, function(){
                $(el).css("display", "none");
            });
        }
    }

    

}
