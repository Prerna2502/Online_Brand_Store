import React from 'react'
import './EmployeeFooter.css'

export default function EmployeeFooter(props) {
    return (
        <div className="container employeefooter-container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light employeefooter-nav">
                <div className="container-fluid">
                    <a className="navbar-brand employeefooter" href=".">{props.footerText}</a>
                </div>
            </nav>
        </div>
    )
}
