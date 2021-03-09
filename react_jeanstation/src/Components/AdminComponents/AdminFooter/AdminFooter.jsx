import React from 'react'
import './AdminFooter.css'

export default function AdminFooter(props) {
    return (
        <div className="container adminfooter-container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light adminfooter-nav">
                <div className="container-fluid">
                    <a className="navbar-brand adminfooter" href=".">{props.footerText}</a>
                </div>
            </nav>
        </div>
    )
}
