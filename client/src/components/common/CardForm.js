import React from 'react';

const CardForm = ({placeholder, buttonValue, cardMenu}) => {
    return (
        <form className="add-task-form  mx-2  my-2" >
            <textarea
                placeholder={placeholder}
                autoFocus="true"
                onBlur={this.handleToggleForm}
                className="add-task-text card-shadow">
            </textarea>
            <div className="d-flex ">
                <button
                    type="submit"
                    className="btn btn-success btn-sm "
                    onClick={this.handleToggleForm}>
                    {buttonValue}
                </button>
                <button 
                    type="button" 
                    className="close mx-2">
                    <span aria-hidden="true">&times;</span>
                </button>
                {cardMenu}
            </div>
        </form>
    )
}

export default CardForm;