interface Config extends RequestInit {
  data?: object;
}

export const fetchWrap = (
  endpoint: string,
  { data, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() !== "GET") {
    config.body = JSON.stringify(data || {});
  }

  return fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config)
    .then((response) => {
      const data = response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    }).then(payload => ({ payload }));
};

export default fetchWrap;
