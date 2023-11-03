import SmartTab from "$store/islands/SmartTab.tsx";
import MyAccountTab from "$store/islands/MyAccount/components/MyAccountTab.tsx";
import MyAddressesTab from "$store/islands/MyAccount/components/MyAddressesTab.tsx";
import MyCardsTab from "$store/islands/MyAccount/components/MyCardsTab.tsx";
import MyOrdersTab from "$store/islands/MyAccount/components/MyOrdersTab.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import type { User } from "$store/sections/Account/MyAccount.tsx";

const MyAccount = ({ user }: { user: User }) => {
  return (
    <div className="w-full min-h-screen bg-white lg:bg-slate-100 py-4 lg:py-20">
      <div className="container px-0 lg:px-4">
        <SmartTab
          tabs={[
            {
              label: "Minha Conta",
              content: <MyAccountTab {...user} />,
              icon: <Icon id="User" size={24} strokeWidth={0.1} />,
            },
            {
              label: "Meus Pedidos",
              content: <MyOrdersTab {...user} />,
              icon: <Icon id="ShoppingCart" size={24} strokeWidth={0.1} />,
            },
            {
              label: "Meus Endereços",
              content: <MyAddressesTab {...user} />,
              icon: <Icon id="Truck" size={24} strokeWidth={0.1} />,
            },
            {
              label: "Meus Cartões",
              content: <MyCardsTab {...user} />,
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
