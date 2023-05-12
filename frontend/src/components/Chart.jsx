import React, {useContext} from 'react'
import IncomeContext from '../context/IncomeContext'
import {Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js'
import moment from 'moment'
import {Line} from 'react-chartjs-2'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
)

const Chart = () => {
    const context = useContext(IncomeContext)
    const { expense, income} = context

    const data = {
        labels: income.map((inc)=>{
            let date = inc.date
            let formatted = moment(date).format('DD/MM/YYYY')
            return formatted
        }),
        datasets : [
            {
                label: 'INCOME',
                data:[
                    ...income.map((inc)=>{
                        const {amount} = inc
                        return amount
                    })
                ],
                backgroundColor: 'green',
                tension: .2,
                borderColor: 'lime'
                
            },
            {
                label: 'EXPENSE',
                data:[
                    ...expense.map((inc)=>{
                        const {amount} = inc
                        return amount
                    })
                ],
                backgroundColor: 'red',
                tension: .2,
                borderColor: '#F05454'
            }
        ]
    }
  return (
    <div>
        <Line data={data}/>
    </div>
  )
}

export default Chart