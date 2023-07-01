import React from "react";
import { Container } from './styles'
import colors from "../../../theme/colors";

export const Loading = ({ active, color }) => {
  return (
    <Container
      animating={active}
      color={color || colors.primary}
      size="small"
    />
  )
}
