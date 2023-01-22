import styled from 'styled-components/native';
import colors from '../../../theme/colors';

export const ButtonContainer = styled.TouchableOpacity`
  background-color: ${(props) => props.color || colors.white};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 6px 20px;
`;

export const Image = styled.Image`
  width: 30px;
  height: 30px;
  margin-right: 4px;
`;

export const Text = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.textColor || colors.black};
  padding: 0 10px;
`;



