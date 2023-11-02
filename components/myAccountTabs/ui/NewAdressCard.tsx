import Icon from "../../ui/Icon.tsx";

interface NewAdressCardProps {
  openEditor: () => void;
}

function NewAdressCard({ openEditor }: NewAdressCardProps) {
  return (
    <button
      className="border border-slate-300 bg-slate-50 flex flex-col gap-1 p-5 relative min-h-[225px] justify-center items-center flex-1 min-w-[250px] text-slate-500 hover:bg-slate-100 hover:text-slate-600 duration-200"
      onClick={openEditor}
    >
      <picture className="p-2 flex items-center justify-center">
        <Icon id="Plus" size={24} strokeWidth={2} />
      </picture>
      <p>Adicionar novo endereço</p>
    </button>
  );
}

export default NewAdressCard;
