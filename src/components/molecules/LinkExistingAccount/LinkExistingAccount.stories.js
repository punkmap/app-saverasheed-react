import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import LinkExistingAccount from '.'

storiesOf('LinkExistingAccount', module).add('sign in', () => (
  <LinkExistingAccount
    method="facebook.com"
    pendingCredId="google.com"
    email="rasheed.bustamam@gmail.com"
    linkAccount={action('link!')}
  />
))
