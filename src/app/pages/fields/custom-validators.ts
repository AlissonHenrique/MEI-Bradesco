import { AbstractControl, Validators, FormGroup } from "@angular/forms";
import { MIN_PHONE_NUMBER_LENGTH } from "src/app/utils/constants.enum";

export class CustomValidators {
  isCNPJ() {
    return (control: AbstractControl): Validators => {
      let tempCnpj = control.value;
      if (tempCnpj == null) {
        return null;
      }

      tempCnpj = tempCnpj.replace(/[^\d]+/g, "");
      const cnpj = tempCnpj;

      if (cnpj == "") return null;

      if (cnpj.length != 14) return { customNotValid: true };

      // Elimina CNPJs invalidos conhecidos
      if (
        cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999"
      )
        return { customNotValid: true };

      // Valida DVs
      var tamanho = cnpj.length - 2;
      var numeros = cnpj.substring(0, tamanho);
      var digitos = cnpj.substring(tamanho);
      var soma = 0;
      var pos = tamanho - 7;
      for (var i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }
      var resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado != digitos.charAt(0)) return { customNotValid: true };

      tamanho = tamanho + 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado != digitos.charAt(1)) return { customNotValid: true };

      return null;
    };
  }

  isCpf() {
    return (control: AbstractControl): Validators => {
      let tempCpf = control.value;
      if (tempCpf == null) {
        return null;
      }
      tempCpf = tempCpf.replace(/\D/g, "");
      const cpf = tempCpf;
      if (cpf == "") return null;

      var numeros, digitos, soma, i, resultado, digitos_iguais;

      digitos_iguais = 1;

      if (cpf.length < 11) return { customNotValid: true };

      for (i = 0; i < cpf.length - 1; i++)
        if (cpf.charAt(i) != cpf.charAt(i + 1)) {
          digitos_iguais = 0;
          break;
        }

      if (!digitos_iguais) {
        numeros = cpf.substring(0, 9);
        digitos = cpf.substring(9);
        soma = 0;
        for (i = 10; i > 1; i--) soma += numeros.charAt(10 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado != digitos.charAt(0)) return { customNotValid: true };
        numeros = cpf.substring(0, 10);
        soma = 0;
        for (i = 11; i > 1; i--) soma += numeros.charAt(11 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado != digitos.charAt(1)) return { customNotValid: true };
        return null;
      } else return { customNotValid: true };
    };
  }
  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    let pass = group.get("senhaNova").value;
    let confirmPass = group.get("senhaNova2").value;

    return pass === confirmPass ? null : { notSame: true };
  }
  passwordMatchValidator(g: FormGroup) {
    return g.get("senhaNova").value === g.get("senhaNova2").value
      ? null
      : { mismatch: true };
  }

  isValidName() {
    return (control: AbstractControl): Validators => {
      const name = control.value;
      // Deve conter pelo menos 2 nomes com mais de duas letras separados por espaço.
      const parts = name.split(" ");
      const validParts = [];
      const valid = parts.length > 1;
      const regexNome = /[^a-z A-Z À-Ÿ \.]/;

      for (let index = 0; index < parts.length; index++) {
        const item = parts[index];
        if (item.length > 2) {
          validParts.push(item);
        } // verifica se a parte do nome tem mais de 2 letras
      }
      // tem que ter pelo menos 2 nomes, e estes dois nomes tem que ter mais de 2 letras
      if (!(valid && validParts.length > 1 && !regexNome.test(name))) {
        return { customNotValid: true };
      }
    };
  }

  isDateValid() {
    return (control: AbstractControl): Validators => {
      let datestr = control.value;
      if (datestr != undefined) {
        if (datestr.length < 10 && datestr.length != 0) {
          return { customNotValid: true };
        } else if (datestr.length == 0) {
          //return { customNotValidReq: true };
        }

        let splitted = String(datestr).split("/");

        if (splitted.length == 3) {
          let nPattern = splitted[2] + "-" + splitted[1] + "-" + splitted[0];
          let date = new Date(nPattern);
          if (date.toString() == "Invalid Date") {
            return { customNotValid: true };
          }
        }
        return null;
      }

      return null;
    };
  }

  isCep() {
    return (control: AbstractControl): Validators => {
      if (control.value !== null && control.value !== undefined) {
        const cep = control.value.toString();

        if (cep === "") {
          return null;
        }

        if (cep.length !== 8) {
          return { customNotValid: true };
        }
        return null;
      }
    };
  }

  isValidDateCNH() {
    return (control: AbstractControl): Validators => {
      if (control.value) {
        if (
          control.root.get("vencimento") &&
          control.root.get("emissao") &&
          control.root.get("emissao").value !== "" &&
          control.root.get("vencimento").value !== "" &&
          control.root.get("emissao").value !== undefined &&
          control.root.get("vencimento").value !== undefined
        ) {
          const em = control.root.get("emissao").value;
          const vm = control.root.get("vencimento").value;

          if (em > vm) {
            return { customNotValidDateCNH: true };
          } else if (control.root.get("emissao").status == "INVALID") {
            control.root.get("emissao").status == "VALID";
          } else if (
            control.root.get("vencimento").status == "INVALID" &&
            em < vm
          ) {
            control.root.get("vencimento").status == "VALID";
          }
        }
      }
    };
  }

  phoneValidator(control: AbstractControl) {
    if (
      control.value &&
      control.value.toString().replace(/\D/g, "").length <
      MIN_PHONE_NUMBER_LENGTH
    ) {
      return { invalidPhoneLength: true };
    }
    return null;
  }

  compareDate(dateInitial: string, dateFinnaly: string, andEqual?: boolean) {
    if (dateInitial.search('/') < 0 || dateFinnaly.search('/') < 0) {
      return false;
    }
    let parts;
    parts = dateInitial.split('/');  // separa a data pelo caracter '/'
    const dateIn = new Date(parts[2], parts[1] - 1, parts[0]); // formata 'date'
    parts = dateFinnaly.split('/');  // separa a data pelo caracter '/'
    const dateFin = new Date(parts[2], parts[1] - 1, parts[0]); // formata 'date'

    // compara se a data informada é maior que a data atual
    // e retorna true ou false
    if (andEqual) {
      return dateIn >= dateFin;
    } else {
      return dateIn > dateFin;
    }
  }
}
