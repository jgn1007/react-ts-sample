
const fetchWrap = (req: any) => {
  let reqUrl = process.env.BSASE_API_URL + req.url;
  const custom = req.custom || {};
  const reqObj = Object.assign({}, custom, { method: req.type });
  reqObj.headers = reqObj.headers || {};
  reqObj.headers.Accept = 'application/json';
  reqObj.headers['Content-Type'] = 'application/json';

  if (req.type === 'POST') {
    reqObj.body = JSON.stringify(req.data);
  }

  return fetch(reqUrl, reqObj)
    .then(response => {
      const json = response.json();
      if (!response.ok) {
        switch (response.status) {
          case 400: throw Error('BAD REQUEST');
          case 401: {
            window.location.href = "/econte/login";
            throw Error('UNAUTHORIZED');
          }
          case 500: throw Error('INTERNAL_SERVER_ERROR');
          case 502: throw Error('BAD_GATEWAY');
          case 404: throw Error('NOT_FOUND');
          default: json.then(err => {
            throw Error(err.detail);
          });
        }
      }
      return json;
    })
    .then(payload => {
      return { payload }
    })
    .catch(error => {
      return { error };
    })
};

export default fetchWrap;
