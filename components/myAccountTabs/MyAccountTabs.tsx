import SmartTab from "$store/islands/SmartTab.tsx";
import MyAccountTab from "$store/islands/MyAccount/components/MyAccountTab.tsx";
import MyAddressesTab from "$store/islands/MyAccount/components/MyAddressesTab.tsx";
import type { User } from "$store/sections/Account/MyAccount.tsx";

const MyAccount = ({ user }: {
  user: User;
}) => {
  return (
    <div>
      <SmartTab
        tabs={[
          {
            label: "Minha Conta",
            content: <MyAccountTab {...user} />,
          },
          {
            label: "Meus Pedidos",
            content: <div>Meus Pedidos</div>,
          },
          {
            label: "Meus Endereços",
            content: <MyAddressesTab {...user} />,
          },
          {
            label: "Meus Cartões",
            content: <div>Meus Cartões</div>,
          },
        ]}
        title={user.firstName}
      />
    </div>
  );
};

export default MyAccount;
