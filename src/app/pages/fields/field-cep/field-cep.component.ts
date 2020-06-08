import { Component, OnInit, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FormControl, Validators, AbstractControl } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'field-cep',
  templateUrl: './field-cep.component.html',
  styleUrls: ['./field-cep.component.scss']
})
export class FieldCepComponent implements OnInit {

  @Input('idinput') id: string = "fieldcpf";
  @Input() value: string = "";
  @Input() placeholder: string = "Cpf";
  @Input() hintMsg: string = "";
  @Input() errorMsg: string = "Número inválido.";
  @Input() errorReqMsg: string = "Campo obrigatório!";

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    if (this._required)
      this.fControl.setValidators([Validators.required,  Validators.minLength(9)]);
  }
  private _required = true;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);


  }
  private _disabled = false;

  @Input() fControl = new FormControl('', [Validators.minLength(9)]);

  constructor() { }

  ngOnInit() {
    $("#" + this.id).mask('00000-000', { reverse: false });
    this._disabled ? this.fControl.disable() : this.fControl.enable();
    this.fControl.setValue(this.value);


  }

  // onfocus = () =>{

  //   $(".st0").addClass("blue");
  // }

  // onblur = () =>{
  //   $(".st0").removeClass("blue");
  // }



}