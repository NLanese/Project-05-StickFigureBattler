import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        {this.state}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { state: state }
}

const mapDispatchToProps = (dispatch) => {
  return {
    something: () => dispatch({ type: ""})
  }
}


export default App;
