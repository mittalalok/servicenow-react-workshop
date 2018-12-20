import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

import TextBox from './textBox';
import DropDownMenu from './dropDown';

import { dottify } from '../../../utils/string';
import KEYCODES from '../../../utils/keyCodes';

const defaultMapping = (d) => dottify(d.name);

class SearchDropDown extends React.Component {
  static propTypes = {
    textValue: PropTypes.string,
    data: PropTypes.arrayOf(Object).isRequired,
    mapping: PropTypes.func,
    onSearch: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    isSearching: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    placeholderText: PropTypes.string.isRequired
  };
  static defaultProps = {
    data: [],
    mapping: defaultMapping,
    isDisabled: false,
    placeholderText: 'Search...'
  }

  constructor(props){
    super(props);
    this.lastDirection = 'down';
    this.state = {
      textValue: props.textValue || '',
      showDropdown: false,
      hoveredIndex: 0,
    };

    this.delayedCallback = debounce((val) => {
      this.props.onSearch(val);
    }, 100);
  }

  componentDidUpdate(){
    if(this.props.textValue !== this.state.textValue && this.props.textValue) {
      this.setState({ textValue: this.props.textValue });
    }
  }

  textChangeHandler(e) {
    this.setState({
      textValue: e.target.value,
      requestingData: true
    });
    this.delayedCallback(e.target.value);
  }

  dropDownSelectionHandler(ind) {
    if (ind === -1) {
      this.setState(() => {
        return {
          showDropdown: false
        };
      });
      return;
    }

    let m = this.props.data.find((d, i) => i === ind);
    this.props.onSelect(m);
    this.setState((state, props) => {
      return {
        textValue: props.mapping(m),
        showDropdown: false
      };
    });
  }

  dropDownMouseOverHandler(i) {
    this.setState({
      hoveredIndex: i
    });
  }

  textKeyDownHandler(e) {
    e.persist();
    if (e.keyCode === KEYCODES.TAB || e.keyCode === KEYCODES.ESCAPE) {
      if (this.state.showDropdown) {
        this.setState({ showDropdown: false });
      }
      return;
    }

    if (!this.state.showDropdown) {
      this.setState({ showDropdown: true });
    }

    if(this.state.showDropdown) {
      if (e.keyCode === KEYCODES.UP) {
        if (this.state.hoveredIndex > 0) {
          this.lastDirection = 'up';
          this.setState({ hoveredIndex: this.state.hoveredIndex - 1 });
        } else {
          this.setState({ hoveredIndex: 0 });
        }
        return;
      } else if (e.keyCode === KEYCODES.DOWN) {
        if (this.state.hoveredIndex < this.props.data.length - 1) {
          this.lastDirection = 'down';
          this.setState({ hoveredIndex: this.state.hoveredIndex + 1 });
        }
        return;
      } else if (e.keyCode === KEYCODES.ENTER) {
        this.dropDownSelectionHandler(this.state.hoveredIndex);
        e.preventDefault();
        return;
      } else if (e.keyCode === KEYCODES.TAB || e.keyCode === KEYCODES.ESCAPE) {
        this.dropDownSelectionHandler(-1);
        return;
      }
    }
  }

  componentDidMount() {
    var self = this;
    this.bodyClickHandler = () => {
      self.setState({ showDropdown: false });
    };
    window.addEventListener('click', this.bodyClickHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.bodyClickHandler);
  }

  render() {
    return <div className="component-searchbox" onClick={(e) => {e.stopPropagation();}}>
      <TextBox
        isDisabled={this.props.isDisabled}
        onChange={this.textChangeHandler.bind(this)}
        onKeyDown={this.textKeyDownHandler.bind(this)}
        prefix="login-search-dropdown"
        textValue={this.state.textValue}
        placeholderText={this.props.placeholderText}
      />
      <span className="glyphicon glyphicon-search form-control-feedback"
        aria-hidden="true"></span>

      {!this.props.isDisabled && this.props.isSearching &&
        <div className="component-searchbox-dropdownlist">
          <div className="loader-container"><div className="loader"></div></div>
        </div>
      }

      {!this.props.isDisabled && this.state.showDropdown && !this.props.isSearching &&
        <div className="component-searchbox-dropdownlist">
          <DropDownMenu
            data={this.props.data}
            mapping={this.props.mapping}
            hoveredIndex={this.state.hoveredIndex}
            onMouseOver={this.dropDownMouseOverHandler.bind(this)}
            onSelect={this.dropDownSelectionHandler.bind(this)}
          />
        </div>
      }
    </div>;
  }
}



export default SearchDropDown;
