import React, { useState, useEffect } from 'react'
import SubButton from './SubButton';

const ButtonEffect = () => {
  const [clicks, setClicks] = useState(0)
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (clicks == 3 || clicks == 5) {
      fetchData()
    }
  }, [clicks])

  const incrementItem = () => {
    setClicks(clicks + 1)
  }
  const fetchData = () => {
    const url = "https://httpbin.org/get"; // "https://www.youmaker.com/v1/api/video/latest/home?offset=0&limit=16&total=40&lang=en&cid=6"
    fetch(url,
      {
        method: "GET",
        mode: 'cors'
      })
      .then(response => {
        const json = response.json();
        return json;
      })
      .then(payload => {
        console.log(payload);
        let res_data: any = [];
        Object.assign(res_data, items);
        res_data.push({ "origin": payload.origin, "url": payload.url })
        setIsLoaded(true);
        setItems(res_data)
      }, error => {
        setIsLoaded(true);
        setError(error)
      });
  }

  if (error) {
    return <div>Error: {error}</div>;
  } else if (!isLoaded) {
    return <div>...Loading</div>;
  } else {
    return (
      <div>
        <button onClick={incrementItem}>Button {clicks}</button>
        <table>
          <tbody>
            <tr><th>origin</th><th>url</th></tr>

            {items && items.map((item: any, no: number) => (
              <tr key={no.toString()}>
                <td>{item.origin}</td>
                <td>{item.url}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <SubButton onClick={incrementItem.bind(this)} clicks={clicks} />
      </div>
    );
  }
}

export default ButtonEffect;
