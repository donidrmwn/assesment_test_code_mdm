import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { API } from '../config/api';
import { useQuery } from 'react-query';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart',
        },
    },
};

export function ChartData() {
    let { data: partai } = useQuery("partaiCache", async () => {
        const response = await API.get("/partai");
        return response.data.data;
    })
    let { data: chart } = useQuery("chartCache", async () => {
        const response = await API.get("/chart");
        return response.data.data;
    })



    const labels = ["Result"];
    const datasets = []

    partai?.map((data, index) => {
        if (data?.is_aceh == false) {
            datasets.push({
                label: data?.nama,
                data: [chart && chart[data?.id.toString()]],
                backgroundColor: data?.warna,
            }
            )
        }
    })

    const data = {
        labels,
        datasets,
    };


    return (
        <Bar options={options} data={data} />
    );
}
