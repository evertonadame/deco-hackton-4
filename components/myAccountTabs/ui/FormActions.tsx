interface OrderDetailsProps {
  onSaveCallback: () => void;
  onCancelCallback: () => void;
}

function FormActions({ onSaveCallback, onCancelCallback }: OrderDetailsProps) {
  return (
    <div className="flex md:flex-row w-full gap-4 flex-col mt-6">
      <button
        className="btn btn-primary bg-accent hover:bg-accent-focus border-none"
        onClick={onSaveCallback}
      >
        Salvar
      </button>
      <button className="btn btn-secondary" onClick={onCancelCallback}>
        Voltar
      </button>
    </div>
  );
}

export default FormActions;
