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

function MyAccountTab(
  { fullName, birthDate, document, contacts, email, gender }: Props,
) {
  const isReadingMode = useSignal(true);

  const formData = useSignal({
    fullName,
    birthDate,
    document: document?.number,
    gender,
    mobile: contacts?.mobile,
    email,
  });

  function onChange(event: Event) {
    const { name, value } = event.target as HTMLInputElement;
    formData.value = { ...formData.value, [name]: value };
  }

  return (
    <>
      <div className="lg:grid grid-cols-2 flex flex-col lg:gap-x-7 lg:gap-y-2 gap-2">
        <InputField
          onChange={onChange}
          name="fullName"
          label="Nome completo"
          value={formData.value.fullName}
          readOnly={isReadingMode.value}
        />
        <InputField
          onChange={onChange}
          name="email"
          label="Email"
          value={formData.value.email}
          readOnly={isReadingMode.value}
        />
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 font-semibold">
            Gênero
          </label>
          <select
            onChange={onChange}
            name="gender"
            disabled={isReadingMode.value}
            class="input input-bordered join-item min-h-[48px] rounded-none"
            placeholder={"Selecione"}
            value={formData.value.gender}
            readOnly={isReadingMode.value}
          >
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
            <option value="other">Outro</option>
          </select>
        </div>
        <InputField
          onChange={onChange}
          name="document"
          label={document?.type.toUpperCase() ?? ""}
          readOnly={isReadingMode.value}
          value={formatDocumentByType(formData.value?.document ?? "")}
        />
        <InputField
          onChange={onChange}
          name="birthDate"
          label="Data de nascimento"
          readOnly={isReadingMode.value}
          value={formatBirthDate(formData?.value?.birthDate ?? "")}
        />
        <InputField
          onChange={onChange}
          name="mobile"
          readOnly={isReadingMode.value}
          label="Celular"
          value={formatPhone(formData?.value?.mobile ?? "")}
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

export default MyAccountTab;
