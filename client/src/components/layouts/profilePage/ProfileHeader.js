import React, { Component } from 'react';


class ProfileHeader extends Component {




    render() {

        return (
            <section id="profileHeader">
                <img src="/images/profile.png" alt="profile image" className="profile_image"></img>
                <p>User name</p>
                <form id='editUser'>
                    <input type='text' placeholder='firstname'></input>
                    <input type='text' placeholder='lastname'></input>
                    <input type="button" value="Save" ></input>
                    <input type="button" value="Cancel" ></input>
                </form>
                <input type="button" value="Edit"></input>
            </section>
        )
    }
}
export default ProfileHeader;
