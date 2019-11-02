import React, { Component } from 'react';
import Modal from 'react-modal';
import AddApp from './AddApp';
import ViewApp from './ViewApp';
import AppTable from './AppTable';
import ControlPanel from './ControlPanel';
import { trackPromise } from 'react-promise-tracker';
import { withOAuth } from 'aws-amplify-react';
import AddProduct from './AddProduct';
import AddTemplate from './AddTemplate';
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
        this.handleOnDeleteApp = this.handleOnDeleteApp.bind(this);
        this.handleOnFindApps = this.handleOnFindApps.bind(this);
        this.handleOnAddProduct = this.handleOnAddProduct.bind(this);
        this.handleOnAddTemplate = this.handleOnAddTemplate.bind(this);
        
        this.handleOpenAddAppModal = this.handleOpenAddAppModal.bind(this);
        this.handleOnCloseAddAppModal = this.handleOnCloseAddAppModal.bind(this);

        this.handleOpenViewAppModal = this.handleOpenViewAppModal.bind(this);
        this.handleOnCloseViewAppModal = this.handleOnCloseViewAppModal.bind(this);

        this.handleOpenAddProductModal = this.handleOpenAddProductModal.bind(this);
        this.handleOnCloseAddProductModal = this.handleOnCloseAddProductModal.bind(this);

        this.handleOpenAddTemplateModal = this.handleOpenAddTemplateModal.bind(this);
        this.handleOnCloseAddTemplateModal = this.handleOnCloseAddTemplateModal.bind(this);
    }

    componentWillMount() {
        this.listApps();
    }

    listApps() {
        const { session } = this.props;
        trackPromise(
        AppService.listApps(session.getAccessToken().getJwtToken()).then(response => {
            this.setState({ apps: response })
        })
        .catch(error => {
            console.log(error);
            return;
        }));
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
            trackPromise(
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
                }));
        }
    }

    handleOnFindApps(name) {
        if (!name || name === '') {
            this.setState({filter: ''});
            return;
        }
        this.setState({filter: name});
    }

    handleOnAddApp(app) {
        // if (!name || name.length === 0) {
        //     throw Error('Name is required');
        // }

        // if (!description || description.length === 0) {
        //     throw Error('Description is required');
        // }

        const { session } = this.props;
        var token = session.getAccessToken().getJwtToken();

        trackPromise(
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
                return newApp;
            }));

        this.setState({ isAddAppModalOpen: false });
    }

    handleOnAddProduct(product) {
        this.setState({ isAddProductModalOpen: false });
    }

    handleOnAddTemplate(template) {
        this.setState({ isAddTemplateModalOpen: false });
    }

    handleOpenAddAppModal() {
        this.setState({isAddAppModalOpen: true});
    }

    handleOnCloseAddAppModal() {
        this.setState({isAddAppModalOpen: false});
    }

    handleOpenViewAppModal(event, app) {
        console.log('event:' + event);
        if (event.target.classList.includes('exclude')) {
            return;
        }
        this.setState({selectedApp: app});
        this.setState({isEditAppModalOpen: true});
    }

    handleOnCloseViewAppModal() {
        this.setState({isEditAppModalOpen: false});
    }

    handleOpenAddProductModal() {
        this.setState({isAddProductModalOpen: true});
    }

    handleOnCloseAddProductModal() {
        this.setState({isAddProductModalOpen: false});
    }

    handleOpenAddTemplateModal() {
        this.setState({isAddTemplateModalOpen: true});
    }

    handleOnCloseAddTemplateModal() {
        this.setState({isAddTemplateModalOpen: false});
    }

    render() {
        return (
            <div>                                
                <Modal isOpen={this.state.isAddAppModalOpen} onRequestClose={this.handleOnCloseAddAppModal} style={customStyles}>
                    <AddApp onSaveApp={this.handleOnAddApp} onCloseModal={this.handleOnCloseAddAppModal} />
                </Modal>
                <Modal isOpen={this.state.isEditAppModalOpen} onRequestClose={this.handleOnCloseViewAppModal} style={customStyles}>
                    <ViewApp onCloseModal={this.handleOnCloseViewAppModal} app={this.state.selectedApp} />
                </Modal>                  
                <Modal isOpen={this.state.isAddProductModalOpen} onRequestClose={this.handleOnCloseAddProductModal} style={customStyles}>
                    <AddProduct onSaveProduct={this.handleOnAddProduct} onCloseModal={this.handleOnCloseAddProductModal} />
                </Modal>                       
                <Modal isOpen={this.state.isAddTemplateModalOpen} onRequestClose={this.handleOnCloseAddTemplateModal} style={customStyles}>
                    <AddTemplate onSaveTemplate={this.handleOnAddTemplate} onCloseModal={this.handleOnCloseAddTemplateModal} />
                </Modal>
                <div className="mb-3">
                    <ControlPanel openAddAppModal={this.handleOpenAddAppModal} onFindApps={this.handleOnFindApps} />
                </div>     
                <AppTable apps={this.state.apps} filter={this.state.filter} onOpenAppModal={this.handleOpenViewAppModal}
                        onDeleteApp={this.handleOnDeleteApp} onOpenAddProductModal={this.handleOpenAddProductModal} 
                        onOpenAddTemplateModal={this.handleOpenAddTemplateModal}/>
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