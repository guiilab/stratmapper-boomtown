import React, { PureComponent } from 'react';

import { Context } from '../../../../Provider.js'

class ContextMenu extends PureComponent {
    constructor(props) {
        super(props)
        this.contextContainer = React.createRef()
        this.state = {
            width: null,
            edit: false,
            title: '',
            author: '',
            description: ''
        }
    }

    componentDidMount() {
        this.setState({
            title: this.props.title,
            author: this.props.author,
            description: this.props.description
        })
    }

    handleChange = (e) => {
        this.setState({ [e.target.getAttribute('edit-data-label')]: e.target.value });
    }

    deleteClick = () => {
        const response = window.confirm('Are you sure you want to delete this label?')
        if (response === true) {
            this.deleteLabel(this.props.id)
        }
    }

    editClick = () => {
        if (this.state.edit) {
            this.setState({
                edit: false
            })
        } else {
            this.setState({
                width: this.contextContainer.current.offsetWidth
            }, () => {
                this.setState({
                    edit: true
                })
            })
        }
    }

    deleteLabel = (id) => {
        return fetch('/api/delete-label', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        }).then(() => {
            this.context.getLoadLabels()
            this.context.changeLabel(null)
            this.props.toggleContextMenu()
        })
    }

    editLabel = (state) => {
        return fetch('/api/edit-label', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.props.id,
                title: state.title,
                author: state.author,
                description: state.description
            })
        }).then(() => {
            this.context.getLoadLabels()
            this.context.changeLabel(null)
            this.setState({
                edit: false
            })
        })
    }

    render() {
        const { disableContextMenu } = this.props;

        let visibility = this.props.active ? 'visible' : 'hidden';
        let opacity = this.props.active ? '1' : '0';
        let posX = this.props.posX ? this.props.posX : '0px';

        let contextMenuStyle = {
            visibility: visibility,
            opacity: opacity,
            left: posX
        }

        let contextMenuStyleEdit = {
            visibility: visibility,
            opacity: opacity,
            left: posX,
            width: this.state.width
        }

        if (this.state.edit) {
            return (
                <div style={contextMenuStyleEdit} className="context-menu-container" onMouseLeave={() => this.props.disableContextMenu()}>
                    <div className="label-controls">
                        <div onClick={this.editClick} className="label-edit">Edit</div>
                        <div onClick={this.deleteClick} className="label-delete">Delete</div>
                        <div onClick={disableContextMenu} className="label-close-button">Close</div>
                    </div>
                    <div className="label-title-container">
                        <div className="label-title">
                            <input className="edit-label-input" edit-data-label="title" placeholder="Title" type="text" maxLength={30} value={this.state.title} onChange={(e) => this.handleChange(e)} />
                        </div>
                        <div className="label-author">
                            <input className="edit-label-input" edit-data-label="author" placeholder="Author Name" type="text" value={this.state.author} onChange={(e) => this.handleChange(e)} />
                        </div>
                    </div>
                    <textarea className="edit-label-input textarea-edit" edit-data-label="description" placeholder="Description" value={this.state.description} onChange={(e) => this.handleChange(e)} />
                    <div
                        className="edit-label-button"
                        onClick={() => this.editLabel(this.state)}
                    >Submit</div>
                </div>
            )
        }
        return (
            <div style={contextMenuStyle} className="context-menu-container" ref={this.contextContainer} onMouseLeave={() => this.props.disableContextMenu()}>
                <div className="label-controls">
                    <div onClick={this.editClick} className="label-edit">Edit</div>
                    <div onClick={this.deleteClick} className="label-delete">Delete</div>
                    <div onClick={disableContextMenu} className="label-close-button">Close</div>
                </div>
                <div className="label-title-container">
                    <div className="label-title">{this.state.title}</div>
                    <div className="label-author">{this.state.author}</div>
                </div>
                <div className="label-description">{this.state.description}</div>
            </div>
        );
    }
}

ContextMenu.contextType = Context;

export default ContextMenu;