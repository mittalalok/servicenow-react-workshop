import React from 'react';
import PropTypes from 'prop-types';

const NamedObjectType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
});

class TagList extends React.PureComponent {
  static defaultProps = {
    data: [],
    emptyText: 'Empty'
  };
  static propTypes = {
    data: PropTypes.arrayOf(NamedObjectType).isRequired,
    onClick: PropTypes.func.isRequired,
    emptyText: PropTypes.string
  }
  constructor(props) {
    super(props);
  }

  handleRemove(id) {
    let remaining = this.props.data.filter((d) => d.id !== id);
    let removed = this.props.data.find((d) => d.id === id);
    this.props.onClick(removed, remaining);
  }

  render() {
    let innerView = this.props.data.length > 0 ?
      this.props.data.map((d) => <li className="tag" key={d.id}>
        <span>{d.name}</span>
        <a href="javascript:void(0)" onClick={() => this.handleRemove(d.id)}>x</a>
      </li>) :
      <li className='empty'>{this.props.emptyText}</li>;
    return <div className="tag-list-container">
      <ul className="tag-list">
        {innerView}
      </ul>
    </div>;
  }
}

export default TagList;
