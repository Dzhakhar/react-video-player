import ReactVideo from "./videocomponent.jsx";
import {render} from "react-dom";
import React from "react";

var testTag = document.getElementById("react-video-test");

if (testTag) {
    render(<ReactVideo/>, testTag);
}