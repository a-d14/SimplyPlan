import { useLoaderData } from "react-router-dom"
import TicketView from "../components/TicketView/TicketView";

export default function SummaryPage() {

    const tickets = useLoaderData();

    return (
        <div className="outlet-output">
            <header className="header">
                <h1>Tickets</h1>
            </header>
            <div className="outlet-output__body tickets__page">
                {
                    tickets.map((ticket) => {
                        return <TicketView ticket={ticket} inList={true} />
                    })
                }
            </div>
        </div>
    )
}