export const Attributes = (props) => {
  const { product } = props;
  return (
    <div className="mb-4">
      {product?.attributes?.duration && (
        <div className="text-white-300 dark:text-black-700 text-xs">
          <span className="font-bold text-white-100 dark:text-black-900">
            {product.attributes.duration.label}{' '}
          </span>
          {': '}
          <span className="">{product.attributes.duration.value}</span>
        </div>
      )}
      {product?.attributes?.os_compatibility?.value && (
        <div className="text-white-300 dark:text-black-700 text-xs">
          <span className="font-bold text-white-100 dark:text-black-900">
            {product.attributes.os_compatibility.label}
            {': '}
          </span>{' '}
          <span className="">{product.attributes.os_compatibility.value}</span>
        </div>
      )}
    </div>
  );
};
