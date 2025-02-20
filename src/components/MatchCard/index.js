import './index.css'

const MatchCard = props => {
  const {match} = props
  return (
    <li className="match-card-div">
      <div className="match-card-logo-div">
        <img
          className="match-card-logo"
          src={match.competingTeamLogo}
          alt={`competing team ${match.competingTeam}`}
        />
      </div>
      <div className="match-details">
        <p className="competing-teamname">{match.competingTeam}</p>
        <p>{match.result}</p>
        <p
          style={{color: match.matchStatus === 'Won' ? 'lightgreen' : 'red'}}
          className="won-text"
        >
          {match.matchStatus}
        </p>
      </div>
    </li>
  )
}

export default MatchCard
