import AddressCard from "../ui/AddressCard.tsx";
import AddNewEntry from "../ui/AddNewEntry.tsx";
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
    const { city, complement, district, number, state, street, zipCode } =
      address ?? {};

    if (
      !zipCode ||
      !street ||
      !number ||
      !district ||
      !city ||
      !state ||
      !complement
    ) {
      return;
    }

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {addressArray.value?.map((address) => (
            <AddressCard
              address={address}
              excludeAddress={excludeAddress}
              openEditor={openEditor}
            />
          ))}
          <AddNewEntry openEditor={openEditor} type="address" />
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
