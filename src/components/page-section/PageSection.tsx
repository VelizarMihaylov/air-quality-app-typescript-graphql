import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

import { ContentWrapper } from 'components/content-wrapper'

type PageSectionProps = {
  children?: React.ReactNode
}

const StyledPageSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing(1.5)};
`

export const PageSection: React.FC<PageSectionProps> = ({ children }) => {
  return (
    <StyledPageSection>
      <ContentWrapper>{children}</ContentWrapper>
    </StyledPageSection>
  )
}

PageSection.propTypes = {
  children: PropTypes.node
}
