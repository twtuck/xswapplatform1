import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';


class ViewApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            app: props.app
        };
    }

    render() {
        const { app } = this.state;

        return (
            <div className="card card-body">
                <div className="mb-2">        
                    <span className="h4 my-auto"><i className="fa fa-file-text-o fa-lg"></i>View Application</span>
                    <a className="float-right ml-auto" onClick={this.props.onCloseModal}>
                        <i className="fa fa-remove mr-2 fa-2x text-danger"></i>
                    </a>
                </div>
                <form className="mt-2">
                    <div className="form-group row">
                        <div className="col-6">
                            <label>Application Name</label>
                            <input type="text" className="form-control" name="name" value={app.appName}></input>
                        </div>
                        <div className="col-6">
                            <label>Application Id</label>
                            <input type="text" className="form-control" name="name" value={app.appId}></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-6">
                            <label>Company</label>
                            <input type="text" className="form-control" name="name" value={app.appInfo.company}></input>
                        </div>
                        <div className="col-6">
                            <label>Application Client Id</label>
                            <input type="text" className="form-control" name="name" value={app.appSetup.appClientId}></input>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Application Description</label>
                        <textarea className="form-control" name="description" rows="3" value={app.appInfo.description}></textarea>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-4 col-md-3 col-xl-2 ml-auto">
                            <Button type="button" variant="danger" onClick={this.props.onCloseModal} block>Close</Button>
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