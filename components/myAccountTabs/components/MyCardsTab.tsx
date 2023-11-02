import NewCard from "../ui/NewAdressCard.tsx";
import { useSignal } from "@preact/signals";
import CreditCard from "../ui/CreditCard.tsx";
import type { Card, User } from "$store/sections/Account/MyAccount.tsx";
import AddNewCard from "../ui/AddNewCard.tsx";

export interface Props extends Partial<User> {}

function MyCardsTab(
  { savedCards }: Props,
) {
  const isEditingOrAdding = useSignal(false);

  const cardsArray = useSignal(savedCards);

  function excludeAdress(id: string) {
    cardsArray.value = cardsArray.value?.filter(
      (cardsFrom) => cardsFrom.id !== id,
    );
  }

  function saveCard(card: Card) {
    cardsArray.value = [...cardsArray.value ?? [], card];
    isEditingOrAdding.value = false;
  }

  function openEditor() {
    isEditingOrAdding.value = true;
  }

  function closeEditor() {
    isEditingOrAdding.value = false;
  }

  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-2">
      {!isEditingOrAdding.value
        ? (
          <>
            {cardsArray.value?.map((card) => (
              <CreditCard
                card={card}
                excludeAdress={excludeAdress}
              />
            ))}
            <NewCard openEditor={openEditor} type="card" />
          </>
        )
        : <AddNewCard closeEditor={closeEditor} saveCard={saveCard} />}
    </div>
  );
}

export default MyCardsTab;
