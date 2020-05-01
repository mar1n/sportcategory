import React from 'react'
import * as forge from 'node-forge'
import './Login.css'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    handleInput = (name, value) => {
        this.setState(() => ({
            [name]: value
        }));
    }

    handleSubmit = event => {
        event.preventDefault()
        const md = forge.md.sha256.create()
        md.update(this.state.password)
        fetch(`/login`, {
            method: 'post',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({
                username: this.state.username,
                password: md.digest().toHex()
            })
        }).then(res => res.ok ? res.json() : Promise.reject())
        .then(res => { 
            console.log("Result: " + Object.entries(res))
            if(res.result) {
                this.props.logIn({
                    message: `Successful Login, welcome ${res.username}!`,
                    isSuccess: true
                },
                {
                    username: res.username,
                    ...(res.isAdmin ? { isAdmin: true } : {})
                })
                this.props.history.push('/')
            } else {
                this.props.logIn({
                    message: `${res.message}`,
                    isSuccess: false
                },
                {
                    username: null
                })
            }
        })
        .catch()
    }
    
    render() {
        return(
            <div className='Login'>
                <h1>Log in:</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='username'>Username:</label>
                    <input name='username'
                        type='text'
                        onChange={({ target }) => this.handleInput(target.name, target.value)} />
                        <label htmlFor='password'>Password:</label>
                        <input name='password'
                            type='password'
                            onChange={({ target }) => this.handleInput(target.name, target.value)} />
                        <input type='submit'
                            value='Log in' />
                </form>
            </div>
        )
    }
}

export default  Login