"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VideoPlayer = function (_React$Component) {
    _inherits(VideoPlayer, _React$Component);

    function VideoPlayer(props) {
        _classCallCheck(this, VideoPlayer);

        var _this = _possibleConstructorReturn(this, (VideoPlayer.__proto__ || Object.getPrototypeOf(VideoPlayer)).call(this, props));

        _this.state = {
            play: false,
            currentTime: undefined,
            duration: undefined,
            ended: false,
            dragok: false,
            mouseOver: true,
            fullscreen: false
        };

        _this.componentDidMount = _this.componentDidMount.bind(_this);
        _this.playVideo = _this.playVideo.bind(_this);
        _this.pauseVideo = _this.pauseVideo.bind(_this);
        _this.onTimeUpdate = _this.onTimeUpdate.bind(_this);
        _this.parseTime = _this.parseTime.bind(_this);
        _this.onLoadedData = _this.onLoadedData.bind(_this);
        _this.onEnded = _this.onEnded.bind(_this);
        _this.progressControllerOnClick = _this.progressControllerOnClick.bind(_this);
        _this.progressControllerOnMouseMove = _this.progressControllerOnMouseMove.bind(_this);
        _this.progressControllerOnMouseUp = _this.progressControllerOnMouseUp.bind(_this);
        _this.requestFullScreen = _this.requestFullScreen.bind(_this);
        _this.exitFullScreen = _this.exitFullScreen.bind(_this);
        return _this;
    }

    _createClass(VideoPlayer, [{
        key: "parseTime",
        value: function parseTime(sec) {
            var minutes = Math.floor(sec / 60);
            var seconds = parseInt(sec % 60);
            var hours = Math.floor(sec / 3600);

            return {
                hours: hours,
                minutes: minutes,
                seconds: seconds
            };
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var self = this;
            var video = document.getElementById("video_" + this.props.counter);

            video.addEventListener('loadstart', function (e) {});

            video.addEventListener("timeupdate", function (e) {});
        }
    }, {
        key: "onLoadedData",
        value: function onLoadedData(e) {
            var self = this;
            var video = e.target;

            self.setState({
                duration: self.parseTime(video.duration)
            });
        }
    }, {
        key: "onTimeUpdate",
        value: function onTimeUpdate(e) {
            var self = this;
            var video = e.target;

            self.setState({
                currentTime: this.parseTime(video.currentTime),
                percentage: parseInt(video.currentTime / video.duration * 100)
            });
        }
    }, {
        key: "onEnded",
        value: function onEnded(e) {
            var self = this;
            self.setState({
                ended: true
            });
        }
    }, {
        key: "playVideo",
        value: function playVideo(e) {
            var video = document.getElementById("video_" + this.props.counter);
            video.play();
            this.setState({
                play: true,
                ended: false
            });
        }
    }, {
        key: "pauseVideo",
        value: function pauseVideo(e) {
            var video = document.getElementById("video_" + this.props.counter);
            video.pause();
            this.setState({
                play: false
            });
        }
    }, {
        key: "requestFullScreen",
        value: function requestFullScreen(e) {
            var video = document.getElementById("video_" + this.props.counter);
            if (video.webkitRequestFullScreen) {
                video.webkitRequestFullScreen();
            } else if (video.mozRequestFullScreen) {
                video.mozRequestFullScreen();
            }
            this.setState({
                fullscreen: true
            });
        }
    }, {
        key: "exitFullScreen",
        value: function exitFullScreen(e) {
            var video = document.getElementById("video_" + this.props.counter);
            if (document.webkitIsFullScreen) {
                this.setState({
                    fullscreen: false
                }, function () {
                    document.webkitCancelFullScreen();
                });
            }
        }
    }, {
        key: "progressControllerOnClick",
        value: function progressControllerOnClick(e) {
            this.setState({
                dragok: true
            });
        }
    }, {
        key: "progressControllerOnMouseUp",
        value: function progressControllerOnMouseUp(e) {
            this.setState({
                dragok: false
            });
        }
    }, {
        key: "progressControllerOnMouseMove",
        value: function progressControllerOnMouseMove(e) {
            console.log(e);
        }
    }, {
        key: "render",
        value: function render() {
            var self = this;

            var timeToString = function timeToString(time) {
                var hours = time.hours < 10 ? "0" + time.hours : time.hours;
                var minutes = time.minutes < 10 ? "0" + time.minutes : time.minutes;
                var seconds = time.seconds < 10 ? "0" + time.seconds : time.seconds;

                if (hours < 1) {
                    return minutes + ":" + seconds;
                }

                return hours + ":" + minutes + ":" + seconds;
            };

            return _react2.default.createElement(
                "div",
                {
                    className: "react-video-player main-video",
                    onContextMenu: function onContextMenu(e) {
                        e.preventDefault();
                        return false;
                    },
                    onMouseLeave: function onMouseLeave() {
                        self.setState({ mouseOver: false });
                    },
                    onMouseOver: function onMouseOver() {
                        self.setState({ mouseOver: true });
                    }
                },
                _react2.default.createElement(
                    "video",
                    {
                        id: "video_" + this.props.counter,
                        onTimeUpdate: this.onTimeUpdate,
                        onLoadedData: this.onLoadedData,
                        onEnded: this.onEnded
                    },
                    _react2.default.createElement("source", { src: this.props.videoSrc, type: "video/mp4" }),
                    "Your browser does not support HTML5 video."
                ),
                _react2.default.createElement("div", { className: "video-cover", onClick: this.state.play ? this.pauseVideo : this.playVideo }),
                this.state.mouseOver || !this.state.play ? _react2.default.createElement(
                    "div",
                    { className: "video-controls" },
                    _react2.default.createElement(
                        "div",
                        { className: "video-progress" },
                        _react2.default.createElement(
                            "div",
                            { className: "full",
                                style: { width: this.state.percentage > 0 ? this.state.percentage + "%" : "0%" } },
                            _react2.default.createElement("span", {
                                className: "progress-controller",
                                onClick: this.progressControllerOnClick,
                                onMouseMove: this.state.dragok ? this.progressControllerOnMouseMove : function () {
                                    return false;
                                },
                                onMouseUp: this.progressControllerOnMouseUp })
                        ),
                        _react2.default.createElement("div", { className: "loaded" })
                    ),
                    this.state.play ? _react2.default.createElement(
                        "span",
                        { onClick: this.state.ended ? this.playVideo : this.pauseVideo },
                        _react2.default.createElement("i", {
                            className: this.state.ended ? "fa fa-refresh control-icon" : "fa fa-pause control-icon" })
                    ) : _react2.default.createElement(
                        "span",
                        { onClick: this.playVideo },
                        _react2.default.createElement("i", { className: "fa fa-play control-icon" })
                    ),
                    _react2.default.createElement(
                        "span",
                        null,
                        _react2.default.createElement("i", { className: "fa fa-volume-up control-icon" })
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "time-bar" },
                        _react2.default.createElement(
                            "span",
                            {
                                className: "current-time" },
                            this.state.currentTime ? timeToString(this.state.currentTime) : "00:00"
                        ),
                        _react2.default.createElement(
                            "span",
                            { className: "time-divider" },
                            "/"
                        ),
                        _react2.default.createElement(
                            "span",
                            {
                                className: "duration" },
                            this.state.duration ? timeToString(this.state.duration) : "00:00"
                        )
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "right-controls" },
                        this.state.fullscreen || document.webkitIsFullScreen ? _react2.default.createElement(
                            "span",
                            { className: "request-fullscreen", onClick: this.exitFullScreen },
                            _react2.default.createElement("i", { className: "fa fa-compress control-icon" })
                        ) : _react2.default.createElement(
                            "span",
                            { className: "request-fullscreen", onClick: this.requestFullScreen },
                            _react2.default.createElement("i", { className: "fa fa-arrows-alt control-icon" })
                        )
                    )
                ) : false
            );
        }
    }]);

    return VideoPlayer;
}(_react2.default.Component);

exports.default = VideoPlayer;
