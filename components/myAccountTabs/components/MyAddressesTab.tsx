import AdressCard from "../ui/AdressCard.tsx";
import EditAdress from "../ui/EditAdress.tsx";
import { useSignal } from "@preact/signals";
import type { User } from "$store/sections/Account/MyAccount.tsx";

export interface Props extends Partial<User> {}

function MyAddressesTab(
  { adresses }: Props,
) {
  const isEditingOrAdding = useSignal({
    value: false,
    address: null as null | User["adresses"][number],
  });

  const adressArray = useSignal(adresses);

  function closeEditor() {
    isEditingOrAdding.value = {
      value: false,
      address: null,
    };
  }

  function saveAdress(adress: User["adresses"][number]) {
    const newAdressArray = adressArray.value?.map((adressFromArray) => {
      if (adressFromArray.id === adress.id) {
        return adress;
      }

      return adressFromArray;
    });

    adressArray.value = newAdressArray;

    isEditingOrAdding.value = {
      value: false,
      address: null,
    };
  }

  function openEditor(address: User["adresses"][number]) {
    isEditingOrAdding.value = {
      value: true,
      address,
    };
  }

  return (
    <>
      {!isEditingOrAdding.value?.value
        ? (
          adressArray.value?.map((adress) => (
            <AdressCard
              adress={adress}
              openEditor={openEditor}
            />
          ))
        )
        : (
          <EditAdress
            adress={isEditingOrAdding.value.address as User["adresses"][number]}
            closeEditor={closeEditor}
            saveAdress={saveAdress}
          />
        )}
    </>
  );
}

export default MyAddressesTab;
