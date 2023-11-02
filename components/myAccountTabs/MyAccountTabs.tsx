import SmartTab from "$store/islands/SmartTab.tsx";
import MyAccountTab from "$store/islands/MyAccount/components/MyAccountTab.tsx";

interface Address {
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface User {
  id: string;
  fullName: string;
  firstName: string;
  email: string;
  gender: "male" | "female";
  document: {
    type: "cpf" | "rg" | "cnpj" | "ie" | "im" | "passport" | "cnh" | "other";
    number: string;
  };
  birthDate: string;
  contacts: {
    phone: string;
    mobile: string;
  };
  adresses?: Address[];
  cards?: {
    id: string;
    name: string;
    number: string;
    expirationDate: string;
    securityCode: string;
  }[];
}

export interface Props {
  user: User;
}

const MyAccount = ({ user }: Props) => {
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
            content: <div>Meus Endereços</div>,
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
