import ReactVideo from "./videocomponent.jsx";
import {render} from "react-dom";
import React from "react";

// testTag is tag for testing VideoComponent
var testTag = document.getElementById("react-video-test");
if (testTag) {
    render(<ReactVideo videoSrc="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4" startFrom={10}/>, testTag);
}