import React from "react";
import { Container } from './styles'
import colors from "../../../theme/colors";

export const Loading = ({ active }) => {
  return (
    <Container
      animating={active}
      color={colors.primary}
      size="large"
    />
  )
}
