import React from 'react';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';

const mappinFn = (d) => d.name;

const KEYCODES = {
  KEY_UP: 38,
  KEY_DOWN: 40
};


class SearchBoxDropDownList extends React.PureComponent{
  static propTypes = {
    data: PropTypes.array,
    show: PropTypes.bool,
    isLoading: PropTypes.bool,
    onKeyDown: PropTypes.func,
    onSelect: PropTypes.func,
  };

  static defaultProps = {
    onKeyDown: ()=>{},
    onSelect: ()=>{},
    data: [],
    show: false,
    isLoading: false
  };

  handleClick(ind) {
    if (this.props.onSelect) {
      this.props.onSelect(this.props.data.find((d, i) => i === ind));
    }
  }

  render() {
    let { data, show, isLoading } = this.props;
    if (!show) return null;
    if (isLoading) {
      return <div className="component-searchbox-dropdownlist">
        <div className="loader-container"><div className="loader"></div></div>
      </div>;
    }
    return (
      <div className="component-searchbox-dropdownlist">
        <ul>
          { data.map((d, i) => <li key={i} onClick={ () => this.handleClick(i) }>  {mappinFn(d)} </li>) }
        </ul>
      </div>
    );
  }
}

class SearchBox extends React.PureComponent {
  static propTypes = {
    onKeyDown: PropTypes.func,
    onUserSelect: PropTypes.func,
    data: PropTypes.array,
    showDropdown: PropTypes.bool,
    isLoading: PropTypes.bool,
    selectedValue: PropTypes.string,
  };

  static defaultProps = {
    onKeyDown: ()=>{},
    onUserSelect: () => {},
    data: [],
    showDropdown: false,
    isLoading: false,
    selectedValue: '',
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
  }

  keyDownHandler(e) {
    e.persist();
    if(e.keyCode === KEYCODES.KEY_UP || e.keyCode === KEYCODES.KEY_DOWN) {
      //TODO Handle Keyboard events like Up, Down, Tab and Enter
      return;
    }

    this.delayedCallback(e);
  }

  render() {

    if(this.props.selectedValue) {
      setTimeout(()=>{
        this.textInput.current.value = this.props.selectedValue;
      }, 10);
    }

    return (
      <div>
        <input ref={this.textInput} type="text" className="form-control" id="inputSuccess2"
          autoComplete="off" onKeyDown={this.keyDownHandler.bind(this)} defaultValue={this.props.selectedValue}/>
        <span className="glyphicon glyphicon-search form-control-feedback"
          aria-hidden="true"></span>
        <SearchBoxDropDownList data={this.props.data}
          isLoading={this.props.isLoading} show={this.props.showDropdown}
          onSelect={this.props.onUserSelect}/>
      </div>
    );
  }
}

export default SearchBox;
