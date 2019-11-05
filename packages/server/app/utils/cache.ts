import rs from './redis';

type Func = (...args: any[]) => any;

interface CacheProps {
  key: string | Func;
  expire: number;
  computed: Func;
}

export default ({ key, expire = 60, computed }: CacheProps) => {
  return async (...args) => {
    let rsKey: string = '';

    if (typeof key === 'function') {
      rsKey = key(...args);
    } else {
      rsKey = key;
    }

    let content = await rs.getAsync(rsKey);

    if (content !== null) {
      try {
        return JSON.parse(content);
      } catch (err) {
        throw new Error(err);
      }
    } else {
      content = await computed.apply(null, args);
      await rs
        .setAsync(rsKey, JSON.stringify(content))
        .expire(rsKey, expire);
      return content;
    }
  };
};
