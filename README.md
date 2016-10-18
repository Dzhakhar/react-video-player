# react-video-player
Dureact is ReactJS video player for html5 compatible browsers

# usage
```
npm install dureact
```

```javascript
import VideoPlayer from "dureact";
import {render} from "react-dom";

render(<VideoPlayer videoSrc="http://site.com/myawesomevideo.mp4"/>,
      document.getElementById("myvideos"));
```

```html
<div id="myvideos"></div>
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
