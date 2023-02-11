import * as React from "react";
// import "../styles/Stacked.css";
// import pharrowSquareOut from "../assets/pharrowSquareOut.svg";
import ButtonRoundedDefault from "./ButtonRoundedDefault";
import ButtonPrimitiveDefau from "./ButtonPrimitiveDefau";
const Stacked = (props) => {
  return (
    <div className={`stacked ${props.className || ""}`}>
      <div className="background">
        <div className="image">
          <ButtonPrimitiveDefau
            className="button-primitive-defau-instance-2"
            {...props.buttonPrimitiveDefau}
          />
        </div>
        <span className="paper-1">{props.paper1 || "Paper 1"}</span>
        <span className="authors-xxxyyyzzzz-s">
          {props.authorsXxxyyyzzzzS ||
            "Authors: xxx,yyy,zzzz\nShared with: \n0x25345326234532,\n0x36439458193296823"}
        </span>
        <div className="flex-container-2">
          <div className="flex-container-3">
            <ButtonRoundedDefault
              className="button-rounded-default-instance-1"
              {...props.buttonRoundedDefault}
            />
            <ButtonRoundedDefault
              className="button-rounded-default-instance-2"
              {...props.buttonRoundedDefault1}
            />
            <ButtonRoundedDefault
              className="button-rounded-default-instance-3"
              {...props.buttonRoundedDefault2}
            />
          </div>
          <span className="open-in-explorer">
            {props.openInExplorer || "Open in Explorer"}
          </span>

          {/* <img
            className="pharrow-square-out"
            src={props.pharrowSquareOut || pharrowSquareOut}
          /> */}

        </div>
      </div>
    </div>
  );
};
export default Stacked;