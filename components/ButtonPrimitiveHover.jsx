import * as React from "react";
// import "../styles/ButtonPrimitiveHover.css";
import ButtonPrimitiveDefau from "./ButtonPrimitiveDefau";
const ButtonPrimitiveHover = (props) => {
  return (
    <button className={`button-primitive-hover ${props.className || ""}`}>
      <ButtonPrimitiveDefau
        className="button-primitive-defau-instance-3"
        {...props.buttonPrimitiveDefau}
      />
    </button>
  );
};
export default ButtonPrimitiveHover;