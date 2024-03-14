import styles from './button.module.css'

const Button = ({onClick, disabled, backButton, text, customClass}) => {
    
   const classNames = `${styles.btn}  ${backButton ? styles.back_button : ''}`
    return <button className={`${classNames} ${styles[customClass]}`} onClick={onClick} disabled={disabled}> {text}</button>
    
}

export default Button