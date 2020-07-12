import React from 'react';
import { connect } from 'react-redux'
import './RegistrationInfoBar.css'

const RegistrationInfoBar = ({ className, isClicked, onClick, event_registration_type_id, event_registration_type_title, event_registration_type_price, registrationState, ...props }) => {
    const [isChecked, setIsChecked] = React.useState(false)

    const handleClick = () => {
        onClick()
        setIsChecked(true)
    }

    React.useEffect(() => {
        !isClicked && setIsChecked(false)
    },[isClicked])

    return (
        <div
            key={event_registration_type_id}
            onClick={handleClick}
            onMouseEnter={() => !isClicked && setIsChecked(true)}
            onMouseLeave={() => !isClicked && setIsChecked(false)}
            className={`${className} cursor-pointer w-full flex justify-between border border-solid border-black p-4 mb-2 ${isClicked ? "registrationInfoBar-clicked" : "registrationInfoBar-root"}`}>
            <div className="flex items-center">
                <input checked={isChecked} readOnly className="mr-2" type="checkbox" id={event_registration_type_id} name={event_registration_type_id} />
                <label className="cursor-pointer" htmlFor={event_registration_type_id}>{event_registration_type_title}</label>
            </div>
            <span>{registrationState.currencySymbol}{event_registration_type_price}</span>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state
    }
}

export default connect(mapStateToProps, undefined)(RegistrationInfoBar)