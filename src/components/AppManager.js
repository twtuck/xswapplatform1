import React, { Component } from 'react';
import Modal from 'react-modal';
import AddForm from './AddForm';
import EditForm from './EditForm';
import AppTable from './AppTable';
import ControlPanel from './ControlPanel';
//import axios from 'axios';
import { withOAuth } from 'aws-amplify-react';
const AppService = require('../services/app-service');

class AppManager extends Component {
    constructor(props) {
        super(props);
        const {session, signIn} = this.props;
        if (!session) {
            signIn();
        }

        this.state = {
            apps: [],
            selectedApp: null,
            isAddAppModalOpen: false,
            isEditAppModalOpen: false
        };

        
        this.handleOnAddApp = this.handleOnAddApp.bind(this);
        this.handleOnEditApp = this.handleOnEditApp.bind(this);
        this.handleOnDeleteApp = this.handleOnDeleteApp.bind(this);
        this.handleOnFindApps = this.handleOnFindApps.bind(this);
        
        this.handleOpenAddAppModal = this.handleOpenAddAppModal.bind(this);
        this.handleOnCloseAddAppModal = this.handleOnCloseAddAppModal.bind(this);

        this.handleOpenEditAppModal = this.handleOpenEditAppModal.bind(this);
        this.handleOnCloseEditAppModal = this.handleOnCloseEditAppModal.bind(this);
    }


    componentDidMount() {
        this.listApps();
    }


    listApps() {
        const { session } = this.props;
        AppService.listApps(session.getAccessToken().getJwtToken()).then(response => {
            this.setState({ apps: response })
        })
        .catch(error => {
            console.log(error);
            return;
        });
    }


    handleOnDeleteApp(appName) {
        console.log('handleOnDeleteApp ' + appName);
        if (appName < 1) {
            throw Error('Cannot remove app. Invalid app name specified');
        }
        
        const confirmation = window.confirm('Are you sure you wish to remove app?');
        if (confirmation) {
            const { session } = this.props;
            let token = session.getAccessToken().getJwtToken();
            AppService
                .removeApp(appName, token)
                .then(() => {
                    AppService
                        .listApps(token)
                        .then(apps => {
                            this.setState({apps});
                            return;
                        })
                        .catch(error => {
                            console.log(error);
                            return;
                        });
                })
                .catch(error => {
                    console.log(error);
                    return;
                });
        }
    }


    handleOnFindApps(name) {
        
        if (!name || name === '') {
            this.listApps();
            return;
        }
        
        // AppService
        //     .findAppsByName(name)
        //     .then(apps => {
        //         if (!apps) {
        //             apps = [];
        //         }
        //         this.setState({apps});
        //         return;
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         return;
        //     });
    }


    handleOnAddApp(app) {

        this.setState({ isAddAppModalOpen: false });

        const { session } = this.props;

        // if (!name || name.length === 0) {
        //     throw Error('Name is required');
        // }

        // if (!description || description.length === 0) {
        //     throw Error('Description is required');
        // }

        var token = session.getAccessToken().getJwtToken();
        AppService
            .addApp(app, token)
            .then(newApp => {             
                AppService
                    .listApps(token)
                    .then(apps => {
                        console.log('newApp.appName: ' + newApp.appName);
                        apps.forEach(n => n.appName === newApp.appName ? n.isNew = 'true' : n.isNew = undefined);                
                        this.setState({apps});
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => {
                console.log(error);
            });
    }


    handleOnCloseAddAppModal() {
        this.setState({isAddAppModalOpen: false});
    }


    handleOpenAddAppModal() {
        this.setState({isAddAppModalOpen: true});
    }


    handleOnCloseEditAppModal() {
        this.setState({isEditAppModalOpen: false});
    }


    handleOpenEditAppModal(appName) {

        console.log('handleOpenEditAppModal ' + appName);
        if (!appName || appName < 1) {
            throw Error('Cannot edit app. Invalid app id specified.');
        }

        // AppService
        //     .findApp(appName)
        //     .then(app => {
        //         this.setState({selectedApp: app});
        //         this.setState({isEditAppModalOpen: true});
        //         return;
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         return;
        //     });
    }


    handleOnEditApp(app) {
        this.setState({ isEditAppModalOpen: false });
        
        const { name, description, tags } = app;
        
        if (!name || name.length === 0) {
            throw Error('Name is required');
        }
        
        if (!description || description.length === 0) {
            throw Error('Description is required');
        }
        
        if (!Array.isArray(tags)) {
            throw Error('Tags must be an array');
        }

        // AppService
        //     .updateApp(app)
        //     .then(() => {                
        //         AppService
        //             .listApps()
        //             .then(apps => {
        //                 apps.forEach(n => n.id === app.id ? n.isNew = 'true' : n.isNew = undefined);                
        //                 this.setState({apps});
        //             })
        //             .catch(error => console.log(error));
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
    }


    render() {
        return (
            <div>                                
                <Modal isOpen={this.state.isAddAppModalOpen} onRequestClose={this.handleOnCloseAddAppModal} style={customStyles}>
                    <AddForm onSaveApp={this.handleOnAddApp} onCloseModal={this.handleOnCloseAddAppModal} />
                </Modal>
                <Modal isOpen={this.state.isEditAppModalOpen} onRequestClose={this.handleOnCloseEditAppModal}>
                    <EditForm onSaveApp={this.handleOnEditApp} onCloseModal={this.handleOnCloseEditAppModal} app={this.state.selectedApp} />
                </Modal>
                <div className="mb-3">
                    <ControlPanel openAddAppModal={this.handleOpenAddAppModal} onFindApps={this.handleOnFindApps} />
                </div>
                <AppTable apps={this.state.apps} onDeleteApp={this.handleOnDeleteApp} onOpenEditAppModal={this.handleOpenEditAppModal} />
            </div>
        );
    }
}
const customStyles = {
    content : {
      top: '80px'
    }
};

export default withOAuth(AppManager);
//export default AppManager;