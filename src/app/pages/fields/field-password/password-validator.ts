import { AbstractControl } from "@angular/forms";

//existe 2 validatePassword caso altere um altere o outro
export function ValidatePassword(control: AbstractControl) {
  if (!control.value) return null;
  let caractresEspeciais = "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";
  let regexNome = /[^a-zA-ZÀ-Ÿ \.]/; //não permite caracteres especiais
  let regexEspaco = new RegExp("[\\s]");
  var item = "";
  var contemEspaco = false;
  var contemMaiuscula = false;
  var contemMinuscula = false;
  var contemCaracterEspecial = false;

  //não deve conter espaços
  if (regexEspaco.test(control.value)) {
    contemEspaco = true;
  }

  for (let index = 0; index < control.value.split("").length; index++) {
    item = control.value.charAt(index);
    //deve conter letras maiúsculas
    if (
      !regexNome.test(item) &&
      item.toUpperCase() == control.value.charAt(index)
    ) {
      contemMaiuscula = true;
    }
    //deve conter letras minúsculas
    if (
      !regexNome.test(item) &&
      item.toLocaleLowerCase() == control.value.charAt(index)
    ) {
      contemMinuscula = true;
    }
    if (caractresEspeciais.indexOf(item) >= 0) {
      contemCaracterEspecial = true;
    }
  }
  if (
    !contemMaiuscula ||
    !contemMinuscula ||
    !contemCaracterEspecial ||
    contemEspaco ||
    !(control.value.length > 7)
  ) {
    return { complexity: true };
  }

  return null;
}
