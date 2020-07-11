import React from 'react';
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTools, faPlusSquare, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import FormSetup from '../../assets/registration-form-setup-information.json'
import './WorkshopView.css'

const WorkshopView = ({ addWorkshop, registrationState, history, ...props }) => {
    const [showItems, setShowItems] = React.useState(false)

    const handleAddWorkshop = (workshop) => (e) => {
        addWorkshop(workshop)
    }

    const handleShowItemsClick = () => {
        setShowItems(!showItems)
    }

    const handleRedirectSummary = () => {
        history.push('/registration-summary')
    }
    const activeRegistrationDetail = registrationState.registrationDetails[registrationState.selectedRegistrationId]
    return (
        <div className="workshop-root">
            <div className="workshop-registration-details">
                <div className="workshop-item">
                    <span>Registration Details For</span>
                    <span>AMOUNT</span>
                </div>
                <div className="workshop-item border-b border-solid border-gray-300">
                    <span className="font-bold">{activeRegistrationDetail.userInfo.firstName || ''}
                        {" "}
                        {activeRegistrationDetail.userInfo.lastName || ''}</span>
                    <span>{registrationState.currencySymbol}{activeRegistrationDetail.amount}</span>
                </div>
                {
                    showItems && Object.keys(activeRegistrationDetail.registration_type).length > 0 &&
                    <div className="workshop-item">
                        <span>{activeRegistrationDetail.registration_type.event_registration_type_title}</span>
                        <span>{registrationState.currencySymbol}{activeRegistrationDetail.registration_type.event_registration_type_price}</span>
                    </div>

                }
                {
                    showItems && activeRegistrationDetail.workshops.map((workshop, i) =>
                        <div key={i} className="workshop-item">
                            <span>{workshop.event_workshop_title}{" "}(x{workshop.count})</span>
                            <span>{registrationState.currencySymbol}{workshop.event_workshop_price * workshop.count}</span>
                        </div>
                    )
                }
                <div onClick={handleShowItemsClick} className="cursor-pointer m-auto">
                    {!showItems ? "Show" : "Hide"} items ({activeRegistrationDetail.workshops.map(w => w.count).reduce((a, b) => a + b, 0) + 1})
                </div>
            </div>
            <div className="w-full flex items-center mb-4">
                <FontAwesomeIcon className="text-blue-400 mr-2" size="lg" icon={faTools} />
                <span className="font-bold text-xl text-blue-400">Workshop</span>
            </div>
            <div className="workshop-content">
                {
                    FormSetup.workshops.map(workshop =>
                        <div key={workshop.event_workshop_id} className="w-full flex flex-col">
                            <div className="border-b border-solid border-gray-300 font-bold">{workshop.event_workshop_title}</div>
                            <div className="flex justify-end items-center">
                                {workshop.count > 0 && <span className="mr-2">(x{workshop.count})</span>}
                                {registrationState.currencySymbol}{workshop.event_workshop_price}
                                <button className="ml-2" type="button" onClick={handleAddWorkshop(workshop)}>
                                    <FontAwesomeIcon className="text-green-400" icon={faPlusSquare} />
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="h-full flex">
                <button onClick={handleRedirectSummary} className="justify-around items-center flex m-auto mr-0 registration-button" type="button" disabled={activeRegistrationDetail.workshops.length === 0}>
                    Next Step
                <FontAwesomeIcon icon={faArrowCircleRight} />
                </button>
            </div>
        </div>
    )
}



const mapStateToProps = (state, ownProps) => {
    return {
        ...state
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({
        addWorkshop: Actions.addWorkshop
    }, dispatch)
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(WorkshopView))