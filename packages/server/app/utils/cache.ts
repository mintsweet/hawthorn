type Func = (...args: any[]) => any;

interface CacheProps {
  rs: any;
  key: string | Func;
  expire: number;
  computed: Func;
}

export default ({ rs, key, expire = 60, computed }: CacheProps) => {
  return async (...args) => {
    let rsKey: string = '';

    if (typeof key === 'function') {
      rsKey = key(...args);
    } else {
      rsKey = key;
    }

    let content = await rs.get(rsKey);

    if (content !== null) {
      try {
        return JSON.parse(content);
      } catch (err) {
        throw new Error(err);
      }
    } else {
      content = await computed.apply(null, args);
      await rs.set(rsKey, JSON.stringify(content));
      await rs.expire(rsKey, expire);
      return content;
    }
  };
};
