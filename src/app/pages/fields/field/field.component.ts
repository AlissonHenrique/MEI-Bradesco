import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
declare var $:any;

@Component({
  selector: 'field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  @Input() atributes: any;
  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    if(this._required)
      this.fControl.setValidators([Validators.required]);
  }
  private _required = true;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.fControl.disable() : this.fControl.enable();  
  }
  private _disabled = false;
  

  id: string = "idfield";
  placeholder: string = "";
  value: string = "";
  hintMsg: string = "";
  errorMsg: string = "";
  errorReqMsg: string = "";
  mask: string = "";
  fControl = new FormControl('', []);

  constructor() {
    
    this.atributes =
    {
      id: "idfield",
      placeholder: "",
      value: "",
      hintMsg: "",
      errorMsg: "",
      errorReqMsg: "",
      fControl: new FormControl('', []),
      mask: ''
    };
    
  }

  ngOnInit() {
    
    
    if(this.atributes.id){
      this.id = this.atributes.id;
    }
    if(this.atributes.placeholder){
      this.placeholder = this.atributes.placeholder;
    }
    if(this.atributes.value){
      this.value = this.atributes.value;
    }
    if(this.atributes.hintMsg){
      this.hintMsg = this.atributes.hintMsg;
    }
    if(this.atributes.errorMsg){
      this.errorMsg = this.atributes.errorMsg;
    }
    if(this.atributes.errorReqMsg){
      this.errorReqMsg = this.atributes.errorReqMsg;
    }
    if(this.atributes.mask){
      this.mask = this.atributes.mask;
      if(this.mask != ''){
        $("#"+this.id).mask(this.mask, {reverse: false});
      }
    }
    if(this.atributes.fControl){
      this.fControl = this.atributes.fControl;
      this.fControl.setValue(this.value);
    }


  }

}
