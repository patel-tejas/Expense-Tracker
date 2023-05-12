import React, {useContext} from 'react'
import IncomeContext from '../context/IncomeContext'

const History = () => {
    const context = useContext(IncomeContext)
    const { transactionHistory } = context

    const [...history] = transactionHistory(5)

    return (
        <>
        <h2>Recent History</h2>
        {history.map((his)=>{
            return (
                <div key={his._id} className="flex gap-3 justify-between">
                    <p style={{color: his.type==="income" ? "lime" : "#F05454"}}>{his.title}</p>
                    <p style={{color: his.type==="income" ? "lime" : "#F05454"}}>{his.type==="income" ? `+`: `-`} &#x20b9;{his.amount}</p>
                </div>
            )
        })}
        </>
    )
}

export default History