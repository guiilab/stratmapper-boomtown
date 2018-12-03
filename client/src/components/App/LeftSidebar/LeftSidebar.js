import React, { Component } from 'react';

import AppTitle from './AppTitle/AppTitle.js';
import MatchSelect from './MatchSelect/MatchSelect.js';
import TestCondition from './TestCondition/TestCondition.js';
import UnitSelect from './UnitSelect/UnitSelect.js';

class LeftSidebar extends Component {

    render() {
        return (
            <div className="left-sidebar">
                <AppTitle />
                <MatchSelect />
                <TestCondition />
                <UnitSelect />
            </div>
        );
    }
}

export default LeftSidebar;