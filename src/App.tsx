import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useForm } from './hooks/useForm'
import styles from "./app.module.scss"
import headerImage from "./assets/bus.49ebba2e.webp"

type initialFieldsProps = {
  userName: string,
  firstName: string,
  lastName: string,
  email: string,
  date: Date
}
function App() {
  const initialFields: initialFieldsProps = {
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    date: new Date()
  }
  const [data, onChange, onSubmit] = useForm(
    initialFields,
    (data) => console.log("Submited data: ", data)
  )

  const { userName, firstName, lastName, email, date } = data


  return (
    <div className={styles.formContainer}>
      <img src={headerImage} alt="" />
      <form onSubmit={onSubmit} noValidate>

        <div className={styles.inputHolder}>
          <label htmlFor="userName">Username</label>
          <input type="text" name="userName" value={userName.value} onChange={onChange} min={6} max={10} />
          <span className={styles.error}>{userName.error}</span>
        </div>

        <div className={styles.inputHolder}>
          <label htmlFor="firstName">First name</label>
          <input type="text" name="firstName" value={firstName.value} onChange={onChange} />
          <span className={styles.error}>{firstName.error}</span>
        </div>

        <div className={styles.inputHolder}>
          <label htmlFor="lastName">Last name</label>
          <input type="text" name="lastName" value={lastName.value} onChange={onChange} />
          <span className={styles.error}>{lastName.error}</span>
        </div>

        <div className={styles.inputHolder}>
          <label htmlFor="email">Email</label>
          <input type="email" required name="email" value={email.value} onChange={onChange} />
          <span className={styles.error}>{email.error}</span>
        </div>

        <div className={styles.inputHolder}>
          <label htmlFor="date">Birthdate</label>
          <input type="date" name="date" value={date.value} onChange={onChange} />
          <span className={styles.error}>{date.error}</span>
        </div>

        <div className={styles.inputHolder}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default App
