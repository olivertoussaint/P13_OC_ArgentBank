import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import AccountCardData from '../data/AccountCardData.json';
import { fetchTransactions } from '../services/ApiService';
import { format } from 'date-fns';
import Spinner from '../components/Spinner';

function TransactionDetails({ transaction }) {
	return (
		<tr>
			<td colSpan="5" className="p-4 bg-gray-50 dark:bg-violet-950">
				<ul className="list-none pl-4 flex flex-col gap-1 text-left">
					<li>Details for transaction {transaction.id}</li>
					<li>Transaction Type: Electronic</li>
					<li>
						Category: Food ✏{' '}
						<span className="py-2  pl-2 pr-14 relative left-16  bg-green-800/70 rounded-md text-white">
							Pencil allows user to edit to a Select Dropdown
						</span>
					</li>
					<li>
						Notes: ✏{' '}
						<span className="py-2  pl-2 pr-14 relative left-16 top-4 bg-green-800/70 rounded-md text-white">
							Pencil allows user to add notes via Text Input
						</span>
					</li>
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

	const account = AccountCardData.find((acc) => acc.id === accountId);

	useEffect(() => {
		const loadTransactions = async () => {
			try {
				const jwtToken = localStorage.getItem('token');
				if (jwtToken) {
					const transactionData = await fetchTransactions(accountId, jwtToken);
					setTransactions(transactionData);
				} else {
					setError('User is not authenticated');
				}
			} catch (error) {
				setError(error.message || 'Failed to fetch transactions');
			} finally {
				setLoading(false);
			}
		};
		loadTransactions();
	}, [accountId]);

	const toggleAccordion = (transactionId) => {
		setExpandedId(expandedId === transactionId ? null : transactionId);
	};

	if (!account) return <p>Account not found.</p>;

	if (loading) return <Spinner />;

	if (error) return <p>{error}</p>;

	return (
		<section className="transactions-page min-h-screen flex flex-col p-4 bg-gray-100 dark:bg-dark text-gray-900 dark:text-white">
			<div className="relative py-8 border-b-2 border-gray-400/50 shadow-md">
				<h2 className="text-lg text-gray-700 font-medium mb-4 dark:text-white">
					{account.title}
				</h2>
				<p className="text-4xl font-extrabold">{account.amount}</p>
				<p className="text-lg text-gray-700 font-medium pt-3 dark:text-white">
					{account.description}
				</p>
			</div>

			<div className="transactions mt-8 flex-grow">
				{transactions.length > 0 ? (
					<table className="min-w-full bg-white dark:bg-dark shadow-md rounded-lg">
						<thead>
							<tr>
								<th className="py-2 px-4 border-b"></th>
								<th className="py-2 px-4 border-b font-normal">Date</th>
								<th className="py-2 px-4 border-b font-normal">Description</th>
								<th className="py-2 px-4 border-b font-normal">Amount</th>
								<th className="py-2 px-4 border-b font-normal">Balance</th>
							</tr>
						</thead>
						<tbody>
							{transactions.map((transaction) => (
								<React.Fragment key={transaction.id}>
									<tr
										onClick={() => toggleAccordion(transaction.id)}
										className="cursor-pointer"
									>
										<td className="py-2 px-4 border-b text-right">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className={`h-6 w-6 transition-transform duration-200 ${
													expandedId === transaction.id ? 'rotate-180' : ''
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
											</svg>
										</td>
										<td className="py-2 px-4 border-b">
											{format(new Date(transaction.date), 'MMMM do, yyyy')}
										</td>
										<td className="py-2 px-4 border-b">
											{transaction.description}
										</td>
										<td className="py-2 px-4 border-b">
											${parseFloat(transaction.amount).toFixed(2)}
										</td>
										<td className="py-2 px-4 border-b">
											${transaction.balance}
										</td>
									</tr>
									{expandedId === transaction.id && (
										<TransactionDetails transaction={transaction} />
									)}
								</React.Fragment>
							))}
						</tbody>
					</table>
				) : (
					<p>No transactions available.</p>
				)}
			</div>
		</section>
	);
}

export default Transactions;
