import React from 'react'
import jwtDecode from 'jwt-decode'

const styles = {
    input: {
        margin: '10px 0'
    },
    button: {
        margin: '10px 0'
    },
}

export class LoginContainer extends React.Component {
    constructor(props) {
        super(props)
        const token = window.localStorage.getItem('osToken')
        let decodedToken
        try {
			decodedToken = token && jwtDecode(token)
        } catch (e) {}
        this.state = {
            loading: false,
            token,
			decodedToken,
        }
        window.onTokenAdded = (token) => {
            let decodedToken
			try {
				decodedToken = token && jwtDecode(token)
			} catch (e) {}
            this.setState({ token, decodedToken })
        }
    }

    handleLogin = async () => {
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        this.setState({ loading: true })
        const token = await window.login(username, password).catch(console.error)
        this.setState({ loading: false, token })
    }

    setCustomToken = () => {
		const customToken = document.getElementById('token').value
        window.localStorage.setItem('osToken', customToken)
        let decodedToken
		try {
			decodedToken = customToken && jwtDecode(customToken)
		} catch (e) {}
		this.setState({ token: customToken, decodedToken })
    }

    render() {
        const {
            loading,
            token,
            decodedToken,
        } = this.state
        return <div style={{ width: '100%', backgroundColor: 'black', padding: '20px' }}>
            <div style={{
                width: '60%',
                backgroundColor: 'white',
                margin: 'auto',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <h2>Outsmart Swagger</h2>
                <input style={styles.input} id={'username'} placeholder={'username'} />
                <input style={styles.input} id={'password'} placeholder={'password'} />
                {
                    !loading ? <button onClick={this.handleLogin} style={styles.button}>
                        Login
                    </button> : <h5>Carregando...</h5>
                }
                {
                    token && <div style={{ margin: '5px 0'}}>Current Token: {token}</div>
                }
                {
                    decodedToken && <div style={{ margin: '5px 0'}}>Current Token Payload: {decodedToken}</div>
                }
				<input style={styles.input} id={'token'} placeholder={'Insert custom token'} />
				<button onClick={this.setCustomToken} style={styles.button}>
					Set Custom Token
				</button>
            </div>
        </div>
    }
}
