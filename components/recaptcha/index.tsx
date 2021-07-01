import { useEffect } from 'react';

export interface IRecaptcha {
  action: string;
  onSuccess: (token?: any) => void;
  onError: (err?: Error) => void;
}

const GOOGLE_RECAPTCHA_CLIENT = process.env.GOOGLE_RECAPTCHA_CLIENT;

const Recaptcha = ({ action, onSuccess, onError }: IRecaptcha) => {

  useEffect(() => {

    const handleLoaded = () => {
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(GOOGLE_RECAPTCHA_CLIENT, { action })
          .then(onSuccess)
          .catch(onError);
      });
    };

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${GOOGLE_RECAPTCHA_CLIENT}`;
    script.addEventListener('load', handleLoaded);
    document.body.appendChild(script);

  }, [action, onSuccess, onError]);

  return (
    <div
      className="g-recaptcha"
      data-sitekey={GOOGLE_RECAPTCHA_CLIENT}
      data-size="invisible"
    >
    </div>
  );


};

export default Recaptcha;