import ReactVideo from "./videocomponent.jsx";
import {render} from "react-dom";
import React from "react";

// testTag is tag for testing VideoComponent
var testTag = document.getElementById("react-video-test");
if (testTag) {
    render(<ReactVideo/>, testTag);
}