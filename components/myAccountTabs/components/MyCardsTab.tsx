import type { User } from "$store/sections/Account/MyAccount.tsx";
import EmptyCardsTab from "../ui/EmptyCards.tsx";

export interface Props extends Partial<User> {}

function MyCardsTab({ savedCards }: Props) {
  if (savedCards?.length === 0) {
    return <EmptyCardsTab />;
  }

  return (
    <div>
      cartões
    </div>
  );
}

export default MyCardsTab;
