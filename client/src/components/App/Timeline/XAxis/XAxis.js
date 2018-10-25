import React, { Component } from 'react';

import { Context } from '../../Provider.js';
import * as d3 from 'd3';

class XAxis extends Component {

    componentDidMount() {
        this.renderAxis()
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.zoomTransform !== this.props.zoomTransform) {
            return true
        }
        return false
    }

    componentWillUpdate(nextProps) {
        this.renderAxis(nextProps);
    }

    renderAxis = () => {
        const { zoomTransform } = this.props;

        const xScaleTime = d3.scaleLinear()
            .domain([this.props.timestampRange.start, this.props.timestampRange.end])
            .range([0, this.props.width])

        if (zoomTransform) {
            xScaleTime.domain(zoomTransform.rescaleX(xScaleTime).domain());
        }

        const axis = d3.axisBottom(xScaleTime)
        d3.select(this.refs.xAxis)
            .call(axis);
    }

    render() {

        return <g ref="xAxis" />
    }
}

export default (props) => (
    <Context.Consumer>
        {(context) => <XAxis {...context} {...props} />}
    </Context.Consumer>
);