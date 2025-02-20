import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {teams: '', isLoading: true}

  componentDidMount() {
    this.fetchdata()
  }

  dashboard = teams => (
    <div className="ipl">
      <div className="flexRowHome">
        <img
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
          alt="ipl logo"
        />
        <h1>IPL Dashboard</h1>
      </div>
      <ul className="teams-list">
        {teams.map(team => (
          <TeamCard team={team} key={team.id} />
        ))}
      </ul>
    </div>
  )

  toCamelCase = team => ({
    id: team.id,
    teamName: team.name,
    teamImageUrl: team.team_image_url,
  })

  fetchdata = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const {teams} = await response.json()
    const teamList = teams.map(team => this.toCamelCase(team))
    console.log(teamList)
    this.setState({
      teams: teamList,
      isLoading: false,
    })
  }

  render() {
    const {isLoading, teams} = this.state
    const loader = (
      // testid for testcases
      <div data-testid="loader" className="ipl">
        <Loader type="Oval" color="white" height={50} width={50} />
      </div>
    )

    return isLoading ? loader : this.dashboard(teams)
  }
}
export default Home
