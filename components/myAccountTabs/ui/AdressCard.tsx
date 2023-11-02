import type { Address } from "$store/sections/Account/MyAccount.tsx";

interface AdressCardProps {
  adress: Address;
  openEditor: (adress: Address) => void;
  excludeAdress: (id: string) => void;
}

function AdressCard({ adress, openEditor, excludeAdress }: AdressCardProps) {
  return (
    <div className="border flex flex-col gap-1 p-5 border-primary relative flex-1 min-w-[250px]">
      <div className="flex flex-row flex-wrap justify-between gap-4">
        <div className="flex flex-row gap-4">
          <button
            className="btn btn-primary p-1 min-h-[25px] h-[25px]"
            onClick={() => openEditor(adress)}
          >
            Editar
          </button>
          <button
            className="btn btn-secondary p-1 min-h-[25px] h-[25px]"
            onClick={() => excludeAdress(adress.id)}
          >
            Excluir
          </button>
        </div>
      </div>

      <div className="border px-4 my-4" />
      <p className="text-md uppercase">
        {adress.street} - {adress.number} - {adress.complement}
      </p>
      <p>{adress.zipCode} - {adress.district}</p>
      <p>{adress.city} - {adress.state}</p>
      {adress?.default && (
        <p className="bg-primary text-white p-1 rounder-xs w-fit text-xs mt-2">
          Endereço Padrão
        </p>
      )}
    </div>
  );
}

export default AdressCard;
