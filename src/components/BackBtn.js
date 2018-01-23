import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'semantic-ui-react'

export default function BackBtn({ onClick, translate }) {
  return (
    <Button onClick={onClick} type="button">
      <Icon name="arrow left" />
      {translate('button.back')}
    </Button>
  )
}

BackBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired
}
