import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';
import { Button } from 'react-bootstrap';

class AddTemplate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            list: '',
            validationErrors: []
        };

        this.onTextChange = this.onTextChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onTextChange(event) {
        const list = event.target.value.trim();
        this.validateText(list);
        this.setState({ list: list });
    }

    onSave(event) {
        event.preventDefault();
        this.props.onSaveTemplate('');
    }

    validateText(text) {
        if (text === '') {
            const message = 'Template List is required';
            this.addValidationError(message);
            return false;
        } else {
            this.removeValidationError(message);
            return true;
        }
    }
    
    addValidationError(message) {        
        this.setState((previousState) => {
            const validationErrors = [...previousState.validationErrors];
            validationErrors.push({message});
            return {
                validationErrors: validationErrors
            };
        });      
    }

    removeValidationError(type) {
        this.setState((previousState) => {
            const validationErrors = previousState
                .validationErrors
                .filter(error => !error.message.startsWith(type));
            
            return {
                validationErrors: validationErrors
            };
        });      
    }

    
    render() {
        const validationErrorSummary = this.state.validationErrors.map(error => 
            <div key={uuidv1()} className="alert alert-danger alert-dismissible fade show">
                {error.message}
                <button type="button" className="close" data-dismiss="alert">
                    <span>&times;</span>
                </button>
            </div>
        );
        return (
            <div className="card card-body">
                <div className="mb-2">        
                    <span className="h4 my-auto"><i className="fa fa-file-text-o fa-lg"></i>Add Template</span>
                    <a className="float-right ml-auto" onClick={this.props.onCloseModal}>
                        <i className="fa fa-remove fa-2x mr-2 text-danger"></i>
                    </a>
                </div>
                {validationErrorSummary}
                <form onSubmit={this.onSave} className="mt-2">
                    <div className="form-group">
                        <label htmlFor="list">Template</label>
                        <textarea className="form-control" name="list" rows="15" onChange={this.onTextChange}></textarea>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-4 col-md-3 col-xl-2 ml-auto">
                            <Button type="submit" variant="primary" block>Save</Button>
                        </div>
                        <div className="col-sm-4 col-md-3 col-xl-2">
                            <Button type="button" variant="danger" onClick={this.props.onCloseModal} block>Cancel</Button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

AddTemplate.propTypes = {
    onCloseModal: PropTypes.func,
    onSaveTemplate: PropTypes.func
};

export default AddTemplate;