import InputField from "$store/components/ui/InputField.tsx";
import type { User } from "$store/sections/Account/MyAccount.tsx";
import { useSignal } from "@preact/signals";
import {
  formatGender,
} from "../utils/formatters.ts";
import FormActions from "$store/components/myAccountTabs/common/FormActions.tsx";
import { saveData } from "$store/components/myAccountTabs/utils/saveData.ts";
import { maskCpf, maskInputDate, maskPhone } from "../utils/masks/common.ts";
import Newsletter from "../common/Newsletter.tsx";
import { validateDataError, validateField } from "../utils/validator/validate-fields.tsx";

export interface Props extends Partial<User> {}

function MyAccountTab({
  fullName,
  birthDate,
  document,
  contacts,
  email,
  gender,
}: Props) {
  const initialFormData = {
    fullName,
    birthDate,
    document: document?.number,
    gender,
    mobile: contacts?.mobile,
    email,
  }
  const isReadingMode = useSignal(true);
  const isLoading = useSignal(false);

  const formData = useSignal(initialFormData);

  const onChange = (event: Event) => {
    const { name, value, required } = event.target as HTMLInputElement;

    let maskedValue = value

    const validation = validateField(name, value, required);

    switch (name) {
      case "birthDate":
        maskedValue = maskInputDate(value);
        break;
      case "document":
        maskedValue = maskCpf(value);
        break;
      case "mobile":
        maskedValue = maskPhone(value);
      default:
        maskedValue = value;
    }

    formData.value = { ...formData.value, [name]: maskedValue,  [`${name}Error`]: validation.error };
  };


  const handleOnSave = async () => {
    const hasErrors = validateDataError(formData.value);

    if(hasErrors) {
      return;
    }

    isLoading.value = true;

    try {
      await saveData({
        data: formData.value,
      });
    } catch (err) {
      console.error(err);
    } finally {
      isLoading.value = false;
    }

    isReadingMode.value = true;
  };

  const inputClassName = `w-full text-slate-600 bg-white ${
    isReadingMode.value ? "py-2" : "input input-bordered join-item"
  }`;

  return (
    <>
      <div className="lg:grid grid-cols-2 flex flex-col lg:gap-x-7 lg:gap-y-4 gap-6">
        <InputField
          className={inputClassName}
          onChange={onChange}
          name="fullName"
          required
          label="Nome completo"
          value={formData.value.fullName}
          error={formData.value.fullNameError}
          readOnly={isReadingMode.value}
        />
        <InputField
          className={inputClassName}
          onChange={onChange}
          type="email"
          name="email"
          required
          label="Email"
          value={formData.value.email}
          error={formData.value.emailError}
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
          error={formData.value.documentError}
          label={document?.type.toUpperCase() ?? ""}
          maxLength={14}
          required
          readOnly={isReadingMode.value}
          value={maskCpf(formData.value?.document ?? "")}
        />
        <InputField
          className={inputClassName}
          onChange={onChange}
          maxLength={10}
          name="birthDate"
          required
          label="Data de nascimento"
          error={formData.value.birthDateError}
          readOnly={isReadingMode.value}
          value={maskInputDate(formData?.value?.birthDate ?? "")}
        />
        <InputField
          className={inputClassName}
          onChange={onChange}
          name="mobile"
          error={formData?.value?.mobileError}
          maxLength={15}
          required
          readOnly={isReadingMode.value}
          label="Celular"
          value={maskPhone(formData?.value?.mobile ?? "")}
        />
      </div>
      <div>
        {!isReadingMode.value ? (
          <FormActions
            onCancelCallback={() => {
              isReadingMode.value = true;
              formData.value = initialFormData;
            }}
            onSaveCallback={handleOnSave}
            isLoading={isLoading.value}
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
      <Newsletter email={formData.value.email} />
    </>
  );
}

export default MyAccountTab;
