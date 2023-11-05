import NewCard from "../common/AddNewEntry.tsx";
import { useSignal } from "@preact/signals";
import CreditCard from "../common/CreditCard.tsx";
import type { Card, User } from "$store/sections/Account/MyAccount.tsx";
import AddNewCard from "../common/AddNewCard.tsx";
import { saveData } from "$store/components/myAccountTabs/utils/saveData.ts";
import { showToast } from "$store/components/myAccountTabs/utils/toast.ts";

export interface Props extends Partial<User> {}

function MyCardsTab({ savedCards }: Props) {
  const isEditingOrAdding = useSignal(false);
  const isLoading = useSignal(false);

  const cardsArray = useSignal(savedCards);

  const excludeAddress = (id: string) => {
    cardsArray.value = cardsArray.value?.filter(
      (cardsFrom) => cardsFrom.id !== id
    );
  };

  const openEditor = () => {
    isEditingOrAdding.value = true;
  };

  const closeEditor = () => {
    isEditingOrAdding.value = false;
  };

  const saveCard = async (card: Card) => {
    const { number, holder, month, year, cvv } = card ?? {};

    if (
      !number?.length ||
      !holder?.length ||
      !month?.length ||
      !year?.length ||
      !cvv?.length
    ) {
      showToast({
        message: "Dados inválidos!",
        variant: "error",
      });
      return;
    }

    cardsArray.value = [...(cardsArray.value ?? []), card];

    isLoading.value = true;

    try {
      await saveData({
        data: cardsArray.value,
      });
    } catch (err) {
      console.error(err);
    } finally {
      isLoading.value = false;
    }

    showToast({
      message: "Dados salvos com sucesso!",
      variant: "success",
    });

    closeEditor();
  };

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
        <AddNewCard
          closeEditor={closeEditor}
          saveCard={saveCard}
          isLoading={isLoading.value}
        />
      )}
    </div>
  );
}

export default MyCardsTab;
