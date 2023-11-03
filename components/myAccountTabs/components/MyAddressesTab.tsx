import AdressCard from "../ui/AdressCard.tsx";
import NewAdressCard from "../ui/NewAdressCard.tsx";
import EditAdress from "../ui/EditAdress.tsx";
import { useSignal } from "@preact/signals";
import type { User } from "$store/sections/Account/MyAccount.tsx";

export interface Props extends Partial<User> {}

function MyAddressesTab({ adresses }: Props) {
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

  function excludeAdress(id: string) {
    adressArray.value = adressArray.value?.filter(
      (adressFromArray) => adressFromArray.id !== id
    );
  }

  function saveAdress(adress: User["adresses"][number]) {
    if (!adress.id) {
      adress.id = Math.random().toString();
      adressArray.value = [...(adressArray.value ?? []), adress];
      isEditingOrAdding.value = {
        value: false,
        address: null,
      };
      return;
    }

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

  function openEditor(address?: User["adresses"][number]) {
    if (!address) {
      isEditingOrAdding.value = {
        value: true,
        address: {
          id: Math.random().toString(),
          zipCode: "",
          street: "",
          number: "",
          complement: "",
          district: "",
          city: "",
          state: "",
        },
      };
      return;
    }

    isEditingOrAdding.value = {
      value: true,
      address,
    };
  }

  return (
    <>
      {!isEditingOrAdding.value?.value ? (
        <div className="grid grid-cols-2 gap-6">
          {adressArray.value?.map((adress) => (
            <AdressCard
              adress={adress}
              excludeAdress={excludeAdress}
              openEditor={openEditor}
            />
          ))}
          <NewAdressCard openEditor={openEditor} />
        </div>
      ) : (
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
