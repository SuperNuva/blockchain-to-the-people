import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import { Login, Signup, AboutPage, UserHome, WatchParty, VotingBooth, PastDonutChart, CreateElection, CreateCandidate, ElectionHistory, Instructions, LandingPage, AllCommunityMembers, StepperAdmin, StepperUser} from './components'
import {me} from './store'

/**
 * COMPONENT
 * need to add a landing page component as a fallback
 */

class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {
          isLoggedIn &&
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route exact path="/" component={UserHome} />
              <Route path="/home" component={UserHome} />
              <Route path="/watch" component={WatchParty} />
              <Route path="/create-election" component={CreateElection} />
              <Route path="/create-candidate" component={CreateCandidate} />
              <Route path="/voting-booth" component={VotingBooth} />
              <Route path="/about" component={AboutPage} />
              <Route path="/history" component={ElectionHistory} />
              <Route path="/instructions" component={Instructions} />
              <Route path="/community-members" component={AllCommunityMembers} />
              <Route path="/tutorial" component={StepperUser} />
              <Route path="/adminTutorial" component={StepperAdmin} />
            </Switch>
        }
        {/* Displays our Login component as a fallback */}
        <Route path="/" component={Signup} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
