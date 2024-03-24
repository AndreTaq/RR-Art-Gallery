import './App.css';
// import { useState, useEffect } from 'react';
import { useSelector, useDispatch, connect} from 'react-redux'
import { fetchData, clearData, inputId, incrementTd, decrementTd } from './features/dataSlice'
import { useEffect } from 'react';


function App(props) {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.data)

  const renderImg = () => {
    if (data.apiData) {
      return <img style={{'width': '100vw'}} src={data.apiData.primaryImage} alt={data.apiData.title} />
    } else {
      return <p> No image </p>
    }
  }

  useEffect(() => {
    dispatch(fetchData())
  }, [props.objectId, dispatch])

  return (
    <div className="App">
    <div>
      <h1> Welcome to our Gallery site!!</h1>
      <button onClick={() => dispatch(fetchData())}>Thunk</button>
      <button onClick={() => dispatch(clearData())}>Clear</button>
      <button onClick={() => dispatch(incrementTd())}>Next</button>
      <button onClick={() => dispatch(decrementTd())}>Back</button>
      <div>
        <input value={ data.objectId } onChange={(e) => {dispatch(inputId(Number(e.target.value)))}} />
        <div>
          {data.objectId}
          {renderImg()}
        </div>
      </div>
    </div>
    </div>
  )
}


const mapStateToProps = (state, ownProps) => ({
  objectId: state.data.objectId
});

export default connect(mapStateToProps)(App)