const React = require('react');
import PlayerInput from './PlayerInput';
const Link = require('react-router-dom').Link;
const PlayerPreview = require('./PlayerPreview');

class Battle extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(id, username){
    this.setState(() => {
      let newState = {};
      newState[id + 'Name'] = username;
      newState[id + 'Image'] = "https://github.com/" + username + ".png/?size=200";
      return newState;
    });
  }

  handleReset(id){
    this.setState(() => {
      let newState = {};
      newState[id + 'Name'] = '';
      newState[id + 'Image'] = null;
      return newState;
    });
  }

  render(){
    let {playerOneImage, playerTwoImage, playerOneName, playerTwoName} = this.state;
    let match = this.props.match;

    return (
      <div>
        <div className="row">
          {!playerOneName && 
            <PlayerInput 
              id="playerOne"
              label='Player One'
              onSubmit={this.handleSubmit}
          />}

         
          {playerOneImage !== null &&
            <PlayerPreview
              avatar={playerOneImage}
              username={playerOneName}>
                <button
                  className='reset'
                  onClick={this.handleReset.bind(this, 'playerOne')}>
                    Reset
                </button>
            </PlayerPreview>}


          {!playerTwoName && 
            <PlayerInput 
              id="playerTwo"
              label="Player Two"
              onSubmit={this.handleSubmit}
            />}

            {playerTwoImage !== null &&
            <PlayerPreview
              avatar={playerTwoImage}
              username={playerTwoName}>
                <button
                  className='reset'
                  onClick={this.handleReset.bind(this, 'playerTwo')}>
                    Reset
                </button>
            </PlayerPreview>}
        </div>
        {playerOneImage && playerTwoImage && 
          <Link
            className='button'
            to={{
              pathname: match.url + '/results',
              search: `?playerOneName=` + playerOneName + '&playerTwoName=' + playerTwoName
            }}
          >
            Battle
          </Link>
        }
      </div>
    )
  }
}

module.exports = Battle;