import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';
import React from 'react';

const AppTable = (props) => {
    const apps = props.apps;
    console.log(props.apps)

    const appRows = apps.map(app => {

        let classes = `small ${!!app.isNew ? 'table-success' : ''}`;
        
    console.log(props)
        return (
            <tr key={app.id.toString()} className={classes}>
                <td className="align-middle" style={{width: '80px'}}>
                    <div className="d-flex flex-row">
                        <a data-toggle="tooltip" data-placement="top" title="Edit App" className="p-2" onClick={() => props.onOpenEditAppModal(app.id)}>
                            <i className="fa fa-pencil fa-lg text-primary"></i>
                        </a>
                        <a data-toggle="tooltip" data-placement="top" title="Delete App" className="p-2" onClick={() => props.onDeleteApp(app.id)}>
                            <i className="fa fa-trash fa-lg text-danger"></i>
                        </a>
                    </div>                
                </td>
                <td className="align-middle">{app.name}</td>
                <td className="align-middle">
                    <span className="d-inline-block text-truncate" style={{maxWidth: '200px'}}>
                        {app.description}
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
                        <th className="align-middle text-center">Application Description</th>
                    </tr>
                </thead>
                <tbody>
                    {appRows}
                </tbody>
            </table>
        </div>
    );
};

AppTable.propTypes = {
    apps: PropTypes.array,
    onDeleteApp: PropTypes.func,
    onOpenEditAppModal: PropTypes.func
};

export default AppTable;