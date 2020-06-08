import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
declare var $: any;

@Component({
  selector: 'select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss']
})
export class SelectBoxComponent implements OnInit {
  @Input('idinput') id: string = "idselect";
  @Input() value: string = "";
  @Input() placeholder: string = "";
  @Input() hintMsg: string = "";
  @Input() errorMsg: string = "Campo inválido.";
  @Input() errorReqMsg: string = "Campo obrigatório!";
  

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.fControl.disable() : this.fControl.enable();
    
  }
  private _disabled = false;

  @Input() fControl = new FormControl('steak-0', []);

  @Input() itens: any[] = [];

  constructor() { }

  ngOnInit() {
    this._disabled ? this.fControl.disable() : this.fControl.enable();
    this.fControl.setValue(this.value);
    
  }

  selectOpen(event){
    
    if(event){
      $("#"+this.id).parent().parent().find(".setas").addClass("active");
    }else{
      $("#"+this.id).parent().parent().find(".setas").removeClass("active");
    }
    
  }

  @Input() changed = function(event){
    // console.log(event);
  }

}



