/** @format */

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => <p className='text-center mt-8 text-red-500'>Error: {message}</p>;

export default ErrorMessage;
