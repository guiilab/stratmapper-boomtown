import React, { Component } from 'react';

import { Context } from './../Provider.js';
import AppTitle from './AppTitle/AppTitle.js'
import MatchSelect from './MatchSelect/MatchSelect.js';
import UnitSelect from './UnitSelect/UnitSelect.js';

class LeftSidebar extends Component {

    // static contextType = Context;

    render() {
        return (
            <div className="left-sidebar">
                <AppTitle />
                <MatchSelect />
                <UnitSelect />
            </div>
        );
    }
}

// LeftSidebar.contextType = Context;

export default () => <LeftSidebar />;