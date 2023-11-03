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

export interface Card {
  id: string;
  flag: "visa" | "mastercard" | "elo" | "amex" | "hipercard" | "diners";
  number: string;
  holder: string;
  year: string;
  month: string;
  cvv: string;
  default?: boolean;
}

export interface Order {
  id: string;
  price: number;
  date: string;
  status: "pending" | "approved" | "canceled";
  paymentType: "creditCard" | "boleto" | "pix" | "voucher" | "debitCard";
  deliveries: {
    id: string;
    history: {
      date: string;
      status:
        | "ready-to-handle"
        | "shipped"
        | "delivered"
        | "canceled"
        | "returned";
    }[];
    shippingCompany: string;
    trackingNumber: string;
    deliveryForecast: string;
    address: Address;
  }[];
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
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
  addresses: Address[];
  savedCards?: Card[];
  orders?: Order[];
}

export interface Props {
  user: User;
}

const MyAccount = ({ user }: Props) => {
  return <MyAccountIslands user={user} />;
};

export default MyAccount;
