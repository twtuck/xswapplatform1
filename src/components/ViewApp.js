import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';


class ViewApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            app: props.app
        };
    }

    render() {

        return (
            <div className="card card-body">
                <div className="mb-2">        
                    <span className="h4 my-auto"><i className="fa fa-file-text-o fa-lg"></i> Edit App</span>
                    <a className="float-right ml-auto" onClick={this.props.onCloseModal}>
                        <i className="fa fa-remove mr-2 fa-2x text-danger"></i>
                    </a>
                </div>
                <form className="mt-2">
                    <div className="form-group row">
                        <div className="col-6">
                            <label>Application Name</label>
                            <label>{app.appName}</label>
                        </div>
                        <div className="col-6">
                            <label>Facebook Client Id</label>
                            <label>{app.appId}</label>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-6">
                            <label>Company</label>
                            <label>{app.appInfo.company}</label>
                        </div>
                        <div className="col-6">
                            <label>Facebook Client Secret</label>
                            <label>{app.appSetup.appClientId}</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Application Description</label>
                            <label>{app.appInfo.description}</label>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-4 col-md-3 col-xl-2">
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