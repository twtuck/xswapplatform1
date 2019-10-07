import React, { Component } from 'react';
import Modal from 'react-modal';
import AddForm from './AddForm';
import EditForm from './EditForm';
import AppTable from './AppTable';
import ControlPanel from './ControlPanel';
import axios from 'axios';
import { withAuthenticator } from 'aws-amplify-react';

class AppManager extends Component {
    constructor(props) {
        super(props);
        
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
        const url = 'https://my-json-server.typicode.com/michelle-phan/fakeAPIs/apps';
        axios.get(url).then(response => {
            this.setState({ apps: response.data })
        })
            .catch(error => {
                console.log(error);
                return;
            });
    }


    handleOnDeleteApp(appId) {

        console.log('handleOnDeleteApp ' + appId);
        if (appId < 1) {
            throw Error('Cannot remove app. Invalid app id specified');
        }
        
        //const confirmation = confirm('Are you sure you wish to remove app?');

        // if (confirmation) {
            // AppService
            //     .removeApp(appId)
            //     .then(() => {
            //         AppService
            //             .listApps()
            //             .then(apps => {
            //                 this.setState({apps});
            //                 return;
            //             })
            //             .catch(error => {
            //                 console.log(error);
            //                 return;
            //             });
            //     })
            //     .catch(error => {
            //         console.log(error);
            //         return;
            //     });
        // }
    }


    handleOnFindApps(title) {
        
        if (!title || title === '') {
            this.listApps();
            return;
        }
        
        // AppService
        //     .findAppsByTitle(title)
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

        const { title, content, tags } = app;

        if (!title || title.length === 0) {
            throw Error('Title is required');
        }

        if (!content || content.length === 0) {
            throw Error('Content is required');
        }

        if (!Array.isArray(tags)) {
            throw Error('Tags must be an array');
        }

        // AppService
        //     .addApp(title, content, tags)
        //     .then(newApp => {             
        //         AppService
        //             .listApps()
        //             .then(apps => {
        //                 apps.forEach(n => n.id === newApp.id ? n.isNew = 'true' : n.isNew = undefined);                
        //                 this.setState({apps});
        //             })
        //             .catch(error => console.log(error));
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
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


    handleOpenEditAppModal(appId) {

        console.log('handleOpenEditAppModal ' + appId);
        if (!appId || appId < 1) {
            throw Error('Cannot edit app. Invalid app id specified.');
        }

        // AppService
        //     .findApp(appId)
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
        
        const { title, content, tags } = app;
        
        if (!title || title.length === 0) {
            throw Error('Title is required');
        }
        
        if (!content || content.length === 0) {
            throw Error('Content is required');
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
                <Modal isOpen={this.state.isAddAppModalOpen} onRequestClose={this.handleOnCloseAddAppModal}>
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
const signUpConfig = {
    header: 'My Customized Sign Up',
    hideAllDefaults: true,
    defaultCountryCode: '1',
    signUpFields: [
      {
        label: 'My custom email label',
        key: 'email',
        required: true,
        displayOrder: 1,
        type: 'string'
      }
    ]
  };

export default withAuthenticator(AppManager, false);