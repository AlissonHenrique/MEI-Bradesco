import { Highlight } from './highlight';
declare var $: any;

export class Tutorialcontrol {
    

    hl: Highlight;

    arrayTexts = [];//array dessa estrutura {elementId:"", text:"", scaleX:1, scaleY:1, curve:0}
    textIndex = 0;
    total = 0;

    idTooltip;

    canvas;

    orientation;

    constructor(_canvas = null, _texts = [], _orientation="horizontal",_idTooltip = "tooltipid"){
        
        this.arrayTexts = _texts;

        this.total = this.arrayTexts.length;

        this.canvas = _canvas;

        this.idTooltip = _idTooltip;

        this.orientation = _orientation;

        this.hl = new Highlight(_canvas);

        if(this.arrayTexts[0].pivo == null){
            this.arrayTexts[0].pivo = "center";
        }

        this.hl.highlightElement({
            currentEl: document.getElementById(this.arrayTexts[0].elementId),
            scaleX: this.arrayTexts[0].scaleX,
            scaleY: this.arrayTexts[0].scaleY,
            pivo: this.arrayTexts[0].pivo,
            curve: this.arrayTexts[0].curve,
            padding: this.arrayTexts[0].padding,
            fixPositionX: this.arrayTexts[0].fixPositionX,
            fixPositionY: this.arrayTexts[0].fixPositionY,
            onFinish: this.showTooltip
            
        })

        

    }

    showTooltip = () => {
            
        if( $("#"+this.idTooltip).length != 0 ){
            //posciona o tooltip em relaçao ao elemento em destaque
            
            

            if(this.hl.params.currentEl != null){

                let newX = 0;
                let newY = 0;

                $("#tooltipText").html(this.arrayTexts[this.textIndex].text);
                
                $("#"+this.idTooltip).css("display", "block");
                let rectTool = $("#"+this.idTooltip)[0].getBoundingClientRect();
                 $("#"+this.idTooltip).css("display", "none");
                
                 let rectEl = this.hl.params.currentEl.getBoundingClientRect();

                if(this.orientation == "horizontal"){
                    $("#arrowBottom").css("display", "none");
                    $("#arrowLeft").css("display", "block");
                    newX = rectEl.left + rectEl.width + (rectEl.width*this.hl.params.scaleX - rectEl.width)/2 + window.pageXOffset;
                    newY = rectEl.top + rectEl.height + (rectEl.height*this.hl.params.scaleY - rectEl.height)/2 + window.pageYOffset;

                    newX += 20;
                    newY -= rectTool.height+16;

                }else if(this.orientation == "vertical"){
                    $("#arrowBottom").css("display", "block");
                    $("#arrowLeft").css("display", "none");

                    newX = rectEl.left - (rectEl.width*this.hl.params.scaleX - rectEl.width)/2 + window.pageXOffset;
                    newY = rectEl.top - (rectEl.height*this.hl.params.scaleY - rectEl.height)/2 + window.pageYOffset;

                    newX += 20;
                    newY -= rectTool.height+20;

                }else{

                }

                
                
                $("#"+this.idTooltip).css("top",newY);
                $("#"+this.idTooltip).css("left",newX);

                //$(".b-back").css("display","none");
                if( this.textIndex != 0){
                    $(".b-back").css("display","block");
                }
                

            }

           

            
            this.hl.enterElement("#"+this.idTooltip);
        }
    }


    next(){
        
        if(this.textIndex+1 < this.arrayTexts.length){
            this.textIndex++;
            this.hl.nextElement({
                currentEl: document.getElementById(this.arrayTexts[this.textIndex].elementId),
                scaleX: this.arrayTexts[this.textIndex].scaleX,
                scaleY: this.arrayTexts[this.textIndex].scaleY,
                pivo: "center",
                curve: this.arrayTexts[this.textIndex].curve,
                onFinish: this.showTooltip
                
            });

        }
        
    }

    previous(){
        if(this.textIndex-1 >= 0){
            this.textIndex--;
            this.hl.nextElement({
                currentEl: document.getElementById(this.arrayTexts[this.textIndex].elementId),
                scaleX: this.arrayTexts[this.textIndex].scaleX,
                scaleY: this.arrayTexts[this.textIndex].scaleY,
                pivo: "center",
                curve: this.arrayTexts[this.textIndex].curve,
                onFinish: this.showTooltip
            });
        }
    }

    testTarget(){
        $("#rect-target").attr("x",10);
    }

}
