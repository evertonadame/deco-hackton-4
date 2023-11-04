import { useSignal } from "@preact/signals";
import InputField from "../../ui/InputField.tsx";
import type { Card } from "$store/sections/Account/MyAccount.tsx";
import FormActions from "$store/components/myAccountTabs/common/FormActions.tsx";
import { maskCreditCardNumber } from "$store/components/myAccountTabs/utils/masks/credit-card.ts";
import {
  maskOnlyNumber,
  maskTextValue,
} from "$store/components/myAccountTabs/utils/masks/common.ts";

interface AddNewCardProps {
  closeEditor: () => void;
  saveCard: (card: Card) => void;
  isLoading: boolean;
}

function AddNewCard({
  closeEditor,
  saveCard,
  isLoading,
}: Readonly<AddNewCardProps>) {
  const formData = useSignal({} as Card);

  function onChange(event: Event) {
    const { name, value } = event.target as HTMLInputElement;

    let maskedValue = value;

    switch (name) {
      case "number":
        maskedValue = maskCreditCardNumber(value);
        break;
      case "holder":
        maskedValue = maskTextValue(value);
        break;
      default:
        maskedValue = maskOnlyNumber(value);
    }

    formData.value = { ...formData.value, [name]: maskedValue };
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
          <label className="text-sm text-slate-600 font-semibold">
            Validade
          </label>
          <div className="input input-bordered join-item min-h-[48px] w-full flex items-center justify-center gap-2 text-slate-600">
            <input
              onChange={onChange}
              name="month"
              className="w-7"
              placeholder="MM"
              type="tel"
              pattern="[0-9\s]{13,19}"
              maxLength={2}
              size={2}
              value={formData.value.month}
            />
            <span className="text-slate-600">/</span>
            <input
              onChange={onChange}
              name="year"
              className="w-7"
              type="tel"
              pattern="[0-9\s]{13,19}"
              placeholder="YY"
              maxLength={2}
              size={2}
              value={formData.value.year}
            />
          </div>
        </div>
        <InputField
          onChange={onChange}
          name="cvv"
          label="Código de segurança"
          value={formData.value.cvv}
          maxLength={3}
          size={2}
          type="tel"
          pattern="[0-9\s]{13,19}"
        />
      </div>
      <FormActions
        onSaveCallback={() => {
          saveCard(formData.value);
        }}
        onCancelCallback={closeEditor}
        isLoading={isLoading}
      />
    </div>
  );
}

export default AddNewCard;
