export const maskOnlyNumber = (value: string) => {
  if(!value) return "";
  return value.replace(/\D/g, "");
};

export const maskTextValue = (value: string) => {
  if(!value) return "";
  const lettersOnly = value.replace(/[^a-zA-Z\s]/g, "");
  return lettersOnly;
};

export const maskInputDate = (date: string) => {
  if(!date) return ""

  return date.replace(/\D/g, "")
  .replace(/(\d{2})(\d)/, "$1/$2")
  .replace(/(\d{2})(\d)/, "$1/$2")
  .replace(/(\d{4})(\d)/, "$1/$2");
};

export const maskCpf = (cpf: string) => {
  if(!cpf) return "";

  return cpf.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");
}

export const maskPhone = (phone: string) => {
    if (!phone) return ""
    phone = phone.replace(/\D/g,'')
    phone = phone.replace(/(\d{2})(\d)/,"($1) $2")
    phone = phone.replace(/(\d)(\d{4})$/,"$1-$2")
    return phone
};


export const maskZipCode = (zipCode: string) => { 
  if(!zipCode) return "";

  return zipCode.replace(/\D/g, '').replace(/^(\d{5})(\d{3})$/, '$1-$2');
};