import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { PriceProps } from './types';

export const Price = (props: PriceProps & NumericFormatProps) => {
  const {
    value,
    displayType = 'text',
    decimalScale = 2,
    thousandSeperator = '.',
    decimalSeperator = ',',
    currency,
    fixedDecimalScale = true,
    ...rest
  } = props;

  const price = value?.toString().replace('.', ',');

  return (
    <NumericFormat
      value={price}
      displayType={displayType}
      decimalSeparator={decimalSeperator}
      decimalScale={decimalScale}
      thousandSeparator={thousandSeperator}
      fixedDecimalScale={fixedDecimalScale}
      prefix={currency}
      {...rest}
    />
  );
};
