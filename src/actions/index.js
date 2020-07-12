export const setCurrencySymbol = ( currency ) => {
    return {
        type: 'SET_CURRENCY_SYMBOL',
        payload: currency
    }
}

export const setRegistrationTypeAndFee = ( registration_type ) => {
    return {
        type: 'SET_REGISTRATION_TYPE',
        payload: registration_type
    }
}

export const setUserInfo= ( userInfo ) => {
    return {
        type: 'SET_USER_INFO',
        payload: userInfo
    }
}

export const increaseAmount = ( amount ) => {
    return {
        type: 'INCREASE_AMOUNT',
        payload: amount
    }
}

export const decreaseAmount = ( amount ) => {
    return {
        type: 'DECREASE_AMOUNT',
        payload: amount
    }
}

export const addWorkshop = ( workshop ) => {
    return {
        type: 'ADD_WORKSHOP',
        payload: workshop
    }
}

export const addRegistration = (  ) => {
    return {
        type: 'ADD_REGISTRATION',
        payload: {}
    }
}

export const removeRegistration = ( registration ) => {
    return {
        type: 'REMOVE_REGISTRATION',
        payload: registration
    }
}

export const setSelectedRegistrationId = ( registrationId ) => {
    return {
        type: 'SET_SELECTED_REGISTRATION_ID',
        payload: registrationId
    }
}

export const clearRegistrationType = ( registrationId ) => {
    return {
        type: 'CLEAR_REGISTRATION_TYPE',
        payload: registrationId
    }
}