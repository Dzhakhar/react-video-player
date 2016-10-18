import React from "react";

class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            play: false,
            currentTime: undefined,
            duration: undefined,
            ended: false,
            dragok: false,
            mouseOver: true,
            fullscreen: false
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.playVideo = this.playVideo.bind(this);
        this.pauseVideo = this.pauseVideo.bind(this);
        this.onTimeUpdate = this.onTimeUpdate.bind(this);
        this.parseTime = this.parseTime.bind(this);
        this.onLoadedData = this.onLoadedData.bind(this);
        this.onEnded = this.onEnded.bind(this);
        this.progressControllerOnClick = this.progressControllerOnClick.bind(this);
        this.progressControllerOnMouseMove = this.progressControllerOnMouseMove.bind(this);
        this.progressControllerOnMouseUp = this.progressControllerOnMouseUp.bind(this);
        this.requestFullScreen = this.requestFullScreen.bind(this);
        this.exitFullScreen = this.exitFullScreen.bind(this);
    }

    parseTime(sec) {
        let minutes = Math.floor(sec / 60);
        let seconds = parseInt(sec % 60);
        let hours = Math.floor(sec / 3600);

        return {
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }
    }

    componentDidMount() {
        let self = this;
        let video = document.getElementById("video_" + this.props.counter);

        video.addEventListener('loadstart', function (e) {
        })

        video.addEventListener("timeupdate", function (e) {

        })
    }

    onLoadedData(e) {
        let self = this;
        let video = e.target;

        self.setState({
            duration: self.parseTime(video.duration)
        })
    }

    onTimeUpdate(e) {
        let self = this;
        let video = e.target;

        self.setState({
            currentTime: this.parseTime(video.currentTime),
            percentage: parseInt((video.currentTime / video.duration) * 100)
        })
    }

    onEnded(e) {
        let self = this;
        self.setState({
            ended: true
        })
    }

    playVideo(e) {
        var video = document.getElementById("video_" + this.props.counter);
        video.play();
        this.setState({
            play: true,
            ended: false
        })
    }

    pauseVideo(e) {
        var video = document.getElementById("video_" + this.props.counter);
        video.pause();
        this.setState({
            play: false
        })
    }

    requestFullScreen(e) {
        let video = document.getElementById("video_" + this.props.counter);
        video.webkitRequestFullScreen();
        this.setState({
            fullscreen: true
        })
    }

    exitFullScreen(e) {
        if (document.webkitIsFullScreen) {
            document.webkitCancelFullScreen();
            this.setState({
                fullscreen: false
            })
        }
    }

    progressControllerOnClick(e) {
        this.setState({
            dragok: true
        })
    }

    progressControllerOnMouseUp(e) {
        this.setState({
            dragok: false
        })
    }

    progressControllerOnMouseMove(e) {
        console.log(e);
    }

    render() {
        let self = this;

        let timeToString = function (time) {
            let hours = (time.hours < 10) ? "0" + time.hours : time.hours;
            let minutes = (time.minutes < 10) ? "0" + time.minutes : time.minutes;
            let seconds = (time.seconds < 10) ? "0" + time.seconds : time.seconds;

            if (hours < 1) {
                return minutes + ":" + seconds
            }

            return hours + ":" + minutes + ":" + seconds;
        }

        return <div
            className="react-video-player main-video"
            onContextMenu={(e)=> {
                e.preventDefault();
                return false
            }}
            onMouseLeave={()=> {
                self.setState({mouseOver: false})
            }}
            onMouseOver={()=> {
                self.setState({mouseOver: true})
            }}
        >
            <video
                id={"video_" + this.props.counter}
                onTimeUpdate={this.onTimeUpdate}
                onLoadedData={this.onLoadedData}
                onEnded={this.onEnded}
            >
                <source src={this.props.videoSrc} type="video/mp4"></source>
                Your browser does not support HTML5 video.
            </video>

            <div className="video-cover" onClick={(this.state.play) ? this.pauseVideo : this.playVideo}>

            </div>

            {(this.state.mouseOver || !this.state.play) ? <div className="video-controls">
                <div className="video-progress">
                    <div className="full"
                         style={{width: (this.state.percentage > 0) ? this.state.percentage + "%" : "0%"}}>
                        <span
                            className="progress-controller"
                            onClick={this.progressControllerOnClick}
                            onMouseMove={(this.state.dragok) ? this.progressControllerOnMouseMove : ()=> {
                                return false
                            }}
                            onMouseUp={this.progressControllerOnMouseUp}></span>
                    </div>
                    <div className="loaded"></div>
                </div>
                {(this.state.play) ? <span onClick={(this.state.ended) ? this.playVideo : this.pauseVideo}><i
                    className={(this.state.ended) ? "fa fa-refresh icon" : "fa fa-pause icon"}></i></span> :
                    <span onClick={this.playVideo}><i className="fa fa-play icon"></i></span>}
                <span><i className="volume up icon"></i></span>
                <span className="time-bar">
                    <span
                        className="current-time">{(this.state.currentTime) ? timeToString(this.state.currentTime) : "00:00"}</span>
                    <span className="time-divider">/</span>
                    <span
                        className="duration">{(this.state.duration) ? timeToString(this.state.duration) : "00:00"}</span>
                </span>
                <span className="right-controls">
                    {(this.state.fullscreen) ? <span className="request-fullscreen" onClick={this.exitFullScreen}>
                        <i className="fa fa-compress icon"></i>
                    </span> : <span className="request-fullscreen" onClick={this.requestFullScreen}>
                        <i className="fa fa-arrows-alt icon"></i>
                    </span>}
                </span>
            </div> : false}
        </div>
    }
}

export default VideoPlayer;