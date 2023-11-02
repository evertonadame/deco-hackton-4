import SmartTab from "$store/islands/SmartTab.tsx";
import MyAccountTab from "$store/islands/MyAccount/components/MyAccountTab.tsx";
import MyAddressesTab from "$store/islands/MyAccount/components/MyAddressesTab.tsx";
import type { User } from "$store/sections/Account/MyAccount.tsx";

const MyAccount = ({ user }: {
  user: User;
}) => {
  return (
    <div className="w-full h-screen bg-slate-100 py-4 lg:py-20">
      <div className="container px-4">
        <SmartTab
          tabs={[
            {
              label: "Minha Conta",
              content: <MyAccountTab {...user} />,
            },
            {
              label: "Meus Pedidos",
              content: <div>Conteúdo Meus Pedidos</div>,
            },
            {
              label: "Meus Endereços",
              content: <MyAddressesTab {...user} />,
            },
            {
              label: "Meus Cartões",
              content: <div>Conteúdo Meus Cartões</div>,
            },
          ]}
          title={user.firstName}
        />
      </div>
    </div>
  );
};

export default MyAccount;
