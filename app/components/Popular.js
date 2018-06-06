const React = require('react');
const PropTypes = require('prop-types');
const API = require("../utils/api");
const Loading = require('./Loading');


function SelectedLanguage(props) {
  let languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']
  return(
    <ul className="languages">
        {
          languages.map((lang) => {
            return(
              <li
              style={lang === props.selectedLanguage ? {color: '#d0021b'} : null }
              onClick={props.updateLanguage.bind(null, lang)} 
              key={lang}>
              {lang}
              </li>
            )
          })
        }
      </ul>
  )
}

function RepoGrid (props) {
  return (
    <ul className='popular-list'>
      {props.repos.map(function (repo, index) {
        return (
          <li key={repo.name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={'Avatar for ' + repo.owner.login}
                />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

SelectedLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

class Popular extends React.Component {

  constructor (props){
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    }

    this.updateLanguage = this.updateLanguage.bind(this);
  };

  componentDidMount(){
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang){
    this.setState(() => {
      return{
        selectedLanguage: lang,
        repos: null
      }
    })

    API.fetchPopularRepos(lang).then(function(repos){
      this.setState(function(){
        return{
          repos: repos
        }
      })
    }.bind(this));
  }

  render() {
    return (
      <div>
        <SelectedLanguage
          selectedLanguage={this.state.selectedLanguage}
          updateLanguage={this.updateLanguage}
        />
        {!this.state.repos ? <Loading /> : <RepoGrid repos={this.state.repos} />}
      </div>
    )

  }
}

module.exports = Popular;