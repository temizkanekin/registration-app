import React from 'react';
import FormSetup from '../../assets/registration-form-setup-information.json'
import { withRouter } from "react-router-dom";
import './Toolbar.css'

const Toolbar = ({ history }) => {
    const handleClick = () => {
        history.push('/registration-selection-view')
    }
    return (
        <header className="w-full flex flex-col bg-blue-400 p-4">
            <div onClick={handleClick} className="cursor-pointer font-bold text-2xl mb-4">
                {FormSetup.event_long_name}
            </div>
            <div className="w-full flex justify-between">
                <div>
                    {FormSetup.venue.event_venue_title}
                </div>
                <div>
                    {FormSetup.venue.event_venue_city}, {FormSetup.venue.event_venue_country}
                </div>
                <div className="toolbar-event-date">
                    {FormSetup.event_start_date} / {FormSetup.event_end_date}
                </div>

            </div>
        </header>
    )
}

export default withRouter(Toolbar);