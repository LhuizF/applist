import styled from "styled-components/native";
import colors from "../../../theme/colors";

export const Container = styled.View.attrs({
  elevation: 5,
  shadowOpacity: 0.5,
})`
  position: absolute;
  background-color: ${colors.primary};
  right: 20px;
  top: 40px;
  padding: 10px;
  border-radius: 5px;
  z-index: 1;
`;
