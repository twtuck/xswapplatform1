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
                            <input type="text" className="form-control" name="appName" disable value={app.appName}></input>
                        </div>
                        <div className="col-6">
                            <label>Application Id</label>
                            <input type="text" className="form-control" name="appId" disable value={app.appId}></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-6">
                            <label>Company</label>
                            <input type="text" className="form-control" name="company" disable value={app.appInfo.company}></input>
                        </div>
                        <div className="col-6">
                            <label>Application Client Id</label>
                            <input type="text" className="form-control" name="appClientId" disable value={app.appSetup.appClientId}></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-6">
                            <label>Sign In Redirect URI</label>
                            <input type="text" className="form-control" name="signInRedirectURI" disable value={app.appSetup.signInRedirectURI}></input>
                        </div>
                        <div className="col-6">
                            <label>Sign Out Redirect URI</label>
                            <input type="text" className="form-control" name="signOutRedirectURI" disable value={app.appSetup.signOutRedirectURI}></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-6">
                            <label>User Pool Id</label>
                            <input type="text" className="form-control" name="userPoolId" disable value={app.appSetup.userPoolId}></input>
                        </div>
                        <div className="col-6">
                            <label>Identity Pool Id</label>
                            <input type="text" className="form-control" name="identityPoolId" disable value={app.appSetup.identityPoolId}></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-6">
                            <label>Region</label>
                            <input type="text" className="form-control" name="region" disable value={app.appSetup.region}></input>
                        </div>
                        <div className="col-6">
                            <label>Web Domain</label>
                            <input type="text" className="form-control" name="webDomain" disable value={app.appSetup.webDomain}></input>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Application Description</label>
                        <textarea className="form-control" name="description" rows="3" disable value={app.appInfo.description}></textarea>
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
appSetup:
region: "ap-southeast-1"
webDomain: "xswap-a5-dev-368593173631.auth.ap-southeast-1.amazoncognito.com"
ViewApp.propTypes = {
    app: PropTypes.object,
    onCloseModal: PropTypes.func
};

export default ViewApp;