// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'

function Account({title, amount, description}) {
  return (
    <section className='account'>
      <h2 className="sr-only">Accounts</h2>
      <div className="account-content-wrapper">
        <h3 className="account-title text-base-1 font-normal leading-3">{title}</h3>
        <p className="account-amount text-2-5 font-bold text-login">{amount}</p>
        <p className="account-amount-description leading-3">{description}</p>
      </div>
      <div className="account-content-wrapper">
        <button className="transaction-button bg-regul-green text-white">View transactions</button>
      </div>
    </section>
  )
}
Account.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default Account