import React from 'react'
import { Link } from 'react-router-dom'
import './EmployeeHome.css'

export default function EmployeeHome(props) {
    return (
        <div className='home d-flex flex-column cover-container mx-auto my-auto p-3'>
            <main role='main' className='inner cover'>
                <h1 className="cover-heading">Welcome to Jean-Station Employee Portal.</h1>
                <p className="lead">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta voluptates
                odit sunt quae, sit nulla quia non dolores voluptatibus, sint veritatis reprehenderit eos
                mollitia! Aut nostrum explicabo fuga natus sunt!</p>
                {
                    props.flag ?
                        null
                        : <p className="lead">
                            <Link to='/employee/log_in' className='btn btn-lg btn-secondary'>Log In</Link>
                        </p>
                }
            </main>
        </div>
    )
}
