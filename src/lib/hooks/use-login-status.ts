import useSWR, {ConfigInterface} from 'swr';
import axios from 'axios';

function useLoginStatus(opts?: ConfigInterface): any {
  const {data, error, mutate} = useSWR(
    `api/users/me`,
    async (url) => {
      const res = await axios({method: 'GET', url});
      return res.data;
    },
    {
      ...opts,
      revalidateOnFocus: false,
    }
  );

  return {
    loginStatus: error
      ? ('loggedOut' as const)
      : !data
      ? ('loading' as const)
      : ('loggedIn' as const),
    user: data,
    mutate,
  };
}

export default useLoginStatus;
