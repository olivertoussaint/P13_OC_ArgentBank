import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import AccountCardData from "../data/AccountCardData.json";
import { fetchTransactions } from "../services/ApiService";
import { format } from "date-fns";
import Spinner from "../components/Spinner";

function TransactionModal({ transaction, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white dark:bg-dark p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <button
          className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-lg font-semibold mb-4">Transaction Details</h2>
        <ul className="list-none space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <li><strong>ID:</strong> {transaction.id}</li>
          <li><strong>Date:</strong> {format(new Date(transaction.date), "MMMM do, yyyy")}</li>
          <li><strong>Amount:</strong> ${transaction.amount.toFixed(2)}</li>
          <li><strong>Description:</strong> {transaction.description}</li>
          <li><strong>Balance:</strong> ${transaction.balance.toFixed(2)}</li>
        </ul>
      </div>
    </div>
  );
}

TransactionModal.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

function TransactionDetails({ transaction }) {
  return (
    <tr>
      <td colSpan="5" className="p-4 bg-gray-50 dark:bg-violet-950">
        <ul className="list-none w-full flex flex-col gap-1 text-center md:text-left text-xs md:text-base">
          <li>Details for transaction {transaction.id}</li>
          <li>Transaction Type: Electronic</li>
          <li>Category: Food ✏</li>
          <li>Notes: ✏</li>
        </ul>
      </td>
    </tr>
  );
}

TransactionDetails.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string,
    amount: PropTypes.number,
    balance: PropTypes.number,
    date: PropTypes.string,
  }).isRequired,
};

function Transactions() {
  const { accountId } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [modalTransaction, setModalTransaction] = useState(null);

  const account = AccountCardData.find((acc) => acc.id === accountId);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const jwtToken = localStorage.getItem("token");
        if (jwtToken) {
          const transactionData = await fetchTransactions(accountId, jwtToken);

          // Ensure amount and balance are numbers
          const normalizedData = transactionData.map((transaction) => ({
            ...transaction,
            amount: parseFloat(transaction.amount),
            balance: parseFloat(transaction.balance),
          }));

          setTransactions(normalizedData);
        } else {
          setError("User is not authenticated");
        }
      } catch (error) {
        setError(error.message || "Failed to fetch transactions");
      } finally {
        setLoading(false);
      }
    };
    loadTransactions();
  }, [accountId]);

  const toggleAccordion = (transactionId, transaction) => {
    if (window.innerWidth <= 640) {
      setModalTransaction(transaction);
    } else {
      setExpandedId(expandedId === transactionId ? null : transactionId);
    }
  };

  if (!account) return <p>Account not found.</p>;
  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <section className="transactions-page min-h-150 flex flex-col p-4 bg-gray-100 dark:bg-dark text-gray-900 dark:text-white">
      <div className="relative py-8 border-b-2 border-gray-400/50 shadow-md">
        <h2 className="text-lg text-gray-700 font-medium mb-4 dark:text-white">
          {account.title}
        </h2>
        <p className="text-4xl font-extrabold">{account.amount}</p>
        <p className="text-lg text-gray-700 font-medium pt-3 dark:text-white">
          {account.description}
        </p>
      </div>

      <div className="transactions mt-14 md:mt-36 flex-grow">
        {transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-dark shadow-md rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-2 md:px-4 border-b"></th>
                  <th className="py-2 px-2 md:px-4 border-b text-xs md:text-base font-normal">
                    Date
                  </th>
                  <th className="py-2 px-2 md:px-4 border-b text-xs md:text-base font-normal">
                    Description
                  </th>
                  <th className="py-2 px-2 md:px-4 border-b text-xs md:text-base font-normal">
                    Amount
                  </th>
                  <th className="py-2 px-2 md:px-4 border-b text-xs md:text-base font-normal">
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <React.Fragment key={transaction.id}>
                    <tr
                      onClick={() => toggleAccordion(transaction.id, transaction)}
                      className="cursor-pointer"
                    >
                      <td className="py-2 px-2 md:px-4 border-b text-right">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-6 w-6 transition-transform duration-200 ${
                            expandedId === transaction.id ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 15l7-7 7 7"
                          />
                        </svg>npm
                      </td>
                      <td className="py-2 px-2 md:px-4 text-xs md:text-base border-b">
                        {format(new Date(transaction.date), "MMMM do, yyyy")}
                      </td>
                      <td className="py-2 px-2 md:px-4 text-xs md:text-base border-b">
                        {transaction.description}
                      </td>
                      <td className="py-2 px-2 md:px-4 text-xs md:text-base border-b sm:table-cell">
                        ${transaction.amount.toFixed(2)}
                      </td>
                      <td className="py-2 px-2 md:px-4 text-xs md:text-base border-b sm:table-cell">
                        ${transaction.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                    {expandedId === transaction.id && (
                      <TransactionDetails transaction={transaction} />
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No transactions available.</p>
        )}
      </div>

      {modalTransaction && (
        <TransactionModal
          transaction={modalTransaction}
          onClose={() => setModalTransaction(null)}
        />
      )}
    </section>
  );
}

export default Transactions;
