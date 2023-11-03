import InputField from "$store/components/ui/InputField.tsx";
import type { User } from "$store/sections/Account/MyAccount.tsx";
import { useSignal } from "@preact/signals";
import {
  formatBirthDate,
  formatDocumentByType,
  formatGender,
  formatPhone,
} from "../utils/formatters.ts";
import FormActions from "$store/components/myAccountTabs/ui/FormActions.tsx";

export interface Props extends Partial<User> {}

function MyAccountTab({
  fullName,
  birthDate,
  document,
  contacts,
  email,
  gender,
}: Props) {
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

  const inputClassName = isReadingMode.value ? "py-2 bg-white" : "";

  return (
    <>
      <div className="lg:grid grid-cols-2 flex flex-col lg:gap-x-7 lg:gap-y-2 gap-2">
        <InputField
          className={inputClassName}
          onChange={onChange}
          name="fullName"
          label="Nome completo"
          value={formData.value.fullName}
          readOnly={isReadingMode.value}
        />
        <InputField
          className={inputClassName}
          onChange={onChange}
          name="email"
          label="Email"
          value={formData.value.email}
          readOnly={isReadingMode.value}
        />
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 font-semibold">Gênero</label>
          {isReadingMode.value ? (
            <span className={isReadingMode.value ? "py-2" : "p-3"}>
              {formatGender(formData.value.gender ?? "")}
            </span>
          ) : (
            <select
              onChange={onChange}
              name="gender"
              disabled={isReadingMode.value}
              class="input input-bordered join-item min-h-[48px] rounded-none disabled:bg-white"
              placeholder={"Selecione"}
              value={formData.value.gender}
              readOnly={isReadingMode.value}
            >
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
              <option value="other">Outro</option>
            </select>
          )}
        </div>
        <InputField
          className={inputClassName}
          onChange={onChange}
          name="document"
          label={document?.type.toUpperCase() ?? ""}
          readOnly={isReadingMode.value}
          value={formatDocumentByType(formData.value?.document ?? "")}
        />
        <InputField
          className={inputClassName}
          onChange={onChange}
          name="birthDate"
          label="Data de nascimento"
          readOnly={isReadingMode.value}
          value={formatBirthDate(formData?.value?.birthDate ?? "")}
        />
        <InputField
          className={inputClassName}
          onChange={onChange}
          name="mobile"
          readOnly={isReadingMode.value}
          label="Celular"
          value={formatPhone(formData?.value?.mobile ?? "")}
        />
      </div>
      <div>
        {!isReadingMode.value ? (
          <FormActions
            onCancelCallback={() => (isReadingMode.value = true)}
            onSaveCallback={() => {}}
          />
        ) : (
          <button
            className="btn btn-primary mt-6"
            onClick={() => (isReadingMode.value = false)}
            class="lg:w-32 w-full btn btn-primary"
          >
            Editar
          </button>
        )}
      </div>
    </>
  );
}

export default MyAccountTab;
