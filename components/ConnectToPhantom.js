"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ConnectToPhantom = function () {
    var _a = (0, react_1.useState)(null), phantom = _a[0], setPhantom = _a[1];
    (0, react_1.useEffect)(function () {
        if ("solana" in window) {
            setPhantom(window["solana"]);
        }
    }, []);
    var _b = (0, react_1.useState)(false), connected = _b[0], setConnected = _b[1];
    (0, react_1.useEffect)(function () {
        phantom === null || phantom === void 0 ? void 0 : phantom.on("connect", function () {
            setConnected(true);
        });
        phantom === null || phantom === void 0 ? void 0 : phantom.on("disconnect", function () {
            setConnected(false);
        });
    }, [phantom]);
    var connectHandler = function () {
        phantom === null || phantom === void 0 ? void 0 : phantom.connect();
    };
    var disconnectHandler = function () {
        phantom === null || phantom === void 0 ? void 0 : phantom.disconnect();
    };
    if (phantom) {
        if (connected) {
            return (<button onClick={disconnectHandler} className="py-2 px-4 border border-purple-700 rounded-md text-sm font-medium text-purple-700 whitespace-nowrap hover:bg-purple-200">
          Disconnect from Phantom
        </button>);
        }
        return (<button onClick={connectHandler} className="bg-purple-500 py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white whitespace-nowrap hover:bg-opacity-75">
        Connect to Phantom
      </button>);
    }
    return (<a href="https://phantom.app/" target="_blank" className="bg-purple-500 px-4 py-2 border border-transparent rounded-md text-base font-medium text-white">
      Get Phantom
    </a>);
};
exports["default"] = ConnectToPhantom;
