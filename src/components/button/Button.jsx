
import "./Button.css"


function Button({ children, onClick, disabled, type="button", className = "" }) {




    return (


        <button
            type={type}
            className= {`nav-button ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>


    );

}


export default Button;