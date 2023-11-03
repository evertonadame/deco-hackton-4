import type { Address } from "$store/sections/Account/MyAccount.tsx";

interface AdressCardProps {
  adress: Address;
  openEditor: (adress: Address) => void;
  excludeAdress: (id: string) => void;
}

function AdressCard({ adress, openEditor, excludeAdress }: AdressCardProps) {
  return (
    <div className="border border-slate-300 flex flex-col gap-10 justify-between p-5 relative flex-1 min-w-[250px]">
      <div className="flex flex-col gap-1">
        <p className="text-md uppercase">
          {adress.street} - {adress.number} - {adress.complement}
        </p>
        <p>
          {adress.zipCode} - {adress.district}
        </p>
        <p>
          {adress.city} - {adress.state}
        </p>
      </div>
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-row gap-4">
          <button
            className="btn-primary py-1 px-3 rounded-none h-auto duration-200"
            onClick={() => openEditor(adress)}
          >
            Editar
          </button>
          <button
            className="btn-secondary py-1 px-3 rounded-none h-auto duration-200"
            onClick={() => excludeAdress(adress.id)}
          >
            Excluir
          </button>
        </div>
        {adress?.default && (
          <p className="bg-slate-200 border border-slate-300 text-slate-600 py-1 px-2 w-fit text-xs h-fit">
            Endereço Padrão
          </p>
        )}
      </div>
    </div>
  );
}

export default AdressCard;
