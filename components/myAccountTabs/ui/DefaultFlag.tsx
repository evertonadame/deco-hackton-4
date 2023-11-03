import type { Address } from "$store/sections/Account/MyAccount.tsx";

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
    <div className="border border-slate-300 flex flex-col gap-10 justify-between p-5 relative flex-1 min-w-[250px]">
      <div className="flex flex-col gap-1">
        <p className="text-md uppercase">
          {address.street} - {address.number} - {address.complement}
        </p>
        <p>
          {address.zipCode} - {address.district}
        </p>
        <p>
          {address.city} - {address.state}
        </p>
      </div>
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-row gap-2">
          <button
            className="btn-primary py-0.5 px-2 rounded-none h-auto duration-200"
            onClick={() => openEditor(address)}
          >
            Editar
          </button>
          <button
            className="btn-secondary py-0.5 px-2 rounded-none h-auto duration-200"
            onClick={() => excludeAddress(address.id)}
          >
            Excluir
          </button>
        </div>
        {address?.default && (
          <p className="bg-slate-200 border border-slate-300 text-slate-600 py-1 px-2 w-fit text-xs h-fit">
            Padrão
          </p>
        )}
      </div>
    </div>
  );
}

export default AddressCard;
