import styles from './container.module.css'

const Container = ({children, customClass}) => {


    return(
        <div className={`${styles.container} ${styles[customClass]}`}>
            {children}
        </div>

    )
}

export default Container