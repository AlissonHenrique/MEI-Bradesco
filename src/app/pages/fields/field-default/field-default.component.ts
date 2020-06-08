import { Component, OnInit, Input } from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import { Validators, FormControl } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'field-default',
  templateUrl: './field-default.component.html',
  styleUrls: ['./field-default.component.scss']
})
export class FieldDefaultComponent implements OnInit {
  nire:boolean;
  @Input() validanire:string;
  @Input('idinput') id: string = "fielddefault";
  @Input() value: string = "";
  @Input() placeholder: string = "";
  @Input() hintMsg: string = "";
  @Input() errorMsg: string = "Campo inválido.";
  @Input() errorReqMsg: string = "Campo obrigatório!";
  @Input() maxlength: string = '';
  @Input() inputmodeNumeric: string;
  inputmodeNumericValue: boolean;
  
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
    
    
  }
  private _disabled = false;


  @Input() fControl = new FormControl('', []);
  constructor() { }

  ngOnInit() {
    if (this.inputmodeNumeric === "true") {
      this.inputmodeNumericValue = true;
    }
    this._disabled ? this.fControl.disable() : this.fControl.enable();
    if(this.validanire == "true"){
      this.nire = !this.nire;
    } 
  }

}
