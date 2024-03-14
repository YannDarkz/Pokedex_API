import Button from '../layouts/Button'
import styles from './input.module.css'

const InputSearch = ({ name, text, handleOnChange, placeHolder, type, searchOnclick, value }) => {

    return (
        <div className={`${styles.container_input}`}>
            <label htmlFor={name}>{text}</label>
            <input
                type={type}
                name={name}
                placeholder={placeHolder}
                value={value}
                id={name}
                onChange={handleOnChange}
            />
            
                <Button customClass='btn_search' text='Buscar' onClick={searchOnclick} />
            
        </div>

    )
}

export default InputSearch