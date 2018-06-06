const React = require("react");
const PropTypes = require("prop-types");

function PlayerPreview(props){
  return(
    <div>
      <div className="column">
        <img
          className='avatar'
          src={props.avatar}
          alt={'Avatar for ' + props.username}
        />
        <h2 className="username">@{props.username}</h2>
        <button
          className='reset'
          onClick={props.onReset.bind(null, props.id)}
          >
         Reset
        </button>
      </div>
    </div>
  )
}

PlayerPreview.propTypes ={
  username: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired
}

class PlayerInput extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    let value = event.target.value;
    this.setState(() => {
      return {
        username: value
      }
    })
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.onSubmit(
      this.props.id,
      this.state.username
    );
  }

  render(){
    return(
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>{this.props.label}</label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          value={this.state.username}
          autoComplete='off'
          onChange={this.handleChange}
        />
        <button
          className='button'
          type='submit'
          disabled={!this.state.username}>
            Submit
        </button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

module.exports = {PlayerInput, PlayerPreview};