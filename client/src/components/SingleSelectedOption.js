import React, {useState} from 'react';
import "./SingleSelectedOption.css"
function SingleSelectedOption({options, type, selectedOption, setSelectedOption}) {


    const handleOptionChange = async (event) => {
        setSelectedOption(event.target.value);


    }

    return (
        <div>
            <select value={selectedOption} onChange={handleOptionChange} >
                <option disabled value="">{type}</option>
                {options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div >
    );
}

export default SingleSelectedOption;
