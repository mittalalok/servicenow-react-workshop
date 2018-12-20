import React from 'react';
import PropTypes from 'prop-types';
import { isElementInViewport } from '../../../utils/dom';

export default class DropDownMenu extends React.PureComponent {
  static propTypes = {
    mapping: PropTypes.func.isRequired,
    onMouseOver: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(Object),
    hoveredIndex: PropTypes.number.isRequired
  };

  render() {
    this.hoveredLi = new React.createRef();
    setTimeout(()=>{
      if (this.hoveredLi.current && !isElementInViewport(this.hoveredLi.current))
        this.hoveredLi.current.scrollIntoView(false);
    }, 5);

    return <ul>
      {this.props.data.map((d, i) => {
        return <li key={i}
          onMouseOver={() => this.props.onMouseOver(i)}
          onClick={() => this.props.onSelect(i)}
          ref = {this.props.hoveredIndex === i ? this.hoveredLi : null}
          className={this.props.hoveredIndex === i ? 'active' : ''}>
          <a href="javascript:void(0)"> {this.props.mapping(d)} </a>
        </li>;
      })}
    </ul>;
  }
}
