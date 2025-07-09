import { Flex, FlexProps } from '../flex/flex';

type ColProps = Omit<FlexProps, 'direction'>;

export const Col = ({ align, ...rest }: ColProps) => {
  return <Flex direction='column' align={align} {...rest} />;
};
