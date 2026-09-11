import React, { useContext } from 'react'
import CartContext from '../context/CartContext'

function Notifications() {

    const { message, messageType } = useContext(CartContext);

    if(!message){
        return null;
    }
  return (
    <div>
        <div className="container-fluid">
            <div className="row">
                <div
                    className={`alert alert-${messageType} position-fixed col-12`}
                    style={{
                        margin: 0,
                        padding: "1em 50px",
                        zIndex: 9999,
                        position: "fixed",
                        top: "1.5em",
                        left: 0,
                        width: "100%",
                        border: `3px solid ${messageType === 'success' ? 'darkgreen' : messageType === 'danger' ? 'darkred' : 'darkorange'}`,
                    }}

                >
                    {message}
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Notifications
