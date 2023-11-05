import { phoneValidation, validateBirthDate, validateCPF, validateCep, validateEmail, validateFullName } from "./methods/index.ts";

export const validateField = (name: string, value: string, required?: boolean) => {
    if(required && !value) {
        return {
            value,
            error: "Campo obrigatório"
        }
    }

    switch (name) {
      case 'birthDate':
 
        if(!validateBirthDate(value)) {
            return {
                value,
                error: "Data de nascimento invalida"
            }
        }

        return { value }
      case 'document':
    
        if(!validateCPF(value)) {
            return {
                value,
                error: "Número de CPF invalido",
            };
        }

        return {
            value,
        }
       
      case 'mobile':

        if(!phoneValidation(value)) {
            return {
                value,
                error: "Número de telefone invalido",
            };
        }

        return {
            value,
        }
      
      case "fullName":
    
        if(!validateFullName(value)) {
            return {
                value,
                error: "Nome invalido, insira o nome completo"
            }
        }

        return { value };
      case "holder":
    
        if(!validateFullName(value)) {
            return {
                value,
                error: "Nome invalido"
            }
        }

        return { value };
      case "email":

        if(!validateEmail(value)) {
            return {
                value,
                error: "Insira um email valido"
            }
        }

        return { value };

        case "zipCode":
            if(!validateCep(value)) {
                return {
                    value,
                    error: "Cep invalido"
                }
            }

        default: {
            return { value };
        }
    }

  };


  export function validateDataError(formData: {
    [key: string]: string
  }) {
    const hasErrorsOrIsEmpty = Object.keys(formData).some((fieldName) => {
        const fieldIsError = fieldName.endsWith("Error");
      
        if (fieldIsError) {
          const relatedField = formData[fieldName];
          
          if(relatedField === undefined) {
            return false;
          }
  
          return true;
        }
      
        return false;
      });

      
      return hasErrorsOrIsEmpty;
  }