import Icon from "../../ui/Icon.tsx";

interface CardActionsProps {
  editCallback?: () => void;
  excludeCallback?: () => void;
}

function CardActions({ editCallback, excludeCallback }: CardActionsProps) {
  return (
    <div className="flex flex-row gap-2">
      {editCallback ? (
        <button
          className="btn-primary py-1 px-2 h-auto rounded duration-200"
          onClick={editCallback}
        >
          Editar
        </button>
      ) : null}
      {excludeCallback ? (
        <button
          className="btn-secondary py-1 px-2 h-auto rounded duration-200"
          onClick={excludeCallback}
        >
          Excluir
        </button>
      ) : null}
    </div>
  );
}

export default CardActions;
