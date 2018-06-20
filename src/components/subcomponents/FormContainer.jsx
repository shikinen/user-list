import React, { Component } from 'react';
import Form from './Form.jsx';

class FormContainer extends Component {

    toggleBodyDisplay = (e) => {
        this.props.handleDisplayToggle();
    }

    handleAdd = (tempUser) => {
        this.props.onAdd(tempUser);
    }

    render() {
        const displayPanelBody = {
            display: this.props.panelBodyVisible ? 'block' : 'none'
        };

        return (
            <div className="section form-container">
                <header className="section__header form-container__header" onClick={this.toggleBodyDisplay}>
                    Add new user
                </header>
                <div className="form-container__body" style={displayPanelBody}>
                    <Form onAdd={this.handleAdd}/>
                </div>
            </div>
        );
    }
}

export default FormContainer