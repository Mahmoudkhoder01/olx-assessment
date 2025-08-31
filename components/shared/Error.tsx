import TextResponsive from './TextResponsive';

const Error = ({ error }: { error: string }) => {
  return (
    <TextResponsive
      fontStyle='regular'
      fontSize={16}
      className='text-red-500 ml-1 mt-1'
    >
      {error}
    </TextResponsive>
  );
};

export default Error;
