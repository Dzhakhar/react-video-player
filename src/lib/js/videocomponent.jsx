import React from "react";

class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            play: false,
            currentTime: undefined,
            duration: undefined,
            ended: false,
            mouseOver: true,
            fullscreen: false,
            inputActive: false
        }

        this.coverOnClick = this.coverOnClick.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.playVideo = this.playVideo.bind(this);
        this.pauseVideo = this.pauseVideo.bind(this);
        this.onTimeUpdate = this.onTimeUpdate.bind(this);
        this.parseTime = this.parseTime.bind(this);
        this.onLoadedData = this.onLoadedData.bind(this);
        this.onEnded = this.onEnded.bind(this);
        this.requestFullScreen = this.requestFullScreen.bind(this);
        this.exitFullScreen = this.exitFullScreen.bind(this);
        this.rewind = this.rewind.bind(this);
        this.onArrowClick = this.onArrowClick.bind(this);
        this.getOffset = this.getOffset.bind(this);
        this.playFrom = this.playFrom.bind(this);
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

        if (this.state.inputActive) {
            document.getElementById("video_input_" + this.props.counter).focus();
        }

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

    coverOnClick(e) {
        let self = this;

        self.setState({
            inputActive: true
        }, ()=> {
            document.getElementById("video_input_" + this.props.counter).focus();
        })

        return (this.state.play) ? this.pauseVideo(e) : this.playVideo(e);
    }

    rewind(time, increase) {
        let self = this;
        let video = document.getElementById("video_" + this.props.counter);

        if (increase) {
            video.currentTime += time;
        } else {
            video.currentTime -= time;
        }

        self.setState({
            currentTime: video.currentTime
        })
    }

    onArrowClick(e) {
        let video = document.getElementById("video_" + this.props.counter);
        let self = this;

        switch (e.which) {
            case 37:
                e.preventDefault();
                self.rewind(parseInt(video.duration / 10), false);
                break;
            case 39:
                e.preventDefault();
                self.rewind(parseInt(video.duration / 10), true);
                break;
            case 32:
                e.preventDefault();
                if (self.state.play) {
                    self.pauseVideo(e);
                } else {
                    self.playVideo(e);
                }
                break;
            default:
                e.preventDefault();
        }

    }

    requestFullScreen(e) {
        let video = document.getElementById("video_" + this.props.counter);
        if (video.webkitRequestFullScreen) {
            video.webkitRequestFullScreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        }
        this.setState({
            fullscreen: true
        })
    }

    exitFullScreen(e) {
        let video = document.getElementById("video_" + this.props.counter);
        if (document.webkitIsFullScreen) {
            this.setState({
                fullscreen: false
            }, ()=> {
                document.webkitCancelFullScreen();
            })
        }
    }

    getOffset(evt) {
        var el = evt.target,
            x = 0,
            y = 0;

        while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
            x += el.offsetLeft - el.scrollLeft;
            y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }

        x = evt.clientX - x;
        y = evt.clientY - y;
        let pr = x / evt.target.offsetWidth;
        this.playFrom((60000 * pr) / 1000 % 60);
    }

    playFrom(sec) {
        let video = document.getElementById("video_" + this.props.counter);
        video.pause();
        video.currentTime = sec;
        this.setState({
            currentTime: video.currentTime
        })
        video.play();
    }

    render() {
        let self = this;

        let timeToString = function (time) {
            let hours = (time.hours < 10) ? "0" + time.hours : time.hours;
            let minutes = (time.minutes < 10) ? "0" + time.minutes : time.minutes;
            let seconds = (time.seconds < 10) ? "0" + time.seconds : time.seconds;

            if (!minutes || !seconds) {
                return "";
            }

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
                onKeyPress={this.onArrowClick} onKeyDown={this.onArrowClick}
            >
                <source src={this.props.videoSrc} type="video/mp4"></source>
                Your browser does not support HTML5 video.
            </video>

            <input type="text" className="hidden_input" id={"video_input_" + this.props.counter}
                   onKeyPress={this.onArrowClick} onKeyDown={this.onArrowClick}/>
            <div className="video-cover" id={"video_cover_" + this.props.counter} onClick={this.coverOnClick}>
            </div>

            {(this.state.mouseOver || !this.state.play) ?
                <div className="video-controls"
                     onKeyPress={this.onArrowClick} onKeyDown={this.onArrowClick}>
                    <div className="video-progress"
                         onClick={this.getOffset}
                    >
                        <div className="full"
                             style={{width: (this.state.percentage > 0) ? this.state.percentage + "%" : "0%"}}>
                        <span
                            className="progress-controller"></span>
                        </div>
                        <div className="loaded"></div>
                    </div>
                    {(this.state.play) ? <span onClick={(this.state.ended) ? this.playVideo : this.pauseVideo}><i
                        className={(this.state.ended) ? "fa fa-refresh control-icon" : "fa fa-pause control-icon"}></i></span> :
                        <span onClick={this.playVideo}><i className="fa fa-play control-icon"></i></span>}
                    <span><i className="fa fa-volume-up control-icon"></i></span>
                    <span className="time-bar">
                    <span
                        className="current-time">{(this.state.currentTime) ? timeToString(this.state.currentTime) : "00:00"}</span>
                    <span className="time-divider">/</span>
                    <span
                        className="duration">{(this.state.duration) ? timeToString(this.state.duration) : "00:00"}</span>
                </span>
                    <span className="right-controls">
                    {(this.state.fullscreen || document.webkitIsFullScreen) ?
                        <span className="request-fullscreen" onClick={this.exitFullScreen}>
                        <i className="fa fa-compress control-icon"></i>
                    </span> : <span className="request-fullscreen" onClick={this.requestFullScreen}>
                        <i className="fa fa-arrows-alt control-icon"></i>
                    </span>}
                </span>
                </div> : false}
        </div>
    }
}

export default VideoPlayer;