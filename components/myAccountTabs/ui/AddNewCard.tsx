import { useSignal } from "@preact/signals";
import InputField from "../../ui/InputField.tsx";
import type { Card } from "$store/sections/Account/MyAccount.tsx";

interface AddNewCardProps {
  closeEditor: () => void;
  saveCard: (card: Card) => void;
}

function AddNewCard({ closeEditor, saveCard }: AddNewCardProps) {
  const formData = useSignal({} as Card);

  function onChange(event: Event) {
    const { name, value } = event.target as HTMLInputElement;
    formData.value = { ...formData.value, [name]: value };
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <InputField
        onChange={onChange}
        name="number"
        label="Número do cartão"
        maxLength={19}
        type="tel"
        inputMode="numeric"
        pattern="[0-9\s]{13,19}"
        autocomplete="cc-number"
        placeholder="xxxx xxxx xxxx xxxx"
        value={formData.value.number}
      />
      <InputField
        onChange={onChange}
        name="holder"
        label="Nome impresso no cartão"
        value={formData.value.holder}
      />
      <div className="flex flex-row gap-4 w-full">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 font-semibold">
            Validade
          </label>
          <div class="input input-bordered join-item min-h-[48px] w-full flex items-center justify-center gap-2">
            <input
              onChange={onChange}
              className="w-7"
              name="month"
              placeholder="MM"
              type="tel"
              inputMode="numeric"
              pattern="[0-9\s]{13,19}"
              maxLength={2}
              size={2}
            />
            <span>/</span>
            <input
              onChange={onChange}
              className="w-7"
              type="tel"
              inputMode="numeric"
              pattern="[0-9\s]{13,19}"
              name="year"
              placeholder="YY"
              maxLength={2}
              size={2}
            />
          </div>
        </div>
        <InputField
          onChange={onChange}
          name="cvv"
          label="Código de segurança"
          value={formData.value.cvv}
        />
      </div>
      <div className="flex md:flex-row w-full gap-6 flex-col mt-4">
        <button
          className="btn btn-primary md:w-1/3 w-full"
          onClick={() => {
            saveCard(formData.value);
          }}
        >
          Salvar
        </button>
        <button
          className="btn btn-secondary md:w-1/3 w-full"
          onClick={closeEditor}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}

export default AddNewCard;
