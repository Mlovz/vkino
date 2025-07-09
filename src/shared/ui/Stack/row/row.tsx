import { Flex, FlexProps } from '../flex/flex';

type RowProps = Omit<FlexProps, 'direction'>;

export const Row = (props: RowProps) => {
  return <Flex direction='row' {...props} />;
};
