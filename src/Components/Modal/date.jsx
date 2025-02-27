import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateTimePicker = ({handler, selectedDate}) => {


    return (
        <DatePicker
            selected={selectedDate}
            onChange={handler}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd.MM.yyyy HH:mm"
            placeholderText="Выберите дату и время"
            className='darkDate'
        />
    );
};

export default DateTimePicker;
