import AddressCard from "../common/AddressCard.tsx";
import AddNewEntry from "../common/AddNewEntry.tsx";
import EditAddress from "../common/EditAddress.tsx";
import { useSignal } from "@preact/signals";
import type { User } from "$store/sections/Account/MyAccount.tsx";
import { saveData } from "$store/components/myAccountTabs/utils/saveData.ts";
import { validateDataError } from "../utils/validator/validate-fields.tsx";

export interface Props extends Partial<User> {}

function MyAddressesTab({ addresses }: Props) {
  const isEditingOrAdding = useSignal({
    value: false,
    address: null as null | User["addresses"][number],
  });

  const addressArray = useSignal(addresses);
  const isLoading = useSignal(false);

  const closeEditor = () => {
    isEditingOrAdding.value = {
      value: false,
      address: null,
    };
  };

  const saveFormData = async () => {
    isLoading.value = true;
    try {
      await saveData({
        data: addressArray.value,
      });
    } catch (err) {
      console.error(err);
    } finally {
      isLoading.value = false;
    }

    closeEditor();
  };

  const excludeAddress = (id: string) => {
    addressArray.value = addressArray.value?.filter(
      (addressFromArray) => addressFromArray.id !== id
    );
  };

  const saveAddress = (address: User["addresses"][number]) => {
    const { city, district, number, state, street, zipCode } =
      address ?? {};

    if (
      !zipCode ||
      !street ||
      !number ||
      !district ||
      !city ||
      !state
    ) {
      return;
    }

    const hasErrors = validateDataError(address);

    if(hasErrors){
      return
    }

    if (!address.id) {
      address.id = Math.random().toString();
      addressArray.value = [...(addressArray.value ?? []), address];

      saveFormData();
      return;
    }

    const newAddressArray = addressArray.value?.map((addressFromArray) => {
      if (addressFromArray.id === address.id) {
        return address;
      }

      return addressFromArray;
    });

    addressArray.value = newAddressArray;

    saveFormData();
  };

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
              key={address.id}
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
          isLoading={isLoading.value}
        />
      )}
    </>
  );
}

export default MyAddressesTab;
