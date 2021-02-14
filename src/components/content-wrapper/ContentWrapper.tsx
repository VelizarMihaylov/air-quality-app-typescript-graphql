import React from 'react'
import styled from 'styled-components'

type ContentWrapperProps = {
  children?: React.ReactNode
}

const StyledContentWrapper = styled.div`
  margin: 0 auto;
  max-width: ${({ theme }) => theme.spacing(60)};
`

export const ContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
  return <StyledContentWrapper>{children}</StyledContentWrapper>
}
