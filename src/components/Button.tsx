import React from 'react';
import SubButton from './SubButton';

interface State {
  error: any,
  clicks: number;
  isLoaded: boolean,
  items: any[]
}

class Button extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { clicks: 0, isLoaded: false, items: [], error: null };
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate({ }, prevState: any) {
    if (this.state.clicks !== prevState.clicks) {
      if (this.state.clicks == 3 || this.state.clicks == 5) {
        this.fetchData()
      }
    }
  }

  fetchData = () => {
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
        Object.assign(res_data, this.state.items);
        res_data.push({ "origin": payload.origin, "url": payload.url })
        this.setState({
          isLoaded: true,
          items: res_data
        })
      }, error => {
        this.setState({
          isLoaded: true,
          error: error
        });
      });
  }

  incrementItem = () => {
    this.setState(function (state) {
      return { clicks: state.clicks + 1 }
    });
  }

  render() {
    var { error, items, isLoaded } = this.state;
    console.log(items);
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>...Loading</div>;
    } else {
      return (
        <div>
          <button onClick={this.incrementItem}>Button {this.state.clicks}</button>
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
          <SubButton onClick={this.incrementItem.bind(this)} clicks={this.state.clicks} />
        </div>
      );
    }
  }
}

export default Button;
