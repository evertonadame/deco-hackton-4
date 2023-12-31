import { useSignal } from "@preact/signals";
import { saveData } from "$store/components/myAccountTabs/utils/saveData.ts";
import Spin from "$store/components/ui/Spin.tsx";

interface NewsletterProps {
  email: string;
}

function Newsletter({ email }: NewsletterProps) {
  const isLoading = useSignal(false);
  const isChecked = useSignal(false);

  const saveNewsLetter = async (e: Event) => {
    const { checked } = e?.target as HTMLInputElement;

    isLoading.value = true;

    try {
      await saveData({
        data: {
          subscriptionType: "newsletter",
          checked: checked,
          userEmail: email,
        },
      });

      isChecked.value = checked;
    } catch (err) {
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  return (
    <div className="border-t border-slate-200 mt-4">
      <div className="border p-4 mt-4">
        <h3 className="text-base font-semibold text-slate-600">Newsletter</h3>
        <p className="text-sm font-normal text-slate-400">
          Deseja receber e-mails com promoções?
        </p>
        <div className="flex flex-row gap-2 mt-4 items-center">
          <label
            for="newsletter-my-account"
            className="order-1 text-sm font-semibold text-slate-600 cursor-pointer"
          >
            Quero receber e-mails com promoções
          </label>
          {isLoading.value ? (
            <Spin size="small" />
          ) : (
            <input
              type="checkbox"
              name="newsletter"
              checked={isChecked.value}
              id="newsletter-my-account"
              onChange={saveNewsLetter}
              className="h-4 w-4 cursor-pointer"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
