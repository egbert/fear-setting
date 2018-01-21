import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getTranslate } from 'react-localize-redux'
import PropTypes from 'prop-types'
import { setChallenge } from '../actions/challengeActions'
import DefineForm from '../components/forms/DefineForm'
import PageWrapper from '../components/PageWrapper'
import Logo from '../components/Logo'
import EmailSignup from '../components/EmailSignup'

class Define extends Component {
  static displayName = 'Define'
  static propTypes = {
    challenge: PropTypes.string.isRequired,
    translate: PropTypes.func.isRequired
  }
  handleUpdate = challenge => this.props.setChallenge(challenge)
  handleNext = () => this.props.history.push('/fear')
  render() {
    const { translate, challenge } = this.props
    return (
      <PageWrapper>
        <Logo translate={translate} />
        <p>How does this work?</p>
        <DefineForm
          challenge={challenge}
          translate={translate}
          handleUpdate={this.handleUpdate}
          handleNext={this.handleNext}
        />
        <EmailSignup />
      </PageWrapper>
    )
  }
}
const mapStateToProps = ({ locale, challenge }) => ({
  translate: getTranslate(locale),
  challenge: challenge.challenge
})
export default withRouter(connect(mapStateToProps, { setChallenge })(Define))
