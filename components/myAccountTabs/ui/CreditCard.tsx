import type { Card } from "$store/sections/Account/MyAccount.tsx";

interface CardProps {
  card: Card;
  excludeAdress: (id: string) => void;
}

function CreditCard({ card, excludeAdress }: CardProps) {
  const cardlastDigits = card.number.slice(-4);

  return (
    <div className="border flex flex-col gap-1 p-5 border-primary relative flex-1 min-w-[250px]">
      <div className="flex flex-row flex-wrap justify-end  gap-4">
        <button
          className="btn btn-secondary p-1 min-h-[25px] h-[25px]"
          onClick={() => excludeAdress(card.id)}
        >
          Excluir
        </button>
      </div>

      <div className="border px-4 my-4" />
      <p className="text-md uppercase">
        {card.flag ?? "Visa"} **** {cardlastDigits}
      </p>
      <p>{card.holder}</p>
      <p>Validade: {card.month}/{card.year}</p>
      {card?.default && (
        <p className="bg-primary text-white p-1 rounder-xs w-fit text-xs mt-2">
          Cartão Padrão
        </p>
      )}
    </div>
  );
}

export default CreditCard;
