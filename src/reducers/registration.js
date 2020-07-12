const addInitialRegistration = () => {
    return {
        registration_type: {},
        userInfo: {},
        amount: 0,
        workshops: []
    }
}

const initialState = {
    currencySymbol: "$",
    selectedRegistrationId: 0,
    registrationDetails: [addInitialRegistration()]
}

const registrationState = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENCY_SYMBOL':
            return {
                ...state,
                currencySymbol: action.payload.toUpperCase() === "USD" ? "$" : "₺"
            }
        case 'SET_REGISTRATION_TYPE':
            state.registrationDetails[state.selectedRegistrationId].registration_type = action.payload
            return {
                ...state
            }
        case 'SET_USER_INFO':
            state.registrationDetails[state.selectedRegistrationId].userInfo = action.payload
            return {
                ...state
            }
        case 'INCREASE_AMOUNT':
            state.registrationDetails[state.selectedRegistrationId].amount += action.payload
            return {
                ...state
            }
        case 'DECREASE_AMOUNT':
            state.registrationDetails[state.selectedRegistrationId].amount -= action.payload
            return {
                ...state
            }
        case 'ADD_WORKSHOP':
            const activeRegistrationDetails = state.registrationDetails[state.selectedRegistrationId]
            activeRegistrationDetails.amount += action.payload.event_workshop_price
            activeRegistrationDetails.workshops.map(workshop => workshop.event_workshop_id).indexOf(action.payload.event_workshop_id) === -1 ?
                activeRegistrationDetails.workshops.push({ ...action.payload, count: 1 }) :
                activeRegistrationDetails.workshops.filter(workshop => workshop.event_workshop_id === action.payload.event_workshop_id)[0].count++
            return {
                ...state
            }
        case 'ADD_REGISTRATION':
            state.registrationDetails.push(addInitialRegistration())
            return {
                ...state,
                selectedRegistrationId: state.registrationDetails.length - 1
            }
        case 'REMOVE_REGISTRATION':
            state.registrationDetails.splice(action.payload.id, 1)
            return {
                ...state,
            }
        case 'SET_SELECTED_REGISTRATION_ID':
            return {
                ...state,
                selectedRegistrationId: action.payload
            }
        case 'CLEAR_REGISTRATION_TYPE':
            state.registrationDetails[action.payload].registration_type = {}
            return {
                ...state,
            }
        default:
            return {
                ...state
            }
    }
}

export default registrationState