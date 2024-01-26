import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

interface PhoneNumberInputProps {
  value: string;
  setValue: any;
}

export default function PhoneNumberInput({
  value,
  setValue,
}: PhoneNumberInputProps) {
  return (
    <PhoneInput
      placeholder="Enter phone number"
      defaultCountry="BD"
      value={value}
      onChange={setValue}
      className={"phoneNumberInput"}
    />
  );
}
