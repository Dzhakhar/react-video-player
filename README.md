# react-video-player
```html
<html>
  <head>
    <link rel="stylesheet" href="src/dist/css/style.css"> <!-- include css file -->
  </head>
  <body>
    <div id="myvideos"></div>

    <script src="https://use.fontawesome.com/485ba5c478.js"></script> <!-- include font-awesome -->
    <script src="src/dist/reactvideo.js"></script>
  </body>
</html>
```

```javascript
import VideoPlayer from "dureact";
import {render} from "react-dom";

render(<VideoPlayer videoSrc="http://site.com/myawesomevideo.mp4"/>,
      document.getElementById("myvideos"));
```

#contributing
```
npm install
webpack --watch --progress --colors
google-chrome demo.html // open demo.html in your browser
```

```javascript
import React from "react";
import VideoPlayer from "src/lib/js/videocomponents.jsx";
```
