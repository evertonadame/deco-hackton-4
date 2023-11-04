import Icon from "../../ui/Icon.tsx";

function EmptyCardsTab() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[330px]">
      <Icon id="CreditCard" size={120} strokeWidth={2} />
      <p>Você ainda não possui nenhum cartão cadastrado!</p>
    </div>
  );
}

export default EmptyCardsTab;
