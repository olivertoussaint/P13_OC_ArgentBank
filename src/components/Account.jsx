import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function Account({ id, title, amount, description }) {
  const navigate = useNavigate();

  const handleViewTransactions = () => {
    navigate(`/transactions/${id}`);
  };

  return (
    <section className="account bg-white dark:text-white shadow-md rounded-lg p-6 mb-4 dark:bg-gray-800">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">{amount}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-content-wrapper mt-4">
        <button 
          onClick={handleViewTransactions} 
          className="transaction-button bg-violet-500 text-white px-4 py-2 rounded-md shadow hover:bg-violet-600"
        >
          View transactions
        </button>
      </div>
    </section>
  );
}

Account.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Account;
