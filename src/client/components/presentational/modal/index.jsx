import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const CLASS_NAMES = {
  overlay: 'modal_overlay',
  content: 'modal_content',
};

const STYLES = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  content: {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    position: 'absolute',
    // top: '40px', left: '40px', right: '40px', bottom: '40px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px'
  }
};


function createHTMLElement(name, id, content) {
  let elem = document.createElement(name);
  elem.id = id;
  elem.innerHTML = content;
  return elem;
}

class Modal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.array,
  };
  static defaultProps = {
    isOpen: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      afterOpen: false,
      beforeClose: false
    };
  }


  render() {
    let modalView = <div className={CLASS_NAMES.overlay}
      style={{ ...STYLES.overlay }} >
      <div className={CLASS_NAMES.content}
        style={{ ...STYLES.content }}
        tabIndex='-1'>
        {this.props.children && this.props.children}
      </div>
    </div>;
    if (!this.node) {
      this.node = createHTMLElement('div', 'modal-container');
      document.body.appendChild(this.node);
    }
    return ReactDOM.createPortal(modalView, this.node);
  }

  componentDidMount() { if (this.props.isOpen) this.open(); }
  componentDidUpdate() {}
  componentWillUMount() {}
  open() {}
  close(){}
  focusContent(){}
  afterClose(){}
  beforeOpen(){}
}


export default Modal;
