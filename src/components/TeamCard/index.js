import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {team} = props

  return (
    <Link to={`/team-matches/${team.id}`} className="team-link">
      <li className="team-card">
        <img
          className="team-logo"
          src={team.teamImageUrl}
          alt={team.teamName}
        />
        <p>{team.teamName}</p>
      </li>
    </Link>
  )
}

export default TeamCard
