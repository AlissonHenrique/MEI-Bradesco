import { Component, OnInit, Input } from "@angular/core";
import { coerceBooleanProperty } from "@angular/cdk/coercion";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
} from "@angular/forms";
import {
  MASK_MOBILE_NUMBER,
  MASK_PHONE_NUMBER,
  MOBILE_NUMBER_LENGTH,
} from "src/app/utils/constants.enum";
declare var $: any;

@Component({
  selector: "field-phone",
  templateUrl: "./field-phone.component.html",
  styleUrls: ["./field-phone.component.scss"],
})
export class FieldPhoneComponent implements OnInit {
  @Input("idinput") id: string = "fieldphone";
  @Input() value: string = "";
  @Input() placeholder: string = "Telefone";
  @Input() hintMsg: string = "";
  @Input() errorMsg: string = "O número de telefone informado não é válido. Por favor, verifique e tente novamente.";
  @Input() errorReqMsg: string = "Campo obrigatório!";

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    if (this._required)
      this.fControl.setValidators([
        Validators.required,
        Validators.minLength(18),
      ]);
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

  @Input()
  get cellphone() {
    return this._cellphone;
  }
  set cellphone(req) {
    this._cellphone = coerceBooleanProperty(req);
    if (this._cellphone)
      this.fControl.setValidators([
        Validators.required,
        Validators.minLength(19),
      ]);
  }
  private _cellphone = false;

  @Input() fControl = new FormControl(this.value, [Validators.minLength(18)]);

  constructor() {}

  ngOnInit() {
    const maskBehavior = function (val: any, e: any, field: any) {
      return val.replace(/\D/g, "").length === MOBILE_NUMBER_LENGTH
        ? MASK_MOBILE_NUMBER
        : MASK_PHONE_NUMBER;
    };
    const maskInternal = function (val: any, e: any, field: any, options: any) {
      field.mask(maskBehavior.apply({}, arguments), options);
    };
    const maskOptions = { onKeyPress: maskInternal };
    $("#" + this.id).mask(maskBehavior, maskOptions);

    this.fControl.setValue(this.value);
    this._disabled ? this.fControl.disable() : this.fControl.enable();
    $(".phoneRegex").on("input", function (e) {
      $(this).val(
        $(this)
          .val()
          .replace(
            /([#0-9]\u20E3)|[\xA9\xAE\u203C\u2047-\u2049\u2122\u2139\u3030\u303D\u3297\u3299][\uFE00-\uFEFF]?|[\u2190-\u21FF][\uFE00-\uFEFF]?|[\u2300-\u23FF][\uFE00-\uFEFF]?|[\u2460-\u24FF][\uFE00-\uFEFF]?|[\u25A0-\u25FF][\uFE00-\uFEFF]?|[\u2600-\u27BF][\uFE00-\uFEFF]?|[\u2900-\u297F][\uFE00-\uFEFF]?|[\u2B00-\u2BF0][\uFE00-\uFEFF]?|(?:\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDEFF])[\uFE00-\uFEFF]?|[\u20E3]|[\u26A0-\u3000]|\uD83E[\udd00-\uddff]|[\u00A0-\u269F]/g,
            ""
          )
      );
    });
  }
}
