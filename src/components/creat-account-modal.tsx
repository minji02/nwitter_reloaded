import LoginForm from "./login";
import { SetModal } from "../routes/authentication";
import { CloseBtn, ModalWrapper } from "./modal";
import CreateAccount from "./create-account";

export default function CreateAccountModal({ setOpenModal }: SetModal) {
  const onClick = () => {
    setOpenModal(false);
  };

  return (
    <ModalWrapper>
      <CloseBtn onClick={onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </CloseBtn>
      <CreateAccount />
    </ModalWrapper>
  );
}
