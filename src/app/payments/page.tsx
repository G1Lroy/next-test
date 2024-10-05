import PaymentsTable from '@/components/PaymentsTable';
import { Database } from '@/models/database';

export default async function PaymentsPage() {

	// get data on server
	const allTopUps = Database.topUpRequests.getAll();
	const totalInitial = allTopUps.reduce((prev, curr) => prev + curr.amount, 0)


	return (
		<div className="container mt-5">
			<h2>Список пополнений</h2>
			{/* transfer data to client component */}
			{/* for manipulation */}
			<PaymentsTable allTopUps={allTopUps} total={totalInitial} />
		</div>

	);
};

