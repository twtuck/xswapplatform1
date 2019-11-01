import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';


class ViewApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.app.id,
            title: props.app.title,
            content: props.app.content,
            tags: props.app.tags
        };
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
                    <span className="h4 my-auto"><i className="fa fa-file-text-o fa-lg"></i> Edit App</span>
                    <a className="float-right ml-auto" onClick={this.props.onCloseModal}>
                        <i className="fa fa-remove mr-2 fa-2x text-danger"></i>
                    </a>
                </div>
                {validationErrorSummary}
                <form className="mt-2">
                    <div className="form-group">
                        <label htmlFor="title">Application Name</label>
                        <input type="text" className="form-control" name="title" autoFocus onChange={this.onTitleChange} value={this.state.title}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Application Description</label>
                        <textarea className="form-control" name="content" rows="3" onChange={this.onContentChange} value={this.state.content}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="tags">Product</label>
                        <input type="text" className="form-control" name="tags" onChange={this.onTagsChange} value={this.state.tags.join(',')} />
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-4 col-md-3 col-xl-2 ml-auto">
                            <button type="submit" className="btn btn-success btn-block">
                                <i className="fa fa-save mr-2"></i>Save
                            </button>
                        </div>
                        <div className="col-sm-4 col-md-3 col-xl-2">
                            <button className="btn btn-danger btn-block mt-2 mt-sm-0"
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

ViewApp.propTypes = {
    app: PropTypes.object,
    onCloseModal: PropTypes.func
};

export default ViewApp;