import styled from 'styled-components/native';
import { SafeAreaView } from "react-native-safe-area-context";
import colors from '../../../theme/colors';

export const MainContainer = styled(SafeAreaView)`
  background-color: ${props => props.color ? props.color : colors.white};
  //padding: 10px;
  width: 100%;
  height: 100%;
  align-items: center;
`;
