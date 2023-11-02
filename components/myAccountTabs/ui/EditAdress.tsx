import { useSignal } from "@preact/signals";
import InputField from "../../ui/InputField.tsx";
import type { Address } from "$store/sections/Account/MyAccount.tsx";

interface EditAdressProps {
  adress: Address;
  closeEditor: () => void;
  saveAdress: (adress: Address) => void;
}

function EditAdress({ adress, closeEditor, saveAdress }: EditAdressProps) {
  const formData = useSignal({
    ...adress,
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

    formData.value = { ...formData.value, [name]: value };
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <InputField
        onChange={onChange}
        name="zipCode"
        label="CEP"
        maxLength={8}
        value={formData.value.zipCode}
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
        name="number"
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
      <div className="flex md:flex-row w-full gap-6 flex-col mt-4">
        <button
          className="btn btn-secondary md:w-1/3 w-full"
          onClick={closeEditor}
        >
          Voltar
        </button>
        <button
          className="btn btn-primary md:w-1/3 w-full"
          onClick={() => {
            saveAdress(formData.value);
          }}
        >
          Salvar
        </button>
      </div>
    </div>
  );
}

export default EditAdress;
