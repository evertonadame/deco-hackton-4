import NewCard from "../ui/AddNewEntry.tsx";
import { useSignal } from "@preact/signals";
import CreditCard from "../ui/CreditCard.tsx";
import type { Card, User } from "$store/sections/Account/MyAccount.tsx";
import AddNewCard from "../ui/AddNewCard.tsx";

export interface Props extends Partial<User> {}

function MyCardsTab({ savedCards }: Props) {
  const isEditingOrAdding = useSignal(false);

  const cardsArray = useSignal(savedCards);

  function excludeAddress(id: string) {
    cardsArray.value = cardsArray.value?.filter(
      (cardsFrom) => cardsFrom.id !== id
    );
  }

  function openEditor() {
    isEditingOrAdding.value = true;
  }

  function closeEditor() {
    isEditingOrAdding.value = false;
  }

  function saveCard(card: Card) {
    const { number, holder, month, year, cvv } = card ?? {};
    console.log("🚀 ~ file: MyCardsTab.tsx:30 ~ saveCard ~ card:", card);

    if (
      !number.length ||
      !holder.length ||
      !month.length ||
      !year.length ||
      !cvv.length
    ) {
      return;
    }

    cardsArray.value = [...(cardsArray.value ?? []), card];
    closeEditor();
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
      {!isEditingOrAdding.value ? (
        <>
          {cardsArray.value?.map((card) => (
            <CreditCard card={card} excludeAddress={excludeAddress} />
          ))}
          <NewCard openEditor={openEditor} type="card" />
        </>
      ) : (
        <AddNewCard closeEditor={closeEditor} saveCard={saveCard} />
      )}
    </div>
  );
}

export default MyCardsTab;
