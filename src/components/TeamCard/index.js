import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {team} = props

  return (
    <Link to={`/team-matches/${team.id}`}>
      <li className="teamcard">
        <img className="teamLogo" src={team.teamImageUrl} alt={team.teamName} />
        <p>{team.teamName}</p>
      </li>
    </Link>
  )
}

export default TeamCard
