import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MatchCard from '../MatchCard'
import LatestMatch from '../LatestMatch'
import './index.css'

class TeamMatches extends Component {
  state = {
    isLoading: true,
    teamBannerUrl: '',
    latestMatch: {},
    recentMatches: [],
  }

  matchCamelCase = match => ({
    competingTeam: match.competing_team,
    competingTeamLogo: match.competing_team_logo,
    result: match.result,
    matchStatus: match.match_status,
    date: match.date,
    firstInnings: match.first_innings,
    id: match.id,
    secondInnings: match.second_innings,
    manOfTheMatch: match.man_of_the_match,
    umpires: match.umpires,
    venue: match.venue,
  })

  updateState = (teamBannerUrl, recentMatchesDetails, latestmatchDetails) => {
    const latestMatch = this.matchCamelCase(latestmatchDetails)
    const recentMatches = recentMatchesDetails.map(match =>
      this.matchCamelCase(match),
    )
    this.setState({teamBannerUrl, latestMatch, recentMatches, isLoading: false})
  }

  extractData = teamData => {
    const teamBannerUrl = teamData.team_banner_url
    const recentMatchesDetails = teamData.recent_matches
    const latestmatchDetails = teamData.latest_match_details
    this.updateState(teamBannerUrl, recentMatchesDetails, latestmatchDetails)
  }

  fetchData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    console.log(data)
    this.extractData(data)
  }

  componentDidMount = () => {
    this.fetchData()
  }

  teamMatches = () => {
    const {teamBannerUrl, latestMatch, recentMatches} = this.state
    console.log(teamBannerUrl, recentMatches, latestMatch)
    return (
      <div className="teambg">
        <img src={teamBannerUrl} alt="team banner" />
        <LatestMatch latestMatch={latestMatch} />
        <div>
          <ul>
            {recentMatches.map(match => (
              <MatchCard match={match} key={match.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    const loader = (
      <div data-testid="loader" className="ipl">
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      </div>
    )
    return isLoading ? loader : this.teamMatches()
  }
}

export default TeamMatches
