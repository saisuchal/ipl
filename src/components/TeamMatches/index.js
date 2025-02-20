import {Component} from 'react'
import {PieChart, Pie, Cell, Legend} from 'recharts'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import MatchCard from '../MatchCard'
import LatestMatch from '../LatestMatch'
import './index.css'

const backgroundColors = {
  DC: ['blue', 'red'],
  RR: ['pink', 'blue'],
  KXP: ['darkred', 'silver'],
  KKR: ['purple', 'gold'],
  MI: ['blue', 'gold'],
  SH: ['orangered', 'black'],
  RCB: ['red', 'black'],
  CSK: ['yellow', 'blue'],
}

class TeamMatches extends Component {
  state = {
    isLoading: true,
    teamBannerUrl: '',
    latestMatch: {},
    recentMatches: [],
    pieChartData: [],
  }

  componentDidMount = () => {
    this.fetchData()
  }

  fetchData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    this.extractAndUpdateData(data)
  }

  extractAndUpdateData = data => {
    const teamBannerUrl = data.team_banner_url
    const recentMatchesDetails = data.recent_matches
    const latestmatchDetails = data.latest_match_details
    const latestMatch = this.matchCamelCase(latestmatchDetails)
    const recentMatches = recentMatchesDetails.map(match =>
      this.matchCamelCase(match),
    )
    const pieChartData = this.pieChartData(recentMatches)
    this.setState({
      isLoading: false,
      teamBannerUrl,
      latestMatch,
      recentMatches,
      pieChartData,
    })
  }

  pieChartData = recentMatches => {
    let wonCount = 0
    let lostCount = 0
    let drawnCount = 0

    recentMatches.forEach(eachItem => {
      if (eachItem.matchStatus === 'Won') {
        wonCount += 1
      } else if (eachItem.matchStatus === 'Lost') {
        lostCount += 1
      } else {
        drawnCount += 1
      }
    })

    const pieData = [
      {name: 'Won', value: wonCount},
      {name: 'Lost', value: lostCount},
      {name: 'Drawn', value: drawnCount},
    ]

    return pieData
  }

  matchCamelCase = match => ({
    competingTeam: match.competing_team,
    competingTeamLogo: match.competing_team_logo,
    result: match.result,
    matchStatus: match.match_status,
    matchWon: match.match_status === 'Won' ? 1 : 0,
    date: match.date,
    firstInnings: match.first_innings,
    id: match.id,
    secondInnings: match.second_innings,
    manOfTheMatch: match.man_of_the_match,
    umpires: match.umpires,
    venue: match.venue,
  })

  renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const radian = Math.PI / 180
    const x = cx + radius * Math.cos(-midAngle * radian)
    const y = cy + radius * Math.sin(-midAngle * radian)
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  teamMatches = () => {
    const {teamBannerUrl, latestMatch, recentMatches, pieChartData} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params
    const [color1, color2] = backgroundColors[id]
    console.log(color1, color2)
    return (
      <div
        className="team-bg"
        style={{backgroundImage: `linear-gradient(${color1}, ${color2})`}}
      >
        <Link to="/">
          <button type="button" className="back-button">
            Back
          </button>
        </Link>
        <div className="team-poster-div">
          <img src={teamBannerUrl} alt="team banner" className="team-poster" />
        </div>
        <LatestMatch latestMatch={latestMatch} />
        <PieChart width={500} height={300} className="pie-chart">
          <Pie
            cx="50%"
            cy="50%"
            data={pieChartData}
            innerRadius="40%"
            outerRadius="70%"
            dataKey="value"
            label={this.renderCustomizedLabel}
            labelLine={false}
          >
            <Cell name="Won" fill="green" />
            <Cell name="Lost" fill="red" />
            <Cell name="Drawn" fill="blue" />
          </Pie>
          <Legend
            iconType="square"
            layout="vertical"
            verticalAlign="middle"
            align="right"
          />
        </PieChart>
        <ul className="team-matches">
          {recentMatches.map(eachMatch => (
            <MatchCard match={eachMatch} key={eachMatch.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params
    const [color1, color2] = backgroundColors[id]
    const loader = (
      <div
        data-testid="loader"
        className="loader-container"
        style={{backgroundImage: `linear-gradient(${color1}, ${color2})`}}
      >
        <Loader type="Oval" color="white" height={50} width={50} />
      </div>
    )

    return isLoading ? loader : this.teamMatches()
  }
}

export default TeamMatches
