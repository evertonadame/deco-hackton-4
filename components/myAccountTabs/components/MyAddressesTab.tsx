import AddressCard from "../ui/AddressCard.tsx";
import NewAddressCard from "../ui/NewAddressCard.tsx";
import EditAddress from "../ui/EditAddress.tsx";
import { useSignal } from "@preact/signals";
import type { User } from "$store/sections/Account/MyAccount.tsx";

export interface Props extends Partial<User> {}

function MyAddressesTab({ addresses }: Props) {
  const isEditingOrAdding = useSignal({
    value: false,
    address: null as null | User["addresses"][number],
  });

  const addressArray = useSignal(addresses);

  function closeEditor() {
    isEditingOrAdding.value = {
      value: false,
      address: null,
    };
  }

  function excludeAddress(id: string) {
    addressArray.value = addressArray.value?.filter(
      (addressFromArray) => addressFromArray.id !== id
    );
  }

  function saveAddress(address: User["addresses"][number]) {
    if (!address.id) {
      address.id = Math.random().toString();
      addressArray.value = [...(addressArray.value ?? []), address];
      isEditingOrAdding.value = {
        value: false,
        address: null,
      };
      return;
    }

    const newAddressArray = addressArray.value?.map((addressFromArray) => {
      if (addressFromArray.id === address.id) {
        return address;
      }

      return addressFromArray;
    });

    addressArray.value = newAddressArray;

    isEditingOrAdding.value = {
      value: false,
      address: null,
    };
  }

  function openEditor(address?: User["addresses"][number]) {
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
        <div className="flex flex-col md:flex-row flex-wrap gap-2">
          {addressArray.value?.map((address) => (
            <AddressCard
              address={address}
              excludeAddress={excludeAddress}
              openEditor={openEditor}
            />
          ))}
          <NewAddressCard openEditor={openEditor} type="address" />
        </div>
      ) : (
        <EditAddress
          address={isEditingOrAdding.value.address as User["addresses"][number]}
          closeEditor={closeEditor}
          saveAddress={saveAddress}
        />
      )}
    </>
  );
}

export default MyAddressesTab;
