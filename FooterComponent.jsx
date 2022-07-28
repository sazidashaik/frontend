import React, { Component } from 'react'

class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <footer className = "footer bg-primary navbar-dark">
                    <span className="text-muted">All Rights Reserved 2022 @Madhulika</span>
                </footer>
            </div>
        )
    }
}

export default FooterComponent
