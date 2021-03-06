import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getTranslate } from 'react-localize-redux'
import PropTypes from 'prop-types'
import Title from '../components/Title'
import Subtitle from '../components/Subtitle'
import PageWrapper from '../components/PageWrapper'
import { setPreventions } from '../actions/challengeActions'
import { filterEmptyItems } from '../utils/index'
import MultiInputForm from '../components/forms/MultiInputForm'
import { handleAdd } from '../utils/index'
import paths from '../utils/paths'
import { Icon } from 'semantic-ui-react'

class Prevent extends Component {
  static displayName = 'Prevent'
  static propTypes = {
    fears: PropTypes.array.isRequired,
    translate: PropTypes.func.isRequired
  }
  state = {
    currentFear:
      (this.props.location.state && this.props.location.state.currentFear) || 0,
    preventions: this.props.fears[0].preventions
  }
  componentWillReceiveProps(nextProps) {
    const { currentFear } = this.state
    this.setState({ preventions: nextProps.fears[currentFear].preventions })
  }
  handleAdd = () => handleAdd(this, 'preventions')
  handleChange = preventions => {
    this.props.setPreventions(preventions, this.state.currentFear)
  }
  handleNext = focusFirstInput => {
    const { currentFear } = this.state
    const { fears } = this.props
    if (currentFear < fears.length - 1) {
      this.setState(prevState => ({
        currentFear: prevState.currentFear + 1,
        preventions: fears[currentFear + 1].preventions
      }))
      focusFirstInput()
    } else {
      setPreventions(filterEmptyItems(fears[currentFear].preventions))
      this.props.history.push(paths.fix)
    }
  }
  handleBack = () => {
    const { currentFear } = this.state
    const { fears } = this.props
    if (currentFear > 0) {
      this.setState(prevState => ({
        currentFear: prevState.currentFear - 1,
        preventions: fears[currentFear - 1].preventions
      }))
    } else {
      this.props.history.push(paths.fear)
    }
  }
  render() {
    const { preventions, currentFear } = this.state
    const { translate, fears } = this.props
    return (
      <PageWrapper>
        <Title>
          <Icon name="treatment" />
          {translate('prevent.title')}
        </Title>

        <Subtitle>{fears[currentFear].fear}</Subtitle>
        <Subtitle>
          {currentFear + 1} / {fears.length}
        </Subtitle>
        <MultiInputForm
          items={preventions}
          translateItem={'prevent'}
          translate={translate}
          handleChange={this.handleChange}
          handleNext={this.handleNext}
          handleBack={this.handleBack}
          handleAdd={this.handleAdd}
        />
        <Subtitle>{translate('prevent.subtitle')}</Subtitle>
      </PageWrapper>
    )
  }
}
const mapStateToProps = ({ locale, challenge }) => ({
  translate: getTranslate(locale),
  fears: challenge.fears
})

export default withRouter(connect(mapStateToProps, { setPreventions })(Prevent))
