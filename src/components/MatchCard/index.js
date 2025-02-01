import './index.css'

const MatchCard = props => {
  const {match} = props
  return (
    <li className="matchcard">
      <div className="matchCardDiv">
        <img
          src={match.competingTeamLogo}
          alt={`competing team ${match.competingTeam}`}
        />
        <p>{match.competingTeam}</p>
        <p>{match.result}</p>
        <p>{match.matchStatus}</p>
      </div>
    </li>
  )
}

export default MatchCard
