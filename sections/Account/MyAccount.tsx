import MyAccountIslands from "$store/islands/MyAccount/MyAccount.tsx";

export interface Address {
  id: string;
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  zipCode: string;
  default?: boolean;
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
  adresses: Address[];
}

export interface Props {
  user: User;
}

const MyAccount = ({ user }: Props) => {
  return <MyAccountIslands user={user} />;
};

export default MyAccount;
