function Button({buttonName , handleClick}){
    
    return(
        <button onClick={handleClick}>{buttonName}</button>
    )
}

export default Button