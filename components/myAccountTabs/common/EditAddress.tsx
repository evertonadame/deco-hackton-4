import { useSignal } from "@preact/signals";
import InputField from "../../ui/InputField.tsx";
import type { Address } from "$store/sections/Account/MyAccount.tsx";
import FormActions from "$store/components/myAccountTabs/common/FormActions.tsx";
import { maskZipCode } from "../utils/masks/common.ts";

interface EditAddressProps {
  address: Address;
  closeEditor: () => void;
  saveAddress: (address: Address) => void;
  isLoading: boolean;
}

function EditAddress({
  address,
  closeEditor,
  saveAddress,
  isLoading,
}: EditAddressProps) {
  const formData = useSignal({
    ...address,
  });

  function onChange(event: Event) {
    const { name, value } = event.target as HTMLInputElement;

    if (name === "zipCode" && value.length === 8) {
      fetch(`https://viacep.com.br/ws/${value}/json/`)
        .then((response) => response.json())
        .then((data) => {
          formData.value = {
            ...formData.value,
            street: data.logradouro,
            district: data.bairro,
            city: data.localidade,
            state: data.uf,
          };
        });
    }

    let maskedValue = value;

    switch(name) {
      case 'zipCode':
        maskedValue = maskZipCode(value);
        break;
      default:
        maskedValue = value;
    }

    formData.value = { ...formData.value, [name]: maskedValue };
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <InputField
        onChange={onChange}
        name="zipCode"
        label="CEP"
        maxLength={9}
        value={maskZipCode(formData.value.zipCode)}
      />
      <InputField
        onChange={onChange}
        name="street"
        label="Rua"
        value={formData.value.street}
      />
      <div className="flex flex-row gap-4 w-full">
        <InputField
          onChange={onChange}
          name="number"
          label="Número"
          value={formData.value.number}
        />
        <InputField
          onChange={onChange}
          name="complement"
          label="Complemento"
          value={formData.value.complement}
        />
      </div>
      <InputField
        onChange={onChange}
        name="district"
        label="Bairro"
        value={formData.value.district}
      />
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <InputField
          onChange={onChange}
          name="city"
          label="Cidade"
          value={formData.value.city}
        />
        <InputField
          onChange={onChange}
          name="state"
          label="Estado"
          value={formData.value.state}
        />
      </div>
      <FormActions
        onSaveCallback={() => {
          saveAddress(formData.value);
        }}
        onCancelCallback={closeEditor}
        isLoading={isLoading}
      />
    </div>
  );
}

export default EditAddress;
