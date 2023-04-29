import { useQuery } from 'react-query';
import { API } from '../config/api';
import { useTable } from 'react-table'
import React from 'react'

export default function TableData() {
    let { data: partai } = useQuery("partaiCache", async () => {
        const response = await API.get("/partai");
        return response.data.data;
    })

    let { data: provinsi } = useQuery("provinsiCache", async () => {
        const response = await API.get("/provinsi");
        return response.data.data;
    })

    let { data: table } = useQuery("tableCache", async () => {
        const response = await API.get("/table");
        return response.data.data;
    })


    return (
        <>
            <table style={{ fontSize: "10px" }}>
                <thead>
                    <tr>
                        <th style={{ width: "1700px" }}> Wilayah</th>
                        {partai?.map((data, index) => {
                            if (data?.is_aceh == false) {
                                return (
                                    <th key={index} style={{ width: "300px" }}>{data?.nama}</th>
                                )
                            }
                        })}
                    </tr>
                </thead>
                <tbody>
                    {provinsi?.map((tableData, index) => {
                        if (tableData?.id !== -99) {
                            return (
                                <tr key={index}>
                                    <td>
                                        <span style={{ color: "blue" }}>{tableData.nama}</span>
                                        {" (" + table && table[tableData?.id.toString()]["persen"].toFixed(1) + "%) "}
                                    </td>
                                    {partai?.map((data, index) => {
                                        if (data?.is_aceh == false) {
                                            return (
                                                <td key={index} style={{ textAlign: "right" }}>
                                                    { table &&  table[tableData?.id.toString()][data?.id.toString()].toLocaleString()}
                                                </td>
                                            )
                                        }
                                    })}
                                </tr>
                            )
                        }
                    })}
                </tbody>

            </table>

        </>
    )
}



