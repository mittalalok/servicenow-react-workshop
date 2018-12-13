import React from 'react';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';

const mappinFn = (d) => d.name;

const KEYCODES = {
  UP: 38,
  DOWN: 40,
  ENTER: 13,
  TAB: 9,
  ESCAPE: 27
};

function isElementInViewport (el) {
  var rect = el.getBoundingClientRect();

  var parentRect = el.parentElement.getBoundingClientRect();
  let result =  ((rect.y + rect.height) < (parentRect.y + parentRect.height))
    && (rect.y >= (parentRect.y));
  return result;
}

class SearchBox extends React.Component {
  static propTypes = {
    onKeyDown: PropTypes.func,
    onUserSelect: PropTypes.func,
    data: PropTypes.array,
    showDropdown: PropTypes.bool,
    isLoading: PropTypes.bool,
    selectedValue: PropTypes.string,
    currentHoveredUserIndex: PropTypes.number.isRequired,
    handleDropDownHover: PropTypes.func.isRequired,

  };

  constructor(props) {
    super(props);
    this.lastText = '';
    this.delayedCallback = debounce((evt) => {
      let newValue = evt.target.value;
      if(this.lastText !== newValue){
        this.lastText = newValue;
        props.onKeyDown(newValue);
      }
    }, 100);
    this.textInput = React.createRef();
    this.hoveredLi = React.createRef();
    this.lastDirection = 'down';
  }

  keyDownHandler(e) {
    e.persist();
    if (this.props.showDropdown) {
      if (e.keyCode === KEYCODES.UP) {
        if (this.props.currentHoveredUserIndex > 0) {
          this.lastDirection = 'up';
          this.props.handleDropDownHover(this.props.currentHoveredUserIndex - 1);
        }
        return;
      } else if (e.keyCode === KEYCODES.DOWN) {
        if (this.props.currentHoveredUserIndex < this.props.data.length - 1) {
          this.lastDirection = 'down';
          this.props.handleDropDownHover(this.props.currentHoveredUserIndex + 1);
        }
        return;
      } else if (e.keyCode === KEYCODES.ENTER) {
        this.props.onUserSelect(this.props.data.find((d, i) => i === this.props.currentHoveredUserIndex));
        e.preventDefault();
        return;
      } else if (e.keyCode === KEYCODES.TAB || e.keyCode === KEYCODES.ESCAPE) {
        this.props.onUserSelect(null);
        return;
      }
    }
    if (e.keyCode === KEYCODES.TAB || e.keyCode === KEYCODES.ESCAPE) {
      return;
    }

    this.delayedCallback(e);
  }

  handleDropdownClick(ind) {
    this.props.onUserSelect(this.props.data.find((d, i) => i === ind));
  }

  render() {

    if(this.props.selectedValue) {
      setTimeout(()=>{
        this.textInput.current.value = this.props.selectedValue;
      }, 10);
    }



    let dropdown = null;
    if (this.props.showDropdown) {
      if (this.props.isLoading) {
        dropdown = <div className="component-searchbox-dropdownlist">
          <div className="loader-container"><div className="loader"></div></div>
        </div>;
      } else {
        this.hoveredLi = new React.createRef();
        setTimeout(()=>{
          if (this.hoveredLi.current && !isElementInViewport(this.hoveredLi.current))
            this.hoveredLi.current.scrollIntoView(false);
        }, 5);
        dropdown = <div className="component-searchbox-dropdownlist">
          <ul>
            { this.props.data.map((d, i) => {
              return <li key={i}
                className={this.props.currentHoveredUserIndex === i ? 'active' : ''}
                onMouseOver={ () => this.props.handleDropDownHover(i) }
                ref = {this.props.currentHoveredUserIndex === i ? this.hoveredLi : null}
                onClick={ () => this.handleDropdownClick(i) }>
                <a href="javascript:void(0)" > {mappinFn(d)} </a>
              </li>;
            })
            }
          </ul>
        </div>;
      }
    }

    return (
      <div>
        <input ref={this.textInput} type="text" className="form-control" id="inputSuccess2"
          autoComplete="off" onKeyDown={this.keyDownHandler.bind(this)} defaultValue={this.props.selectedValue}/>
        <span className="glyphicon glyphicon-search form-control-feedback"
          aria-hidden="true"></span>
        {dropdown}
      </div>
    );
  }
}

export default SearchBox;
