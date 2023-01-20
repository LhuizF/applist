import styled from 'styled-components/native';
import colors from '../../../theme/colors';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const Content = styled.View`
  height: 400px;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${colors.white};
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
  color: ${colors.black};
`;

export const Logo = styled.View`
  width: 200px;
  height: 200px;
  background-color: ${colors.gray};
  border-radius: 20px;
  margin-bottom: 60px;
`;

