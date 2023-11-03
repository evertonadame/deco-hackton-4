import Spin from "$store/components/ui/Spin.tsx";

interface OrderDetailsProps {
  onSaveCallback: () => void;
  onCancelCallback: () => void;
  isLoading?: boolean;
}

function FormActions({
  onSaveCallback,
  onCancelCallback,
  isLoading = false,
}: OrderDetailsProps) {
  return (
    <div className="flex md:flex-row w-full gap-4 flex-col mt-6">
      <button
        className="btn btn-primary bg-accent hover:bg-accent-focus border-none"
        onClick={onSaveCallback}
      >
        Salvar
        {isLoading ? <Spin /> : null}
      </button>
      <button className="btn btn-secondary" onClick={onCancelCallback}>
        Voltar
      </button>
    </div>
  );
}

export default FormActions;
