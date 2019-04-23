/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'

class BoardHeader extends Component {
    render() {
        return (
            <div className="board-header">
                <div className="board-tittle d-inline">
                    <span className="btn-lg px-3">Board Title</span>
                    <a href='#' className="btn btn-sm text-light mb-1 p-1"><i className="far fa-star"></i></a>
                </div>
                <div className="board-meta d-inline">
                    <span className="btn btn-sm text-light px-3">Для особистих цілей</span>
                </div>
                <div className="board-privacy d-inline">
                    <span className="btn btn-sm text-light px-3"><i className="fa fa-lock mr-2"></i>Приватна</span>
                </div>
                <div className="board-members d-inline">
                    
                </div>
            </div>
        )
    }
}


export default BoardHeader;
