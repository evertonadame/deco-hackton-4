export function validateCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]/g, '');
  
    if (cpf.length !== 11) {
      return false;
    }
  
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let firstDigit = 11 - (sum % 11);
  
    if (firstDigit > 9) {
      firstDigit = 0;
    }
  
    if (parseInt(cpf.charAt(9)) !== firstDigit) {
      return false;
    }
  
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let secondDigit = 11 - (sum % 11);
  
    if (secondDigit > 9) {
      secondDigit = 0;
    }
  
    if (parseInt(cpf.charAt(10)) !== secondDigit) {
      return false;
    }
  
    return true;
  }

  export function phoneValidation(phone: string): boolean {
    phone = phone.replace(/\D/g, '');

    if (!(phone.length >= 10 && phone.length <= 11)) return false;

    if (phone.length == 11 && parseInt(phone.substring(2, 3)) != 9) return false;

    for (var n = 0; n < 10; n++) {

        if (phone == new Array(11).join(n) || phone == new Array(12).join(n)) return false;
    }
    const codigosDDD = [11, 12, 13, 14, 15, 16, 17, 18, 19,
        21, 22, 24, 27, 28, 31, 32, 33, 34,
        35, 37, 38, 41, 42, 43, 44, 45, 46,
        47, 48, 49, 51, 53, 54, 55, 61, 62,
        64, 63, 65, 66, 67, 68, 69, 71, 73,
        74, 75, 77, 79, 81, 82, 83, 84, 85,
        86, 87, 88, 89, 91, 92, 93, 94, 95,
        96, 97, 98, 99];
    if (codigosDDD.indexOf(parseInt(phone.substring(0, 2))) == -1) return false;

    if (new Date().getFullYear() < 2017) return true;
    if (phone.length == 10 && [2, 3, 4, 5, 7].indexOf(parseInt(phone.substring(2, 3))) == -1) return false;

    return true;
}

export function validateEmail(email: string): boolean {
  const regex = /^[\w\.-]+@[\w\.-]+$/;
  
  return regex.test(email);
}

export function validateBirthDate(birthDate: string): boolean {
  const regexData = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!regexData.test(birthDate)) {
    return false;
  }

  const datePart = birthDate.split('/');
  const day = parseInt(datePart[0], 10);
  const month = parseInt(datePart[1], 10);
  const year = parseInt(datePart[2], 10);

 
  const actualYear = new Date().getFullYear();
  if (year < 1900 || year > actualYear) {
    return false;
  }

  if (month < 1 || month > 12) {
    return false;
  }

  const diasNoMes = new Date(year, month, 0).getDate();
  if (day < 1 || day > diasNoMes) {
    return false;
  }

  return true;
}

export function validateFullName(fullName: string): boolean {
  const words = fullName.trim().split(' ');

  if (words.length >= 2) {
    return true;
  } else {
    return false;
  }
}

export function validateCep(cep) {
  cep = cep.replace(/\D/g, '');

  if (/^\d{8}$/.test(cep)) {
    return true; 
  } else {
    return false;
  }
}