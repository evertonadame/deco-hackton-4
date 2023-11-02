import SmartTab from "$store/islands/SmartTab.tsx";
import MyAccountTab from "$store/islands/MyAccount/components/MyAccountTab.tsx";
import MyAddressesTab from "$store/islands/MyAccount/components/MyAddressesTab.tsx";
import type { User } from "$store/sections/Account/MyAccount.tsx";
import Icon from "$store/components/ui/Icon.tsx";

const MyAccount = ({ user }: { user: User }) => {
  return (
    <div className="w-full h-screen bg-slate-100 py-4 lg:py-20">
      <div className="container px-4">
        <SmartTab
          tabs={[
            {
              label: "Minha Conta",
              content: <MyAccountTab {...user} />,
              icon: <Icon id="User" size={24} strokeWidth={0.1} />,
            },
            {
              label: "Meus Pedidos",
              content: <div>Conteúdo Meus Pedidos</div>,
              icon: <Icon id="ShoppingCart" size={24} strokeWidth={0.1} />,
            },
            {
              label: "Meus Endereços",
              content: <MyAddressesTab {...user} />,
              icon: <Icon id="Truck" size={24} strokeWidth={0.1} />,
            },
            {
              label: "Meus Cartões",
              content: <div>Conteúdo Meus Cartões</div>,
              icon: <Icon id="CreditCard" size={24} strokeWidth={0.1} />,
            },
          ]}
          title={user.firstName}
        />
      </div>
    </div>
  );
};

export default MyAccount;
