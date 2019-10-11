import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';


class AddForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            tags: [],
            validationErrors: []
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onContentChange = this.onContentChange.bind(this);
        this.onTagsChange = this.onTagsChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    
    onTitleChange(event) {
        const name = event.target.value.trim();

        this.validateTitle(name);

        this.setState({ name: name });
    }


    onContentChange(event) {
        const description = event.target.value.trim();

        this.validateContent(description);
        
        this.setState({ description: description });
    }


    onTagsChange(event) {
        const tags = event.target.value.trim();

        if (this.validateTags(tags)) {            
            this.setState({ tags: tags.split(',')});
        }        
    }

    
    onSave(event) {
        event.preventDefault();

        if (this.state.validationErrors && this.state.validationErrors.length === 0) {
            const { name, description } = this.state;
            
            if (this.validateTitle(name) && this.validateContent(description)) {
                this.props.onSaveApp(this.state);
            }
        }
    }
    

    validateTitle(name) {
        const message = 'Title is required';

        if (name === '') {
            this.addValidationError(message);
            return false;
        } else {
            this.removeValidationError(message);
            return true;
        }
    }


    validateContent(description) {
        const message = 'Content is required';

        if (description === '') {
            this.addValidationError(message);
            return false;
        } else {
            this.removeValidationError(message);
            return true;
        }
    }


    validateTags(tags) {
        const message = 'Tags must be a comma separated list';
        
        if (tags !== '') {
            var regex = new RegExp(/^([\w]+[\s]*[,]?[\s]*)+$/);

            if (!regex.test(tags)) {                
                this.addValidationError(message);
                return false;
            } else {
                this.removeValidationError(message);
                return true;
            }
        } else {
            this.removeValidationError(message);
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

    
    removeValidationError(message) {
        this.setState((previousState) => {
            const validationErrors = previousState
                .validationErrors
                .filter(error => error.message !== message);
            
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
                    <span className="h4 my-auto"><i className="fa fa-file-text-o fa-lg"></i> New App</span>
                    <a className="float-right ml-auto" onClick={this.props.onCloseModal}>
                        <i className="fa fa-remove fa-2x mr-2 text-danger"></i>
                    </a>
                </div>
                {validationErrorSummary}
                <form onSubmit={this.onSave} className="mt-2">
                    <div className="form-group">
                        <label htmlFor="name">Application Name</label>
                        <input type="text" className="form-control" name="name" autoFocus onChange={this.onTitleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Application Description</label>
                        <textarea className="form-control" name="description" rows="3" onChange={this.onContentChange}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="tags">Product</label>
                        <input type="text" className="form-control" name="tags" onChange={this.onTagsChange} />
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-4 col-md-3 col-xl-2 ml-auto">
                            <button type="submit" className="btn btn-success btn-lg btn-block">
                                <i className="fa fa-save mr-2"></i>Save
                            </button>
                        </div>
                        <div className="col-sm-4 col-md-3 col-xl-2">
                            <button className="btn btn-danger btn-lg btn-block mt-2 mt-sm-0"
                                onClick={this.props.onCloseModal}
                                type="button">
                                <i className="fa fa-remove mr-2"></i>Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

AddForm.propTypes = {
    onCloseModal: PropTypes.func,
    onSaveApp: PropTypes.func
};

export default AddForm;