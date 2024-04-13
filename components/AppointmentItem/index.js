// Write your code here
import './index.css'

const AppontmentItemComponent = props => {
  const {fullData, starIdFun} = props
  const {id, title, date, isTrue} = fullData

  const onlyStar =
    'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const onlyStarred =
    'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'

  const urlChange = isTrue ? onlyStarred : onlyStar

  const starBtnClicked = () => {
    starIdFun(id)
  }

  return (
    <li className="liCL">
      <div className="cardSection">
        <div className="cardCL">
          <p className="titlePara">{title}</p>
          <button type="button" className="starBtn" onClick={starBtnClicked}>
            <img className="starImgCl" src={urlChange} alt="star-img" />
          </button>
        </div>

        <p>{date}</p>
      </div>
    </li>
  )
}

export default AppontmentItemComponent
