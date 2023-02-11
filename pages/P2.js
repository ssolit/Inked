import * as React from "react";
// import "../styles/P2.css";
// import frame from "./assets/frame.svg";
// import pharrowSquareOut from "./assets/pharrowSquareOut.svg";
// import antDesignsettingFi from "./assets/antDesignsettingFi.svg";
import ButtonPrimitiveHover from "../components/ButtonPrimitiveHover";
import Stacked from "../components/Stacked";
const P2 = () => {
  const propsData = {
    buttonPrimitiveHover: {
      buttonPrimitiveDefau: {
        photography: "Upload",
      },
    },
    buttonPrimitiveHover1: {
      buttonPrimitiveDefau: {
        photography: "My papers",
      },
    },
    buttonPrimitiveHover2: {
      buttonPrimitiveDefau: {
        photography: "Shared with Me",
      },
    },
    stacked: {
      authorsXxxyyyzzzzS:
        "Authors: xxx,yyy,zzzz\nShared with: \n0x25345326234532,\n0x36439458193296823",
      openInExplorer: "Open in Explorer",
    //   pharrowSquareOut: pharrowSquareOut,
      buttonPrimitiveDefau: {
        photography: "Published",
      },
      paper1: "Paper 1",
      buttonRoundedDefault: {
        buttonPrimitiveDefau: {
          photography: "Peer reviewed by: Research Gate",
        },
      },
    },
  };
  return (
    <div className="mac-book-pro-14-3">
    {/* <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
    </Head> */}

      <div className="navigation-header-defa">
        {/* <img className="frame" src={frame} /> */}
        {/* <span className="inked">Inked</span>
        <span className="home">Home</span>
        <span className="blog">Blog</span> */}
        <button className="button-outline-default">
          <div className="button-primitive-defau">
            <span className="welcome-0-x-32-aff">Welcome, 0x32..aff</span>
          </div>
        </button>
      </div>
      <hr className="line-1" />
      <div className="flex-container">
        <ButtonPrimitiveHover
          className="button-primitive-hover-instance"
          {...propsData.buttonPrimitiveHover}
        />
        <ButtonPrimitiveHover
          className="button-primitive-hover-instance-1"
          {...propsData.buttonPrimitiveHover1}
        />
        <ButtonPrimitiveHover
          className="button-primitive-hover-instance-3"
          {...propsData.buttonPrimitiveHover2}
        />
      </div>
      <div className="flex-container-1">
        <Stacked className="stacked-instance-1" {...propsData.stacked} />
        {/* <img className="ant-designsetting-fi" src={antDesignsettingFi} /> */}
      </div>
    </div>
  );
};
export default P2;