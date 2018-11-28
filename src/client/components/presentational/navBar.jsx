import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
export default class NavBar extends PureComponent {
    render() {
        return <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">{this.props.brandName}</a>
                </div>
                {this.props.children}
            </div>
        </nav>;
    }
}

NavBar.propTypes = {
    brandName: PropTypes.string,
    children: PropTypes.object
};
