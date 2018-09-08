import React, { Component } from 'react';

import { Context } from '../../../../../Provider.js';

class UnitOption extends Component {
    constructor(props) {
        super(props)
    }
        
    state = {
        hover: false,
        active: false,
        color: null,
        units: null,
        unit: null
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.state.selectedUnits.includes(nextProps.unit)) {
          return {
            active: true
          };
        }
    
        // Return null to indicate no change to state.
        return null;
      }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.hover !== nextState.hover) {
            return true;
        } else {
            return false;
        }
    }

    toggleHover = () => {
        this.setState({
            hover: !this.state.hover
        })
    }

    toggleActive = () => {
        this.setState({
            active: !this.state.active
        })
    }

    render() {
        const { unit, toggleSelectedUnit } = this.props;
        const { units, selectedUnits } = this.props.state;

        let buttonStyle;

        if (this.state.hover || this.state.active) {
            buttonStyle = {backgroundColor: units[unit].color}
        }

        return (
            <div className={this.state.active ? 'unit-option unit-option-active' : 'unit-option'} style={buttonStyle} key={unit} onMouseEnter={()=> this.toggleHover()} onMouseLeave={()=> this.toggleHover()} onClick={() => { this.toggleActive(); toggleSelectedUnit(unit); }} >{unit}</div>
        )
    }
}

export default (props) => (
    <Context.Consumer>
        {(context) => <UnitOption {...context} {...props} />}
    </Context.Consumer>
);