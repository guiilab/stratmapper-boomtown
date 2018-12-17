import React, { Component } from 'react';

import { Context } from '../Provider.js';
import AddLabel from './AddLabel/AddLabel.js';

class LabelPanel extends Component {

    state = {
        isOpen: false
    }

    toggleOpen = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        let width;
        let height;
        let opacity;
        let angle;
        let color;

        this.state.isOpen ? width = '400px' : width = '30px';
        this.state.isOpen ? height = null : height = '100px';
        this.state.isOpen ? opacity = 100 : opacity = 0;
        this.state.isOpen ? angle = '0deg' : angle = '270deg';
        this.state.isOpen ? color = 'coral' : color = 'green'

        let labelPanelStyle = {
            height: height,
            width: width
        }
        let labelHeaderStyle = {
            transform: `rotate(${angle})`
        }
        let closeButtonStyle = {
            backgroundColor: color
        }
        if (!this.props.state.labels) {
            return <div>loading</div>
        }
        return (
            <div style={labelPanelStyle} className="label-panel" onClick={this.state.isOpen ? null : () => this.toggleOpen()}>
                {this.state.isOpen ? null : <div style={labelHeaderStyle} className="label-header">Labels</div>}
                <AddLabel isOpen={this.state.isOpen} opacity={opacity} />
                <div style={closeButtonStyle} className="close-button" onClick={() => this.toggleOpen()}>{this.state.isOpen ? 'x' : '+'}</div>
            </div >
        )
    }
}

export default () => (
    <Context.Consumer>
        {(context) => <LabelPanel {...context} />}
    </Context.Consumer>
);