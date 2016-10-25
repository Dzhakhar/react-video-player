# dureact
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

```css
@import "node_modules/dureact/src/dist/css/style.css"; /* import dureact's style file  */
```

# props
**startFrom** - <Integer> start point of video 


```html
<!-- include fontawesome css -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
<div id="myvideos"></div>
```

#contributing
```
https://github.com/Dzhakhar/react-video-player.git dureact
cd dureact
npm install
webpack --watch --progress --colors
google-chrome demo.html // open demo.html in your browser
```

```javascript
import React from "react";
import VideoPlayer from "src/lib/js/videocomponents.jsx";
```
