import React, { Component } from 'react';
import { scaleLinear } from 'd3';

import { Context } from '../../../../Provider';

class TimelineLabel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            labelId: this.props.label.id,
            hover: false,
            active: false,
            highlight: false
        }
        this.renderTimelineLabels();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let searchArray = [];
        if (nextProps.state.labelSearch) {
            let title = nextProps.label['title'].toLowerCase()
            let author = nextProps.label['author'].toLowerCase()
            let description = nextProps.label['description'].toLowerCase()
            nextProps.state.labelSearch.forEach((d) => {
                d = d.toLowerCase()
                if ((title.indexOf(d) > -1) || (author.indexOf(d) > -1) || (description.indexOf(d) > -1)) {
                    searchArray.push(true)
                } else {
                    searchArray.push(false)
                }
            })
            if (searchArray.includes(true)) {
                return {
                    highlight: true
                }
            } else {
                return {
                    highlight: false
                }
            }
        }
        if (nextProps.activeLabel === prevState.labelId) {
            return {
                active: true
            }
        } else if (nextProps.activeLabel !== prevState.labelId) {
            return {
                active: false
            }
        }
        return null
    }

    componentDidUpdate(prevProps, prevState) {
        const { zoomTransform } = this.props;
        const { timestampRange } = this.props.state;
        if ((zoomTransform !== prevProps.zoomTransform) || (timestampRange !== prevProps.state.timestampRange)) {
            this.renderTimelineLabels();
        }
    }

    toggleHover = (e) => {
        this.setState({
            hover: !this.state.hover
        })
        if (!this.state.hover) {
            this.props.activateContextMenu(e)
        }
    }

    handleClick = (e) => {
        const { label } = this.props;
        e.preventDefault();
        e.stopPropagation();
        if (!this.state.active) {
            this.props.changeLabel(label)
        } else {
            this.props.changeLabel()
        }
    }

    getLabelColor = () => {
        if (this.state.active) {
            return 'green'
        } else if (this.state.hover) {
            return 'green'
        } else if (this.state.highlight) {
            return 'coral'
        } else {
            return 'grey'
        }
    }

    renderTimelineLabels = () => {
        const { zoomTransform, chartWidth } = this.props;
        const { timestampRange } = this.props.state;

        this.xScaleTimeInvert = scaleLinear()
            .domain([0, timestampRange.end - timestampRange.start])
            .range([0, chartWidth])

        this.xScaleTime = scaleLinear()
            .domain([timestampRange.start, timestampRange.end])
            .range([0, chartWidth])

        if (zoomTransform) {
            this.xScaleTime.domain(zoomTransform.rescaleX(this.xScaleTime).domain());
        }
    }

    render() {
        const { label, zoomTransform } = this.props;

        let labelPosX = label.timestamp_range[0];
        let diff = (Math.round(label.timestamp_range[1]) - Math.round(label.timestamp_range[0]))

        let color;
        let opacity;
        color = this.getLabelColor()
        opacity = this.state.hover ? '.6' : '.8'

        return (
            <g>
                <rect
                    title={label.title}
                    description={label.description}
                    author={label.author}
                    id={label.id}
                    width={zoomTransform ? this.xScaleTimeInvert(diff * zoomTransform.k) : this.xScaleTimeInvert(diff)}
                    height={30}
                    y={0}
                    x={this.xScaleTime(labelPosX)}
                    className="timeline-label"
                    fill={color}
                    pointerEvents='all'
                    onClick={(e) => this.handleClick(e)}
                    onMouseOver={(e) => this.toggleHover(e)}
                    onMouseOut={() => this.toggleHover()}
                    opacity={opacity}
                    stroke="black"
                    strokeWidth="1px"
                >
                </rect>
                <text
                    x={this.xScaleTime(labelPosX) + 10}
                    fontFamily="Verdana"
                    fontSize="12"
                    fill="white"
                    y="20"
                    pointerEvents="none"
                >
                    {label.title}
                </text>
            </g>
        );
    }
}

export default (props) => (
    <Context.Consumer>
        {(context) => <TimelineLabel {...context} {...props} />}
    </Context.Consumer>
);
