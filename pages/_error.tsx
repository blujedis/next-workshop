
import { NextPageContext } from 'next';
import Link from 'next/link';

export interface IErrorProps extends Partial<Error> {
  statusCode?: number;
  returnUrl?: string;
}

function ErrorPage(props = {} as IErrorProps) {

  props = {
    ...props,
    statusCode: 404,
    message: 'Page Not Found'
  };

  const { statusCode, message } = props;

  const returnUrl = '/';
  const code = statusCode || 404;
  const borderColor = code === 404 ? 'rgba(0, 0, 0,.3)' : 'red';

  return (
    <div className="wrapper">

      <div className={code === 404 ? 'status status-404' : 'status'}>
        <h1>{code}</h1>
        <div className="text">
          <Link href={returnUrl} passHref>
            <a>
              <h2>{message}</h2>
              <div className="return">Return Home</div>
            </a>
          </Link>
        </div>
      </div>

      <style jsx>{`

          h2 {
            margin-bottom: 0;
            padding-bottom: 0;
          }

          .return {
            position: absolute;
            top: 3.5rem;
            right: 0;
          }

          .status-404 {
            color: #807e9b !important;
          }

          .status {
            color: red;
          }

          .wrapper {
            color:#000;
            background:#fff;
            font-family:-apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI', 'Fira Sans', Avenir, 'Helvetica Neue', 'Lucida Grande', sans-serif;
            height:100vh;
            text-align:center;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            letter-spacing: unset;
          }

          .text {
            display:inline-block;
            text-align:left;
            line-height:49px;
            height:49px;
            vertical-align:middle;
            text-align: center;
            position: relative;
          }

          h1 {
            display:inline-block;
            border-right:1px solid ${borderColor};
            margin:0;
            margin-right:20px;
            padding:10px 23px 10px 0;
            font-size: 4rem;
            font-weight:500;
            vertical-align:top;
          }

          h2 {
            font-family: -apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI', 'Fira Sans', Avenir, 'Helvetica Neue', 'Lucida Grande', sans-serif;
            font-size: 2rem;
            font-weight: 300;
            line-height: 6rem;
            margin:0;
            padding:0;
          }

        `}</style>

    </div>

  );

}

// deprecated.
ErrorPage.getInitialProps = ({ err, res }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const message = res ? res.statusMessage : err ? err.message : 'Not Found';
  return { statusCode, message };
};

export default ErrorPage;
