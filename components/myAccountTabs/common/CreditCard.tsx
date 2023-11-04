import type { Card } from "$store/sections/Account/MyAccount.tsx";
import DefaultFlag from "$store/components/myAccountTabs/common/DefaultFlag.tsx";
import CardActions from "$store/components/myAccountTabs/common/CardActions.tsx";
import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

interface CardProps {
  card: Card;
  excludeAddress: (id: string) => void;
}

function CreditCard({ card, excludeAddress }: CardProps) {
  const cardlastDigits = card.number.slice(-4);

  const flagCapitalized =
    card?.flag?.charAt(0).toUpperCase() + card.flag?.slice(1);

  return (
    <div className="w-full border flex flex-col gap-10 p-5 border-slate-200 relative flex-1 text-slate-600">
      <div className="flex flex-col gap-1">
        <div className="flex gap-2 items-center mb-2">
          {card.flag ? (
            <Icon
              width={48}
              height={32}
              strokeWidth={1}
              id={flagCapitalized as AvailableIcons}
            />
          ) : null}
          <p className="text-md uppercase">
            <span className="font-semibold">{card.flag ?? "Visa"}</span> ****{" "}
            {cardlastDigits}
          </p>
        </div>
        <p>{card.holder}</p>
        <p className="text-sm text-slate-500">
          Validade: {card.month}/{card.year}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <CardActions excludeCallback={() => excludeAddress(card.id)} />
        {card?.default ? <DefaultFlag /> : null}
      </div>
    </div>
  );
}

export default CreditCard;
