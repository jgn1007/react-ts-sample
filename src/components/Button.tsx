import React from 'react';
import SubButton from './SubButton';

interface IState {
  error: any,
  isLoaded: boolean,
  items: any[]
}

interface IProps {
  clicks: number;
  setClicks: React.Dispatch<React.SetStateAction<number>>
}

class Button extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { isLoaded: false, items: [], error: null };
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps: IProps) {
    if (this.props.clicks !== prevProps.clicks) {
      if (this.props.clicks == 3 || this.props.clicks == 5) {
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
        this.setState(function (preState) {
          return {
            isLoaded: true,
            items: [...preState.items, { "origin": payload.origin, "url": payload.url }]
          }
        });
      }, error => {
        this.setState({
          isLoaded: true,
          error: error
        });
      });
  }

  incrementItem = () => {
    this.props.setClicks(this.props.clicks + 1);
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
          <button onClick={this.incrementItem}>Button {this.props.clicks}</button>
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
          <SubButton onClick={this.incrementItem.bind(this)} clicks={this.props.clicks} />
        </div>
      );
    }
  }
}

export default Button;
