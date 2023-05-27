import styled from 'styled-components/native';
import colors from '../../../theme/colors';

export const Container = styled.TouchableOpacity`
  padding: 20px;
  background-color: ${colors.primary};
  border-radius: 10px;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 26px;
  line-height: 26px;
  font-weight: 500;
  color: ${colors.white};
`;

export const Description = styled.Text`
  color: ${colors.white};
  font-size: 16px;
  margin: 5px 0;
`;

