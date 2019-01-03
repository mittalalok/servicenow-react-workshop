import React from 'react';
import Label from '../../forms/label';
import Input from '../../forms/input';
import { connect } from 'react-redux';

class SelectionDetails extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    if(!this.props.selection)
      return null;
    return <form>
      <div className='col-sm-6'>
        <Label class='col-sm-6' required={true} value='Current Status'></Label>
        <div className='col-sm-6' align='left'>
          <span>{this.props.selection.status}</span>
        </div>
      </div>
      <div className='col-sm-6'>
        <Label class='col-sm-6' required={true} value='Overall Comments'></Label>
        <Input class='form-control col-sm-6' type='textbox' placeholder='Comments' value={this.props.selection.comments} required={false} name='comments' ></Input>
      </div>
    </form>;
  }
}

const mapDispatchToProps = (dispatch) => ({

});

const mapStateToProps = (state) => ({
  selection: state.lists.selection, state: state
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectionDetails);
