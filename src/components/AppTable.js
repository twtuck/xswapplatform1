import PropTypes from 'prop-types';
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faGifts, faMoneyCheck } from "@fortawesome/free-solid-svg-icons";

const AppTable = (props) => {
    const apps = props.apps;
    const filter = props.filter;
    if (apps) {
        const appRows = apps.map(app => {
            let classes = `small ${!!app.isNew ? 'table-success' : ''}`;
            let isShow = true;
            if (filter && filter != '') {
                isShow = app.appName.toLowerCase().includes(filter.toLowerCase());
            }
            console.log(app + ":" + isShow);
            if (isShow) {
                return (
                    <tr key={app.appId.toString()} className={classes} onClick={(event) => props.onOpenAppModal(event, app)}>
                        <td className="align-middle first-column" onclick="event.stopImmediatePropagation();">
                            <div className="d-flex flex-row">
                                <a data-toggle="tooltip" data-placement="top" title="Delete App" className="p-2" 
                                        onClick={() => props.onDeleteApp(app.appName)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </a>
                                <a data-toggle="tooltip" data-placement="top" title="Add Product" className="p-2" 
                                        onClick={() => props.onOpenAddProductModal(app.appName)}>
                                    <FontAwesomeIcon icon={faGifts} />
                                </a>
                                <a data-toggle="tooltip" data-placement="top" title="Add Template" className="p-2" 
                                        onClick={() => props.onOpenAddTemplateModal(app.appName)}>
                                    <FontAwesomeIcon icon={faMoneyCheck} />
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
            }
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
    onOpenAddProductModal: PropTypes.func,
    onOpenAddTemplateModal: PropTypes.func,
    onOpenAppModal: PropTypes.func
};

export default AppTable;