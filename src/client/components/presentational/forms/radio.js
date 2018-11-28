import PropTypes from 'prop-types';
class Radio extends Component {
  constructor(props){
    super(props);
   
  }
  
  render(){
    if(!this.props.values)
      return null;

    let this.props.values.map((item)=>{
      return <input type='radion' value={item}>{item}</input>;
    });
    return <div></div>
  }  
}

Radio.propTypes = {
  values: PropTypes.array,
};

export default Radio;