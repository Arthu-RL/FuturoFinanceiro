import { SetURLSearchParams } from 'react-router-dom';

function handleSetSearchParams(params: Record<string, string>, setSearchParams: SetURLSearchParams) {
  setSearchParams(new URLSearchParams(params));
}

export { handleSetSearchParams };
