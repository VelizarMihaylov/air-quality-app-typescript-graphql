import React from 'react'

import styled from 'styled-components'

export type SpinnerProps = {
  className?: string
}
const SpinnerComponent = styled.div`
  border: 8px solid ${({ theme }) => theme.colours.white};
  border-top: 8px solid ${({ theme }) => theme.colours.purple};
  border-radius: 50%;
  width: ${({ theme }) => theme.spacing(1.5)};
  height: ${({ theme }) => theme.spacing(1.5)};
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`
export const Spinner: React.FC<SpinnerProps> = ({
  className
}): React.ReactElement => {
  return <SpinnerComponent className={className} />
}
