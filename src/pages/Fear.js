import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getTranslate } from 'react-localize-redux'
import PropTypes from 'prop-types'
import Title from '../components/Title'
import Subtitle from '../components/Subtitle'
import PageWrapper from '../components/PageWrapper'
import { setFears, removeFears } from '../actions/challengeActions'
import Challenge from '../components/overview/Challenge'
import MultiInputForm from '../components/forms/MultiInputForm'

class Fear extends Component {
  static displayName = 'Fear'
  static propTypes = {
    fears: PropTypes.array.isRequired,
    challenge: PropTypes.string,
    translate: PropTypes.func.isRequired
  }
  state = {
    fears: this.props.fears
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ fears: nextProps.fears })
  }
  handleAdd = () => {
    this.setState(prevState => ({ fears: [...prevState.fears].concat('') }))
  }
  handleChange = fears => this.props.setFears(fears)
  handleRemove = index => this.props.removeFears([index])
  navigate = location => {
    const { fears } = this.state
    const { history, removeFears } = this.props

    const emptyFears = fears.reduce((removeList, fear, index) => {
      fear === '' && removeList.push(index)
      return removeList
    }, [])

    // if all items are empty it keeps the last item
    emptyFears.length !== fears.length && removeFears(emptyFears)
    history.push(location)
  }
  handleNext = () => this.navigate('/prevent')
  handleBack = () => this.navigate('/')
  render() {
    const { fears } = this.state
    const { translate, challenge } = this.props
    return (
      <PageWrapper>
        <Challenge challenge={challenge} translate={translate} />
        <Title>{translate('fear.title')}</Title>
        <Subtitle>{translate('fear.subtitle')}</Subtitle>
        <MultiInputForm
          items={fears}
          translateItem={'fear'}
          translate={translate}
          handleChange={this.handleChange}
          handleRemove={this.handleRemove}
          handleNext={this.handleNext}
          handleBack={this.handleBack}
          handleAdd={this.handleAdd}
        />
      </PageWrapper>
    )
  }
}
const mapStateToProps = ({ locale, challenge }) => ({
  translate: getTranslate(locale),
  fears: challenge.fears.map(fear => fear.fear),
  challenge: challenge.challenge
})

export default withRouter(
  connect(mapStateToProps, { setFears, removeFears })(Fear)
)
