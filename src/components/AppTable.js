import PropTypes from 'prop-types';
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const AppTable = (props) => {
    const apps = props.apps;
    console.log(props.apps)
    if (apps) {
    const appRows = apps.map(app => {

        console.log(app);
        let classes = `small ${!!app.isNew ? 'table-success' : ''}`;
        
        return (
            <tr key={app.appId.toString()} className={classes} onClick={() => props.onOpenAppModal(app)}>
                <td className="align-middle first-column">
                    <div className="d-flex flex-row">
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
                        <th className="first-column"></th>
                        <th className="align-middle">Application Name</th>
                        <th className="align-middle">Company</th>
                        <th className="align-middle">Application Description</th>
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
    onOpenAppModal: PropTypes.func
};

export default AppTable;