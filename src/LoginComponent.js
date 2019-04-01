import React from 'react'

const styles = {
    input: {
        margin: '10px 0'
    },
    button: {
        margin: '10px 0'
    }
}

export class LoginContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
        }
    }

    handleLogin = async () => {
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        this.setState({ loading: true })
        const token = await window.login(username, password).catch(console.error)
        this.setState({ loading: false, token })
    }

    render() {
        const {
            loading,
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
            </div>
        </div>
    }
}
