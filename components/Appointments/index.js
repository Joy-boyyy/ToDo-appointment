// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuid} from 'uuid'
import AppontmentItemComponent from '../AppointmentItem'
import './index.css'

const dummyData = [
  {
    id: 1,
    title: 'I am first',
    date: format(new Date(), 'dd MMMM yyyy, EEEE'),
    isTrue: false,
  },
]

class Appointments extends Component {
  state = {titleTxt: '', dateTxt: '', arrayData: dummyData, starredCheck: false}

  form = () => {
    const {titleTxt, dateTxt} = this.state
    return (
      <form onSubmit={this.didSubmit}>
        <h1>Add Appointment</h1>
        <label htmlFor="inputTitle">Title</label>
        <br />
        <input
          value={titleTxt}
          id="inputTitle"
          type="text"
          placeholder="Title"
          onChange={this.typedInput}
        />
        <br />
        <br />
        <label htmlFor="DateId">Date</label>
        <br />
        <input
          value={dateTxt}
          id="DateId"
          type="date"
          placeholder="Title"
          onChange={this.gotDate}
        />
        <br />
        <br />
        <button type="submit">Add</button>
      </form>
    )
  }

  didSubmit = event => {
    event.preventDefault()
    const {titleTxt, dateTxt} = this.state

    const emptyObjStructure = {
      id: uuid(),
      title: titleTxt,
      date: format(new Date(dateTxt), 'dd MMMM yyyy, EEEE'),
      isTrue: false,
    }

    this.setState(prevData => ({
      arrayData: [...prevData.arrayData, emptyObjStructure],
      titleTxt: '',
      dateTxt: '',
    }))
  }

  typedInput = event => {
    this.setState({titleTxt: event.target.value})
  }

  gotDate = event => {
    this.setState({dateTxt: event.target.value})
  }

  starIdFun = ID => {
    this.setState(prevData => ({
      arrayData: prevData.arrayData.map(mapProps => {
        if (mapProps.id === ID) {
          return {...mapProps, isTrue: !mapProps.isTrue}
        }
        return mapProps
      }),
    }))
  }

  starredFetch = () => {
    const {starredCheck} = this.state
    this.setState({starredCheck: !starredCheck})
  }

  gettingFullAndFilterArr = () => {
    const {arrayData, starredCheck} = this.state

    if (starredCheck) {
      const arrDataNew = arrayData.filter(mapProps => mapProps.isTrue === true)
      return arrDataNew
    }

    return arrayData
  }

  render() {
    const receivedArray = this.gettingFullAndFilterArr()
    console.log(receivedArray)

    return (
      <div className="mainDiv">
        <div className="childDiv">
          <div className="subChild_div">
            <div className="form_div">{this.form()}</div>
            <div className="img_div">
              <img
                className="imgClMain"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr />

          <div className="appointmentsMainDiv">
            <div className="appointmentsHeadingDiv">
              <h1>Appointments</h1>
              <button
                type="button"
                className="starredBtn"
                onClick={this.starredFetch}
              >
                Starred
              </button>
            </div>

            <ul className="ulCl">
              {receivedArray.map(mapProp => (
                <AppontmentItemComponent
                  key={mapProp.id}
                  fullData={mapProp}
                  starIdFun={this.starIdFun}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
