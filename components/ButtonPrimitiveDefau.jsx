import * as React from "react";
// import "../styles/ButtonPrimitiveDefau.css";
const ButtonPrimitiveDefau = (props) => {
  return (
    <div className={`button-primitive-defau-1 ${props.className || ""}`}>
      {props.photography || "Published"}
    </div>
  );
};
export default ButtonPrimitiveDefau;