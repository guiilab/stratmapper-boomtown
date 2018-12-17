import React, { Component } from 'react';

import { Context } from '../../../Provider.js';

class LabelType extends Component {
    state = {
        hover: false,
        active: false,
        color: null,
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.state.activeLabelTypes.includes(nextProps.label)) {
            return {
                active: true
            };
        }
        if (!nextProps.state.activeLabelTypes.includes(nextProps.label)) {

            return {
                active: false
            };
        }
        return null;
    }

    toggleHover = () => {
        this.setState({
            hover: !this.state.hover
        })
    }

    render() {
        const { label } = this.props;

        let buttonStyle;

        if (this.state.hover) {
            buttonStyle = {
                boxShadow: "0px 0px 1px black",
                backgroundColor: "green"
            }
        } else if (this.state.active) {
            buttonStyle = {
                backgroundColor: "green"
            }
        }
        else {
            buttonStyle = {
                backgroundColor: "grey"
            }
        }

        return (
            <div
                style={buttonStyle}
                className="label-type"
                onMouseOut={() => this.toggleHover()}
                onMouseOver={() => this.toggleHover()}
                onClick={() => this.props.updateActiveLabelTypes(label)}>
                {label}
            </div>
        );
    }
}

export default (props) => (
    <Context.Consumer>
        {(context) => <LabelType {...context} {...props} />}
    </Context.Consumer>
);