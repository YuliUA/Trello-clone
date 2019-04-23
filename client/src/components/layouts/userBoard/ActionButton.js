 import React, { Component } from 'react';
import {CardMenuBtn} from '../../layouts';
// import {CardForm} from '../../common/CardForm';
import {connect} from 'react-redux';
import {createList} from '../../../actions/listActions'

class ActionButton extends Component {
    constructor(){
        super();
        this.state={
            openForm: false,
            title: ''
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    renderActionBtn = () => {
        const { list, cards } = this.props;
        const btnText = list ? "Додайте ще один список" : cards.length === 0 ? "Додати картку" : "Додати ще одну картку"
        const styles = {
            borderRadius: "5px",
            marginTop: ".5rem",
        }
        const style = list ? styles : null;

        return (
            <button type="button" className="btn btn-link text-light add-btn" onClick={this.handleToggleForm} style={style}>
                <i className="fas fa-plus pr-1"></i>
                {btnText}
            </button>
        )
    }

    renderForm = () => {
        const { list } = this.props;
        const placeholder = list ? "Enter list title ..." : "Add task ...";
        const buttonValue = list ? "Add list" : "Add task";
        const cardMenu = list ? null : <CardMenuBtn/> 
        // return <CardForm  placeholder={placeholder} buttonValue={buttonValue} cardMenu={cardMenu}/>
        return (
            <div className="add-task-form  mx-2  my-2">
                <textarea
                    placeholder={placeholder}
                    autoFocus={true}
                    // onBlur={this.handleToggleForm}
                    className="add-task-text card-shadow"
                    onChange = {this.handleChange}
                    name = "title">
                </textarea>
                <form className="d-flex" onSubmit = {this.handleSubmit}>
                    <button
                        type="submit"
                        className="btn btn-success btn-sm">
                        {buttonValue}
                    </button>
                    <button 
                        type="button" 
                        className="close mx-2"
                        onClick={this.handleToggleForm}>
                        <span>&times;</span>
                    </button>
                    {cardMenu}
                </form>
            </div>
        )
    }

    handleSubmit(e){
        const title = {
            title: this.state.title
        }
        e.preventDefault();
        this.props.createList(title)
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleToggleForm = () => {
        this.setState({
            openForm: !this.state.openForm
        })
    }

    render() {
        const { openForm } = this.state;
        return openForm ? this.renderForm() : this.renderActionBtn();
    }
}
export default connect(null, {createList})(ActionButton);