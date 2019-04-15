import React, { Component } from 'react';

class CollaborateCard extends Component {
    render() {
        return (
            <div className="card p-2 my-2 border-0">
                <div className="card-content">
                    <div className={this.props.label}>
                        </div>
                           {this.props.task}
                        </div>
                <div className="description">
                    <svg height="10" viewBox="0 0 16 10" width="16" xmlns="http://www.w3.org/2000/svg">
                        <path d="m1 0h14c.5522847 0 1 .44771525 1 1s-.4477153 1-1 1h-14c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1zm0 4h14c.5522847 0 1 .44771525 1 1s-.4477153 1-1 1h-14c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1zm0 4h8c.55228475 0 1 .44771525 1 1s-.44771525 1-1 1h-8c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1z" fill="#30364c" fill-rule="evenodd" opacity=".3"></path>
                    </svg>
                </div>
                <div className="card-user">
                    <div className={this.props.user1}></div>
                    <div className={this.props.user2}></div>
                </div>
            </div>
        )
    }
}

export default CollaborateCard;