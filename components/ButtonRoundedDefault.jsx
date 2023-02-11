import * as React from "react";
// import "../styles/ButtonRoundedDefault.css";
import ButtonPrimitiveDefau from "./ButtonPrimitiveDefau";
const ButtonRoundedDefault = (props) => {
  return (
    <div className={`button-rounded-default ${props.className || ""}`}>
      <ButtonPrimitiveDefau
        className="button-primitive-defau-instance"
        {...props.buttonPrimitiveDefau}
      />
    </div>
  );
};
export default ButtonRoundedDefault;