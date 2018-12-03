import React, { Component } from 'react';

import { Context } from '../../Provider.js'
import TestConditionKey from './TestConditionKey/TestConditionKey.js';
import TestConditionValue from './TestConditionValue/TestConditionValue.js';

class TestCondition extends Component {

    render() {
        const { testCondition } = this.context.state;

        return (
            <div className="test-condition-container">
                {Object.keys(testCondition).map((d) => {
                    return (
                        <div className="test-element">
                            <TestConditionKey title={d} />
                            <TestConditionValue value={testCondition[d]} />
                        </div>
                    )
                })
                }
            </div>
        );
    }
}

TestCondition.contextType = Context;

export default TestCondition;