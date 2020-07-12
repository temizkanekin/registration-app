import React from 'react';
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faArrowCircleRight, faEdit } from '@fortawesome/free-solid-svg-icons'
import { faWindowClose } from '@fortawesome/free-regular-svg-icons'
import { Button } from '../../components/Button/Button'
import SnackBar from '../../components/SnackBar/SnackBar'
import './SummaryView.css'

const SummaryView = ({ clearRegistrationType, removeRegistration, decreaseAmount, setSelectedRegistrationId, addRegistration, registrationState, history, ...props }) => {
    const [showItems, setShowItems] = React.useState(registrationState.registrationDetails.map(r => false))
    const [paymentType, setPaymentType] = React.useState(undefined)
    const [openDialog, setOpenDialog] = React.useState(false)

    const ref = React.useRef();

    const handleShowItemsClick = (index) => (e) => {
        setShowItems(showItems.map((s, i) => i === index ? !s : s))
    }

    const handleAddNewParticipant = () => {
        addRegistration()
        history.push('/registration-selection-view')
    }

    const handleSummaryConfirm = () => {
        let total_amount = 0
        let registrations = {}
        registrations["registrations"] = registrationState.registrationDetails.map(registration => {
            total_amount += registration.amount
            return ({
                event_registration_firstname: registration.userInfo.firstName,
                event_registration_lastname: registration.userInfo.lastName,
                event_registration_email: registration.userInfo.email,
                event_registration_type_id: registration.registration_type.event_registration_type_id,
                event_registration_type_price: registration.registration_type.event_registration_type_price,
                workshops: registration.workshops.map(ws => ({ event_workshop_id: ws.event_workshop_id, event_workshop_price: ws.event_workshop_price })),
            })
        })
        registrations["total_amount"] = total_amount
        registrations["payment_type"] = paymentType
        ref.current.fireSnackBar({
            type: "success",
            message: "Request logged to console"
        })
        console.log(registrations)
    }

    const handleEditRegistration = (registrationDetail, index) => (e) => {
        setSelectedRegistrationId(index)
        decreaseAmount(registrationDetail.registration_type.event_registration_type_price)
        clearRegistrationType(index)
        history.push('/registration-selection-view')
    }

    const handleDeleteRegistration = (registrationDetail) => (e) => {
        removeRegistration(registrationDetail)
    }

    return (
        <React.Fragment>
            <SnackBar ref={ref} />
            <div className={`summary-root ${openDialog ? "opacity-50" : ""}`}>
                <div className="flex justify-between items-center">
                    <span className="font-bold text-xl text-blue-400">Registration Summary</span>
                </div>
                {
                    registrationState.registrationDetails.map((registrationDetail, i) =>
                        <div key={i} className="summary-content">
                            <div className="flex justify-end">
                                <button onClick={handleEditRegistration(registrationDetail, i)} className="text-blue-400 mr-2" type="button">
                                    <FontAwesomeIcon className="" icon={faEdit} />
                                </button>
                                <button onClick={handleDeleteRegistration(registrationDetail)} className="text-red-400" type="button">
                                    <FontAwesomeIcon className="" icon={faWindowClose} />
                                </button>
                            </div>
                            <div className="flex flex-col mb-4">
                                <div className="summary-content-item">
                                    <span>Registration Details For</span>
                                    <span>AMOUNT</span>
                                </div>
                                <div className="summary-content-item">
                                    <span className="font-bold">{registrationDetail.userInfo.firstName || ''}
                                        {" "}
                                        {registrationDetail.userInfo.lastName || ''}</span>
                                    <span>{registrationState.currencySymbol}{registrationDetail.amount}</span>
                                </div>
                            </div>
                            {
                                showItems[i] &&
                                <div className="flex flex-col mb-4">
                                    <div className="summary-border-bottom font-bold">
                                        Registration Information
                                </div>
                                    {
                                        Object.keys(registrationDetail.registration_type).length > 0 &&
                                        <div className="summary-content-item mb-4">
                                            <span>{registrationDetail.registration_type.event_registration_type_title}</span>
                                            <span>{registrationState.currencySymbol}{registrationDetail.registration_type.event_registration_type_price}</span>
                                        </div>
                                    }
                                    <div className="summary-border-bottom font-bold">
                                        Additional Services
                                </div>
                                    {
                                        registrationDetail.workshops.map((workshop, i) =>
                                            <div key={i} className="summary-content-item">
                                                <span>{workshop.event_workshop_title}{" "}(x{workshop.count})</span>
                                                <span>{registrationState.currencySymbol}{workshop.event_workshop_price * workshop.count}</span>
                                            </div>
                                        )
                                    }
                                </div>
                            }
                            <div onClick={handleShowItemsClick(i)} className="cursor-pointer m-auto">
                                {!showItems[i] ? "Show" : "Hide"} items ({registrationDetail.workshops.map(w => w.count).reduce((a, b) => a + b, 0) + 1})
                        </div>
                        </div>
                    )
                }
                <div className="summary-content-item py-4 summary-border-bottom">
                    <button onClick={() => setOpenDialog(true)} className="summary-button" type="button">
                        <FontAwesomeIcon className="mr-2" icon={faUser} />
                        <span>Add New Participant</span>
                    </button>
                    <div className="flex flex-col">
                        <span>TOTAL</span>
                        <span>{registrationState.currencySymbol}{registrationState.registrationDetails.map(r => r.amount).reduce((a, b) => a + b, 0)}</span>
                    </div>
                </div>
                <div className="flex flex-col mt-8">
                    <span className="font-bold text-xl text-blue-400">Choose Your Payment Method</span>
                    <div className="flex py-4">
                        <div className="flex w-2/5 items-center font-bold">
                            <input onClick={() => setPaymentType("payNow")} className="mr-2" type="radio" id="payNow" name="payment" />
                            <label htmlFor="payNow">Pay Now</label>
                        </div>
                        <div className="flex w-2/5 items-center font-bold">
                            <input onClick={() => setPaymentType("payNowBookLater")} className="mr-2" type="radio" id="payNowBookLater" name="payment" />
                            <label htmlFor="payNowBookLater">Pay Now Book Later</label>
                        </div>
                    </div>
                </div>
                <div className="h-full flex mb-4">
                    <div title="Add user or select payment type to proceed" className="m-auto mr-0">
                        <Button onClick={handleSummaryConfirm} className="justify-around items-center flex"
                            disabled={
                                !paymentType
                                || registrationState.registrationDetails.length === 0
                                || Object.keys(registrationState.registrationDetails[0].userInfo).length === 0
                            }
                        >
                            Next Step
                            <FontAwesomeIcon icon={faArrowCircleRight} />
                        </Button>
                    </div>
                </div>
            </div>
            {openDialog && <div className="summary-dialog-outer">
                <dialog open={openDialog} className="summary-confirm-dialog"><span className="font-bold">TERMS</span>{<br />} You are about to register another person!
                {<br />}
                    <ul className="mb-8">
                        <li>-In this step, you can register as many persons as you want until you complete your registration</li>
                        <li>-After you complete this step, the persons you registered can access and manage their accounts by using login details we will send them by a notification e mail.</li>
                        <li>-If this is a paid event, registration fees of each participant you registered will be added to your account</li>
                        <li>-You can cancel this process and return to your account page by clicking "CANCEL" button below</li>
                    </ul>
                    <div className="flex justify-between pb-4">
                        <button onClick={() => setOpenDialog(false)} className="text-gray-500 summary-dialog-button" type="button">CANCEL</button>
                        <button onClick={handleAddNewParticipant} className="text-red-400 summary-dialog-button" type="button">ACCEPT TERMS</button>
                    </div>
                </dialog>
            </div>}
        </React.Fragment>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({
        addRegistration: Actions.addRegistration,
        setSelectedRegistrationId: Actions.setSelectedRegistrationId,
        decreaseAmount: Actions.decreaseAmount,
        removeRegistration: Actions.removeRegistration,
        clearRegistrationType: Actions.clearRegistrationType
    }, dispatch)
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SummaryView))