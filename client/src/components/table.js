import { useQuery } from 'react-query';
import { API } from '../config/api';

import React, { useState } from 'react'


export default function TableData() {


    const [isLoading, setIsLoading] = useState(true)

    let { data: table } = useQuery("tableCache", async () => {
        setIsLoading(true)
        const response = await API.get("/table");
        setIsLoading(false)
        return response.data.data;
    })
    // console.log(table["1"].persen)

    let { data: partai } = useQuery("partaiCache", async () => {
        setIsLoading(true)
        const response = await API.get("/partai");
        setIsLoading(false)
        return response.data.data;
    })

    let { data: provinsi } = useQuery("provinsiCache", async () => {
        setIsLoading(true)
        const response = await API.get("/provinsi");
        setIsLoading(false)
        return response.data.data;
    })




    return (
        <>
            {isLoading ? <></> :
                <table style={{ fontSize: "10px" }}>
                    <thead>
                        <tr>
                            <th style={{ width: "1700px" }}> Wilayah</th>
                            {partai ? partai?.map((data, index) => {
                                if (data?.is_aceh == false) {
                                    return (
                                        <th key={index} style={{ width: "300px" }}>{data?.nama}</th>
                                    )
                                }
                            })
                                : <></>
                            }
                        </tr>
                    </thead>
                    <tbody>

                        {provinsi ? provinsi?.map((tableData, index) => {

                            if (tableData && tableData?.id !== -99) {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <span style={{ color: "blue" }}>{tableData ? tableData?.nama : ""}</span>
                                            {table && " (" + table[tableData?.id?.toString()]["persen"]?.toFixed(1) + "%)"}
                                     
                                        </td>
                                        {partai ? partai?.map((data, index) => {
                                            if (data?.is_aceh == false) {
                                                return (
                                                    <td key={index} style={{ textAlign: "right" }}>
                                                        {table && table[tableData?.id?.toString()][data?.id?.toString()]?.toLocaleString()}
                                                    </td>
                                                )
                                            }
                                        })
                                            : <></>
                                        }
                                    </tr>
                                )
                            }
                        })
                            : <></>
                        }
                    </tbody>

                </table>
            }
        </>
    )
}



