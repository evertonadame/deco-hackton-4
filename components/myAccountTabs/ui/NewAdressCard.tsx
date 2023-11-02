import Icon from "../../ui/Icon.tsx";

interface NewAdressCardProps {
  openEditor: () => void;
}

function NewAdressCard({ openEditor }: NewAdressCardProps) {
  return (
    <div className="border flex flex-col gap-1 p-5 border-primary relative min-h-[225px] justify-center items-center flex-1 min-w-[250px]">
      <button
        className="w-16 h-16 rounded-full border border-primary flex items-center justify-center"
        onClick={openEditor}
      >
        <Icon id="Plus" size={30} strokeWidth={2} />
      </button>
      <p>Adicionar novo endereço</p>
    </div>
  );
}

export default NewAdressCard;
