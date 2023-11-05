import type { Address } from "$store/sections/Account/MyAccount.tsx";
import DefaultFlag from "$store/components/myAccountTabs/common/DefaultFlag.tsx";
import CardActions from "$store/components/myAccountTabs/common/CardActions.tsx";
import { maskZipCode } from "$store/components/myAccountTabs/utils/masks/common.ts";

interface AddressCardProps {
  address: Address;
  openEditor: (address: Address) => void;
  excludeAddress: (id: string) => void;
}

function AddressCard({
  address,
  openEditor,
  excludeAddress,
}: AddressCardProps) {
  return (
    <div className="border border-slate-200 flex flex-col gap-10 justify-between p-5 relative flex-1 min-w-[250px]">
      <div className="flex flex-col gap-1">
        <p className="text-md uppercase">
          {address.district}. {address.street}, {address.number}.{" "}
          {address.complement}.
        </p>
        <p className="text-sm text-slate-500">
          {address.city}, {address.state} - {maskZipCode(address.zipCode)}
        </p>
      </div>
      <div className="flex flex-row items-center justify-between gap-4">
        <CardActions
          editCallback={() => openEditor(address)}
          excludeCallback={() => excludeAddress(address.id)}
        />
        {address?.default ? <DefaultFlag /> : null}
      </div>
    </div>
  );
}

export default AddressCard;
