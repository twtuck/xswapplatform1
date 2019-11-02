import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';
import { Button, Alert } from 'react-bootstrap';


class AddApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            company: '',
            facebookClientId: '',
            facebookClientSecret: '',
            description: '',
            validationErrors: []
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onCompanyChange = this.onCompanyChange.bind(this);
        this.onFBIdChange = this.onFBIdChange.bind(this);
        this.onFBSecretChange = this.onFBSecretChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onNameChange(event) {
        const name = event.target.value.trim();
        this.validateText(name, 'Name', true);
        this.setState({ name: name });
    }

    onDescriptionChange(event) {
        const description = event.target.value.trim();
        this.validateText(description, 'Description', false);
        this.setState({ description: description });
    }

    onCompanyChange(event) {
        const company = event.target.value.trim();
        this.validateText(company, 'Company', false);
        this.setState({ company: company });
    }

    onFBIdChange(event) {
        const facebookClientId = event.target.value.trim();
        this.validateText(facebookClientId, 'Facebook Client Id', true);
        this.setState({ facebookClientId: facebookClientId });
    }

    onFBSecretChange(event) {
        const facebookClientSecret = event.target.value.trim();
        this.validateText(facebookClientSecret, 'Facebook Client Secret', true);
        this.setState({ facebookClientSecret: facebookClientSecret });
    }

    onSave(event) {
        event.preventDefault();

        if (this.state.validationErrors && this.state.validationErrors.length === 0) {
            const { name, company, facebookClientId, facebookClientSecret } = this.state;
            
            if (this.validateText(name, 'Name') && this.validateText(company, 'Company')
                    && this.validateText(facebookClientId, 'Facebook Client Id')
                    && this.validateText(facebookClientSecret, 'Facebook Client Secret')) {
                this.props.onSaveApp(this.state)
                    .then(() => {
                        this.setState({addResult: 'success'});
                    })
                    .catch(error => {
                        console.log(error);
                        this.setState({addResult: 'fail'});
                    });
            }
        }
    }

    validateText(text, type, checkCharacter) {
        if (text === '') {
            const message = type + ' is required';
            this.addValidationError(message);
            return false;
        } else {
            if (checkCharacter) {
                var re = /\w/;
                var OK = re.exec(text); 
                if (!OK) {
                    const message = type + ' only allow alphabet and number character';
                    this.addValidationError(message);
                    return false;
                }
            }
            this.removeValidationError(type);
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
        const success = (
          <Alert variant='success'>
            Added successfully.
          </Alert>
        );
        const fail = (
          <Alert variant='danger'>
            Error when adding new Application, please try again.
          </Alert>
        );
        const { addResult } = this.state;

        return (
            <div className="card card-body">
                <div className="mb-2">        
                    <span className="h4 my-auto"><i className="fa fa-file-text-o fa-lg"></i>New Application</span>
                    <a className="float-right ml-auto" onClick={this.props.onCloseModal}>
                        <i className="fa fa-remove fa-2x mr-2 text-danger"></i>
                    </a>
                </div>
                {validationErrorSummary}
                {addResult && addResult === 'success' && success}
                {addResult && addResult === 'fail' && fail}
                <form onSubmit={this.onSave} className="mt-2">
                    <div className="form-group row">
                        <div className="col-6">
                            <label htmlFor="name">Application Name</label>
                            <input type="text" className="form-control" name="name" autoFocus onChange={this.onNameChange} />
                        </div>
                        <div className="col-6">
                            <label htmlFor="facebookClientId">Facebook Client Id</label>
                            <input type="text" className="form-control" name="facebookClientId" onChange={this.onFBIdChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-6">
                            <label htmlFor="company">Company</label>
                            <input type="text" className="form-control" name="company" onChange={this.onCompanyChange} />
                        </div>
                        <div className="col-6">
                            <label htmlFor="facebookClientSecret">Facebook Client Secret</label>
                            <input type="text" className="form-control" name="facebookClientSecret" onChange={this.onFBSecretChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Application Description</label>
                        <textarea className="form-control" name="description" rows="3" onChange={this.onDescriptionChange}></textarea>
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

AddApp.propTypes = {
    onCloseModal: PropTypes.func,
    onSaveApp: PropTypes.func
};

export default AddApp;