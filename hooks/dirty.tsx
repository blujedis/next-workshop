
import { useEffect } from 'react';
import useRefState from './refstate';
// Shouldn't really be using this here
// Need to create solution/replacement for "Prompt".
import { Prompt as PromptBase, PromptProps } from 'react-router-dom';

// Just makes message optional.
export interface IPromptProps extends Omit<PromptProps, 'message'> {
  message?: PromptProps['message']
}

const useDirty = (initialState = false) => {

  // Window won't know about state so we use both
  // state and we use ref.
  // const [state, setState] = useState(initialState);
  // const isDirty = useRef(initialState);

  const [isDirty, setIsDirty] = useRefState(initialState);

  const hasWindow = typeof window !== 'undefined';

  useEffect(() => {

    function beforeUnload(e: Event) {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = true;
      }
    }

    window.addEventListener('beforeunload', beforeUnload);

    return () => {
      if (hasWindow)
        window.removeEventListener('beforeunload', beforeUnload);
    };

  }, [hasWindow, isDirty]);

  function Prompt(props: IPromptProps) {
    props = {
      when: isDirty,
      message: (location) => `You have unsaved changes. Continue to ${location.pathname}`,
      ...props
    }
    return (
      <PromptBase {...props as PromptProps} />
    );
  }

  return {
    isDirty() {
      return isDirty;
    },
    setDirty(value: boolean) {
      setIsDirty(value);
    },
    Prompt
  }


};

export default useDirty;