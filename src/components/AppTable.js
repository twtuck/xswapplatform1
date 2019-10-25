import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const AppTable = (props) => {
    const apps = props.apps;
    console.log(props.apps)
    if (apps) {
    const appRows = apps.map(app => {

        console.log(app);
        let classes = `small ${!!app.isNew ? 'table-success' : ''}`;
        
        return (
            <tr key={app.appId.toString()} className={classes}>
                <td className="align-middle" style={{width: '80px'}}>
                    <div className="d-flex flex-row">
                        <a data-toggle="tooltip" data-placement="top" title="Edit App" className="p-2" onClick={() => props.onOpenEditAppModal(app.appName)}>
                            <i className="fa fa-pencil fa-lg text-primary"></i>
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </a>
                        <a data-toggle="tooltip" data-placement="top" title="Delete App" className="p-2" onClick={() => props.onDeleteApp(app.appName)}>
                            <i className="fa fa-trash fa-lg text-danger"></i>
                            <FontAwesomeIcon icon={faTrash} />
                        </a>
                    </div>                
                </td>
                <td className="align-middle">{app.appName}</td>
                <td className="align-middle">{app.appInfo.company}</td>
                <td className="align-middle">
                    <span className="d-inline-block text-truncate" style={{maxWidth: '200px'}}>
                        {app.appInfo.description}
                    </span>                
                </td>
            </tr>
        );
    });

    return (
        <div>
            <table className="table table-bordered table-striped table-hover">
                <thead>
                    <tr>
                        <th></th>
                        <th className="align-middle text-center">Application Name</th>
                        <th className="align-middle text-center">Company</th>
                        <th className="align-middle text-center">Application Description</th>
                    </tr>
                </thead>
                <tbody>
                    {appRows}
                </tbody>
            </table>
        </div>
    );
    }
};

AppTable.propTypes = {
    apps: PropTypes.array,
    onDeleteApp: PropTypes.func,
    onOpenEditAppModal: PropTypes.func
};

export default AppTable;