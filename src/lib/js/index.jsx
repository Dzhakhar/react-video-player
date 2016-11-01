import ReactVideo from "./videocomponent.jsx";
import {render} from "react-dom";
import React from "react";

// testTag is tag for testing VideoComponent
var testTag = document.getElementById("react-video-test");

class TestClass extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            url: "http://clips.vorwaerts-gmbh.de/VfE_html5.mp4"
        }

        this.changeUrl = this.changeUrl.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentWillMount(){

    }

    componentDidMount(){

    }

    changeUrl(e){
        e.preventDefault();
        let url = document.getElementById("_url").value;

        this.setState({
            url: url
        })
    }

    render(){
        return <div>
            <ReactVideo videoSrc={this.state.url} startFrom={0}/>
            <form onSubmit={this.changeUrl}>
                <input id="_url"></input>
                <input type="submit" value="SET NEW URL"></input>
            </form>
        </div>
    }
}

if (testTag) {
    render(<TestClass/>, testTag);
}