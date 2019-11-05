import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button , Alert} from 'react-bootstrap';

class AddProduct extends Component {

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
        if (this.state.validationErrors && this.state.validationErrors.length === 0) {
            const { list } = this.state;
            
            if (this.validateText(list)) {
                this.props.onSaveProduct(this.props.app.appId, list);
            }
        }
    }

    validateText(text) {
        const message = 'Product List is required';
        if (text === '') {
          this.setState({validationErrorMessage: message})
          return false;
        } else {
          this.setState({validationErrorMessage: null})
          return true;
        }
    }
    
    render() {
        const { validationErrorMessage } = this.state;
        const validationErrorSummary = ( validationErrorMessage &&
          <Alert variant='danger'>
            {validationErrorMessage}
          </Alert>
        );
        return (
            <div className="card card-body">
                <div className="mb-2">        
                    <span className="h4 my-auto"><i className="fa fa-file-text-o fa-lg"></i>Add Product List</span>
                    <a className="float-right ml-auto" onClick={this.props.onCloseModal}>
                        <i className="fa fa-remove fa-2x mr-2 text-danger"></i>
                    </a>
                </div>
                {validationErrorSummary}
                <form onSubmit={this.onSave} className="mt-2">
                    <div className="form-group">
                        <label htmlFor="list">Product List</label>
                        <textarea className="form-control" name="list" rows="14" onChange={this.onTextChange}></textarea>
                    </div>
                    <div className="row">
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

AddProduct.propTypes = {
    app: PropTypes.object,
    onCloseModal: PropTypes.func,
    onSaveProduct: PropTypes.func
};

export default AddProduct;