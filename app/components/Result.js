const React = require('react');
const queryString = require('query-string');
const API = require('../utils/api');
const Link = require('react-router-dom').Link;
const PlayerPreview = require('./PlayerPreview');
const PropTypes = require('prop-types');
const Loading = require('./Loading');

function Profile (props) {
  var info = props.info;

  return (
    <PlayerPreview username={info.login} avatar={info.avatar_url}>
      <ul className='space-list-items'>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired,
}

function Player (props) {
  return (
    <div>
      <h1 className='header'>{props.label}</h1>
      <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
      <Profile info={props.profile} />
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired,
}

class Result extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }
  
  componentDidMount(){
    let players = queryString.parse(this.props.location.search)

    API.battle([players.playerOneName, players.playerTwoName])
      .then((results) => {
        if(results === null){
          this.setState(() => {
            return {
              error: 'Looks like there was error',
              loading: false
            }
          })
        }

        this.setState(() => {
          return {
            error: null,
            winner: results[0],
            loser: results[1],
            loading: false
          }
        });
      })
  }

  render(){

    let {winner, loser, error, loading} = this.state;

    if(loading === true){
      return <Loading />
    }

    if(error){
      return (
        <div>
          {error}
          <Link to='/battle'>
            Reset
          </Link>
        </div>
      )
    } 
    return (
       <div className='row'>
        <Player
          label='Winner'
          score={winner.score}
          profile={winner.profile}
        />
        <Player
          label='Loser'
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    )
  }
}

module.exports = Result;