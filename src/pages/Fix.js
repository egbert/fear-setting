import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getTranslate } from 'react-localize-redux'
import PropTypes from 'prop-types'
import Title from '../components/Title'
import Subtitle from '../components/Subtitle'
import PageWrapper from '../components/PageWrapper'
import { setFixes } from '../actions/challengeActions'
import MultiInputForm from '../components/forms/MultiInputForm'

class Fix extends Component {
  static propTypes = {
    fears: PropTypes.array.isRequired,
    translate: PropTypes.func.isRequired
  }
  state = {
    currentFear: 0,
    fixes: this.props.fears[0].fixes
  }
  componentWillReceiveProps(nextProps) {
    const { currentFear } = this.state
    this.setState({ fixes: nextProps.fears[currentFear].fixes })
  }
  handleAdd = () => {
    this.setState(prevState => ({
      fixes: [...prevState.fixes].concat('')
    }))
  }
  handleChange = fixes => {
    this.props.setFixes(fixes, this.state.currentFear)
  }
  // submitNotEmptyPreventions = () => {
  //   const { fears, setFixes } = this.props
  //   fears.forEach((fear, index) => {
  //     const notEmptyPreventions = fear.fixes.filter(
  //       prevention => prevention !== ''
  //     )
  //     setFixes(notEmptyPreventions, index)
  //   })
  // }
  handleNext = () => {
    const { currentFear } = this.state
    const { fears } = this.props
    if (currentFear < fears.length - 1) {
      this.setState(prevState => ({
        currentFear: prevState.currentFear + 1,
        fixes: fears[currentFear + 1].fixes
      }))
    } else {
      this.props.history.push('/benefit')
    }
  }
  handleBack = () => {
    const { currentFear } = this.state
    const { fears } = this.props
    if (currentFear > 0) {
      this.setState(prevState => ({
        currentFear: prevState.currentFear - 1,
        fixes: fears[currentFear - 1].fixes
      }))
    } else {
      this.props.history.push('/prevent', { currentFear: 2 })
    }
  }
  render() {
    const { fixes, currentFear } = this.state
    const { translate, fears } = this.props
    return (
      <PageWrapper>
        <Title>{translate('fix.title')}</Title>
        <Subtitle>{translate('fix.subtitle')}</Subtitle>
        <Subtitle>{fears[currentFear].fear}</Subtitle>
        <Subtitle>
          {currentFear + 1} / {fears.length}
        </Subtitle>
        <MultiInputForm
          items={fixes}
          translateItem={'fix'}
          translate={translate}
          handleChange={this.handleChange}
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
  fears: challenge.fears
})

export default withRouter(connect(mapStateToProps, { setFixes })(Fix))