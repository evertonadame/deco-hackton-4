import InputField from "$store/components/ui/InputField.tsx";
import type { User } from "$store/sections/Account/MyAccount.tsx";
import { useSignal } from "@preact/signals";
import {
  formatBirthDate,
  formatDocumentByType,
  formatPhone,
} from "../utils/index.ts";
import Button from "../../ui/Button.tsx";

export interface Props extends Partial<User> {}

function MyAccount(
  { fullName, birthDate, document, contacts, email, gender }: Props,
) {
  const isReadingMode = useSignal(true);

  return (
    <>
      <div className="lg:grid grid-cols-2 flex flex-col lg:gap-x-7 lg:gap-y-2 gap-2">
        <InputField
          label="Nome completo"
          value={fullName}
          readOnly={isReadingMode.value}
        />
        <InputField
          label="Email"
          value={email}
          readOnly={isReadingMode.value}
        />
        <InputField
          label="Gênero"
          value={gender}
          readOnly={isReadingMode.value}
        />
        <InputField
          label={document?.type.toUpperCase() ?? ""}
          readOnly={isReadingMode.value}
          value={formatDocumentByType(document?.number ?? "")}
        />
        <InputField
          label="Data de nascimento"
          readOnly={isReadingMode.value}
          value={formatBirthDate(birthDate ?? "")}
        />
        <InputField
          readOnly={isReadingMode.value}
          label="Celular"
          value={formatPhone(contacts?.mobile ?? "")}
        />
      </div>
      <div className="w-full mt-4">
        <Button
          onClick={() => isReadingMode.value = !isReadingMode.value}
          class="lg:w-32 w-full btn btn-primary"
        >
          {isReadingMode.value ? "Editar" : "Salvar"}
        </Button>
      </div>
    </>
  );
}

export default MyAccount;
