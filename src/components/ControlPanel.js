import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

class ControlPanel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: ''
        };

        this.onSearchNameChanged = this.onSearchNameChanged.bind(this);
    }

    onSearchNameChanged(event) {
        const name = event.target.value;
        this.setState({name});
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
                    <input type="text" className="form-control" placeholder="Search for app by name ..." value={this.state.name} onChange={this.onSearchNameChanged} />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="button" onClick={() => this.props.onFindApps(this.state.name)} >
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