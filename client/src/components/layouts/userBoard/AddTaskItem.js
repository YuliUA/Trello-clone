import React from "react"

const AddTaskItem = ({cards}) =>{
    
    if(cards.length===0){
        return <button type="button" className="btn btn-link text-light add-btn">
                    <i className="fas fa-plus pr-1"></i>
                     Додати картку
                </button>
    } else{
        return  <button type="button" className="btn btn-link text-light  add-btn">
                    <i className="fas fa-plus pr-1"></i>
                     Додати ще одну картку
                </button>
    }
}

export default AddTaskItem
