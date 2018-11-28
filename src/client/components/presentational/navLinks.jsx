import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
// <li className="active"><a href="#">Home <span className="sr-only">(current)</span></a></li>
// <li><a href="#">Lists</a></li>
// <li><a href="#">Dashboard</a></li>


export default class NavLinks extends PureComponent {
    onClick(name, e) {
        this.props.store.dispatch(push(`/${name.toLowerCase()}`));
        e.preventDefault();
    }
    render() {
        return <ul className="nav navbar-nav">
            {this.props.data.map((d) => <li key={d.name}><a href={`#/${d.link}`} onClick={this.onClick.bind(this, d.name)}>{d.name}</a></li>)}
        </ul>;
    }
}

NavLinks.propTypes = {
    store: PropTypes.object,
    data: PropTypes.array
};
