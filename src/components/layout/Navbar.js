import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'

const Navbar = (props) => {
  const { auth } = props // destructuring auth from the store
  const displaySignInOrSignOut = auth.uid ? <SignedInLinks /> : <SignedOutLinks />
  return(
      <nav className="nav-wrapper white z-depth-0 navbar-fixed">
        <div className="container">
          <Link to='/' className="brand-logo hide-on-med-and-down black-text"> blog </Link>
          { displaySignInOrSignOut }
        </div>
      </nav>
  )
}

const mapStateToProps = (state) => {
  // console.log("nav" ,state)
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(Navbar)
