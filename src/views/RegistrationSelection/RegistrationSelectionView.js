import React from 'react';
import FormSetup from '../../assets/registration-form-setup-information.json'
import RegistrationInfoBar from '../../components/RegistrationInfoBar/RegistrationInfoBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdCard, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { Formik } from 'formik';
import './RegistrationSelectionView.css'

const RegistrationSelectionView = ({ setCurrencySymbol, increaseAmount, setUserInfo, setRegistrationTypeAndFee, registrationState, history, ...props }) => {
    const [formSetup, setFormSetup] = React.useState(FormSetup)
    const [isClicked, setIsClicked] = React.useState(false)

    //set currency sembol according to event_currency field (only USD and TRY supported)
    React.useEffect(() => {
        setCurrencySymbol(FormSetup.event_currency)
    }, [setCurrencySymbol])

    const handleRegistrationTypeSelection = (typeId) => (e) => {
        const registration_type = formSetup.registration_types.filter(t => t.event_registration_type_id === typeId)
        setFormSetup({ ...formSetup, registration_types: registration_type })
        setIsClicked(true)
        increaseAmount(registration_type[0].event_registration_type_price)
        setRegistrationTypeAndFee(registration_type[0])
    }

    const handleRedirectUserInfo = (values) => {
        setUserInfo(values)
        history.push('/workshop-view')
    }

    const { registrationDetails } = registrationState
    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full flex items-center mb-4">
                <FontAwesomeIcon className="text-blue-400 mr-2" size="lg" icon={faIdCard} />
                <span className="font-bold text-xl text-blue-400">Registration Types {"&"} Fees</span>
            </div>
            {
                formSetup.registration_types.map(registrationType =>
                    <RegistrationInfoBar
                        className={isClicked ? "mb-8" : undefined}
                        isClicked={isClicked}
                        key={registrationType.event_registration_type_id}
                        onClick={handleRegistrationTypeSelection(registrationType.event_registration_type_id)}
                        event_registration_type_id={registrationType.event_registration_type_id}
                        event_registration_type_price={registrationType.event_registration_type_price}
                        event_registration_type_title={registrationType.event_registration_type_title}
                    />
                )
            }
            {
                isClicked &&
                <div className="h-full">
                    <Formik
                        initialValues={{
                            firstName: registrationDetails[registrationState.selectedRegistrationId].userInfo.firstName || '',
                            lastName: registrationDetails[registrationState.selectedRegistrationId].userInfo.lastName || '',
                            email: registrationDetails[registrationState.selectedRegistrationId].userInfo.email || ''
                        }}
                        validate={values => {
                            const errors = {};
                            if (!values.firstName) {
                                errors.firstName = 'Required';
                            } else if (values.firstName.length > 15) {
                                errors.firstName = 'Must be 15 characters or less';
                            }

                            if (!values.lastName) {
                                errors.lastName = 'Required';
                            } else if (values.lastName.length > 20) {
                                errors.lastName = 'Must be 20 characters or less';
                            }
                            if (!values.email) {
                                errors.email = 'Required';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address';
                            }
                            return errors;
                        }}
                        onSubmit={handleRedirectUserInfo}
                    >
                        {
                            ({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleSubmit,
                                isSubmitting,
                                /* and other goodies */
                            }) => (
                                    <form className="w-full h-full flex flex-col" onSubmit={handleSubmit}>
                                        <div className="w-full flex mb-8">
                                            <div className="w-full mr-8">
                                                <label htmlFor="firstName">First name<span id="star">*</span></label>
                                                <input
                                                    className="registration-input"
                                                    type="text"
                                                    name="firstName"
                                                    onChange={handleChange}
                                                    value={values.firstName}
                                                />
                                                <span className="text-red-500">{errors.firstName && touched.firstName && errors.firstName}</span>
                                            </div>
                                            <div className="w-full">
                                                <label htmlFor="lastName">Last name<span id="star">*</span></label>
                                                <input
                                                    className="registration-input"
                                                    type="text"
                                                    name="lastName"
                                                    onChange={handleChange}
                                                    value={values.lastName}
                                                />
                                                <span className="text-red-500">{errors.lastName && touched.lastName && errors.lastName}</span>
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <label htmlFor="email">E-mail<span id="star">*</span></label>
                                            <input
                                                className="registration-input"
                                                type="email"
                                                name="email"
                                                onChange={handleChange}
                                                value={values.email}
                                            />
                                            <span className="text-red-500">{errors.email && touched.email && errors.email}</span>
                                        </div>
                                        <div className="h-full flex">
                                            <button className="justify-around items-center flex m-auto mr-0 registration-button" type="submit" disabled={isSubmitting}>
                                                Next Step
                                            <FontAwesomeIcon icon={faArrowCircleRight} />
                                            </button>
                                        </div>
                                    </form>
                                )
                        }
                    </Formik>
                </div>
            }

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
        setRegistrationTypeAndFee: Actions.setRegistrationTypeAndFee,
        setUserInfo: Actions.setUserInfo,
        increaseAmount: Actions.increaseAmount,
        setCurrencySymbol: Actions.setCurrencySymbol
    }, dispatch)
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(RegistrationSelectionView))