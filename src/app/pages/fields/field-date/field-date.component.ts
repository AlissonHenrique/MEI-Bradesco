import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { coerceBooleanProperty } from "@angular/cdk/coercion";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
  AbstractControl,
} from "@angular/forms";
import {
  AppDateAdapter,
  APP_DATE_FORMATS,
} from "src/app/pages/fields/format-datepicker";
import { MatDatepickerInputEvent } from "@angular/material";
import { stringify } from "querystring";
declare var $: any;

@Component({
  selector: "field-date",
  templateUrl: "./field-date.component.html",
  styleUrls: ["./field-date.component.scss"],
})
export class FieldDateComponent implements OnInit {
  startDate: Date = new Date();
  dataRecebe;
  erroDataCnh: boolean;
  teste: boolean = true;
  // dataCr = new FormControl(new Date())
  events: string[] = [];
  @Input() validaDataFutura: string;

  @Input("dateMax") dateMax: Date;
  @Input("idinput") id: string = "fielddate";
  @Input() value: any = "";
  @Input() placeholder: string = "Data";
  @Input() hintMsg: string = "";
  @Input() errorMsg: string;
  @Input() errorReqMsg: string = "Campo obrigatório!";
  @Input() errorMsgCustom: string =
    "Data de vencimento não pode ser menor que a data de emissão!";
  @Output() OutputEmissaoInp = new EventEmitter();
  @Output() OutputVencimentoInp = new EventEmitter();
  @Output() OutputEmissao = new EventEmitter();
  @Output() OutputVencimento = new EventEmitter();
  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    if (this._required) this.fControl.setValidators([Validators.required]);
  }
  private _required = true;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled = false;

  @Input() fControl = new FormControl("");
  constructor() {}

  ngOnInit() {
    $("#" + this.id).mask("00/00/0000");
    this._disabled ? this.fControl.disable() : this.fControl.enable();
    this.toFormattedDate(this.value);

    const dados = this.splited(this.fControl.value);
    this.dataRecebe = new FormControl(dados);
  }
  // função para ajustar data
  splited(dados) {
    if (dados !== null) {
      const splitted = dados.split("/");
      return new Date(splitted[2], splitted[1] - 1, splitted[0]);
    }
  }

  focusFunction() {
    this.value = "";
    this.fControl.setValue(this.value);
    this.dataRecebe = new FormControl("");
  }

  focusOutFunction() {
    setTimeout(() => {

    this.OutputEmissaoInp.emit(this.fControl.value);
    this.OutputVencimentoInp.emit(this.fControl.value);
    const splitted = this.fControl.value.split("/");

    if (splitted.length == 3) {
      const nPattern = splitted[2] + "-" + splitted[1] + "-" + splitted[0];
      const date = new Date(nPattern);

      const dataAtual = new Date(splitted[2], splitted[1] - 1, splitted[0]);
      const ano = parseInt(splitted[2]);
      const mes = parseInt(splitted[1]);
      const dia = parseInt(splitted[0]);

      if (date.toString() == "Invalid Date") {
        this.errorMsg = "Preencha uma data valida";
        this.value = "00/00/0000";
        this.fControl.setValue(this.value);
        this.fControl.setErrors({ customNotValid: true });
        return;
      }

      if (dataAtual > new Date() && this.validaDataFutura == "true") {
        this.errorMsg =
          "Preencha uma data valida que seja menor que a data atual";
        this.value = "00/00/0000";
        this.fControl.setValue(this.value);
        this.fControl.setErrors({ customNotValid: true });
        return;
      }

      //////ANOBISEXTO/////////////
      const anobisexto = (ano % 4 == 0 && ano % 100 != 0) || ano % 400;
      if (mes === 2) {
        if (anobisexto === true) {
          if (dia >= 1 && dia <= 29) {
          } else {
            this.errorMsg = "Preencha uma data valida";
            this.value = "00/00/0000";
            this.fControl.setValue(this.value);
            this.fControl.setErrors({ customNotValid: true });
            return;
          }
        } else {
          if (dia >= 1 && dia <= 28) {
          } else {
            this.errorMsg = "Preencha uma data valida";
            this.value = "00/00/0000";
            this.fControl.setValue(this.value);
            this.fControl.setErrors({ customNotValid: true });
          }
        }
      }
    }
  }, 200);
  }

  ///PASSA A DATA DIGITADA PARA O DATEPIKER
  valueData(e) {
    const splitted = e.target.value.split("/");
    const ano = parseInt(splitted[2]);
    const mes = parseInt(splitted[1]);
    const dia = parseInt(splitted[0]);
    const data = new Date(ano, mes - 1, dia);
    this.dataRecebe = new FormControl(data);
  }

  handleValue(e) {
    e.target.value = " ";
  }

  toFormattedDate(iso: string) {
    //console.info(iso);
    if (iso) {
      const date = new Date(iso);
      let day: string = date.getDate().toString();
      day = +day < 10 ? "0" + day : day;
      let month: string = (date.getMonth() + 1).toString();
      month = +month < 10 ? "0" + month : month;
      const year = date.getFullYear();
      this.value = `${day}/${month}/${year}`;
      this.fControl.setValue(this.value);
      this.OutputEmissao.emit(`${day}/${month}/${year}`);
      this.OutputVencimento.emit(`${day}/${month}/${year}`);
    }
  }
  ngAfterViewInit(): void {
    const agent = window.navigator.userAgent.toLowerCase();
    switch (true) {
      case agent.indexOf("trident") > -1:
        //console.log("ie");
        $(".calendario").css("bottom", "-2px");
    }
  }
}
