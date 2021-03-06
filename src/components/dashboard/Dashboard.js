import React, { Component } from 'react'
import Notification from './Notification.js'
import ProjectList from '../projects/ProjectList'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {
  render() {
    const { projects, auth, notifications } = this.props
    if (!auth.uid) return <Redirect to='/signin' /> // redirecting signed out users to signin page
    return(
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m12 l6">
            <ProjectList projects={projects} />
          </div>
          <div className="col s12 m5 offset-m1 hide-on-med-and-down">
            <Notification notifications={notifications}/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
   console.log(state)
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  }
}

export default compose (
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'projects', orderBy: ['createdAt', 'desc'] },
    { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }
  ])
)(Dashboard)
