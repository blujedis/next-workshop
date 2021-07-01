
import ErrorPage, { IErrorProps } from './_error';

export default function NotFound(props: { message?: string }) {
  const err = new Error(props.message || 'Page Not Found') as IErrorProps;
  err.statusCode = 404;
  return <ErrorPage {...props} />;
}