import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

class ControlPanel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: ''
        };

        this.onSearchTitleChanged = this.onSearchTitleChanged.bind(this);
    }

    onSearchTitleChanged(event) {
        const title = event.target.value;
        this.setState({title});
    }

    render () {
        return (
            <div>
                <div className="input-group input-group-lg">
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="button" onClick={this.props.openAddAppModal}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </span>
                    <input type="text" className="form-control" placeholder="Search for app by title ..." value={this.state.title} onChange={this.onSearchTitleChanged} />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="button" onClick={() => this.props.onFindApps(this.state.title)} >
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </span>
                </div>        
            </div>
        );
    }
}
ControlPanel.propTypes = {
    openAddAppModal: PropTypes.func,
    onFindApps: PropTypes.func
};

export default ControlPanel;