import React, { Component } from 'react';

import { Context } from '../../Provider.js';
import LabelType from './LabelType/LabelType.js';

class AddLabel extends Component {

    state = {
        title: '',
        author: '',
        description: ''
    }

    handleChange = (e) => {
        this.setState({ [e.target.getAttribute('data-label')]: e.target.value });
    }

    clearData = () => {
        this.setState({
            title: '',
            author: '',
            description: ''
        })
    }

    render() {
        let addLabelStyle = {
            opacity: this.props.opacity
        }

        return (
            <div style={addLabelStyle} className="add-label">
                <div className="label-type-container">
                    {this.props.state.labelTypes.map((l) => {
                        return (
                            <LabelType label={l} key={l} />
                        )
                    })
                    }
                </div>
                <input className="label-input" data-label="title" placeholder="Title" type="text" maxLength={20} value={this.state.title} onChange={(e) => this.handleChange(e)} />
                <input className="label-input" data-label="author" placeholder="Author Name" type="text" value={this.state.author} onChange={(e) => this.handleChange(e)} />
                <textarea className="label-input textarea" data-label="description" placeholder="Description" value={this.state.description} onChange={(e) => this.handleChange(e)} />
                <div className="label-buttons">
                    <div
                        className="add-label-button"
                        onClick={(() => {
                            let response = this.props.addLabel(this.state)
                            if (response !== 'failure') {
                                this.clearData()
                            }
                        })
                        }>Add Label</div>
                    <div
                        className="search-labels-button"
                        onClick={(() => this.props.searchLabels(this.state))
                        }>Search Labels</div>
                </div>
            </div>
        )
    }
}

export default (props) => (
    <Context.Consumer>
        {(context) => <AddLabel {...context} {...props} />}
    </Context.Consumer>
);