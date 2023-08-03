
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Slider } from 'primereact/slider';
import '../../src/components/Dashboard.css'

const Dashboard = () => {
    const [filters, setFilters] = useState({
        job_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        email: { value: null, matchMode: FilterMatchMode.CONTAINS },
        similarity_score: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedData, setSelectedData] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [sliderValue, setSliderValue] = useState(5);

    const getAllData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:10082/api/example/jobmatching?page=${page}&size=${size}`);
            const data = await response.json();
            console.log(data)
            if (data.length > 0) {
                setColumns(Object.keys(data[0]));
                setData(data);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllData();
    }, [page, size]);

    const renderColumns = (el) => {
        if (el === 'job_name' || el === 'email' || el === 'similarity_score') {
            return (
                <Column
                    key={el}
                    field={el}
                    header={el}
                    filter
                    filterMatchMode={filters[el].matchMode}
                    filterElement={
                        <InputText
                            type="text"
                            value={filters[el].value}
                            onChange={(e) => {
                                setFilters({
                                    ...filters,
                                    [el]: { ...filters[el], value: e.target.value }
                                });
                            }}
                        />
                    }
                />
            );
        } else {
            return (
                <Column
                    key={el}
                    field={el}
                    header={el}
                    filter
                    filterMatchMode={FilterMatchMode.CONTAINS}
                />
            );
        }
    };

    const bodyTemplate = (data, props) => {
        return (
            <>
                <span className="p-column-title">{props.header}</span>
                {data[props.field]}
            </>
        );
    };

    const actionTemplate = (rowData, column) => {
        return (
            <>
                <Button icon="pi pi-search" type="button" style={{ marginRight: '.5rem' }}></Button>
                <Button icon="pi pi-times" type="button" className="p-button-danger"></Button>
            </>
        );
    };

    const rowClassName = (rowData) => {
        return {
            'selected-row': selectedData.some((data) => data.id === rowData.id),
        };
    };

    const handleSliderChange = (event) => {
        setSliderValue(event.value);
        setSize(event.value);
        setPage(0);
    };

    const sliderTooltip = (value) => {
        return `${value}`;
    };

    return (
        <div className="grid layout-dashboard">
            <div className="col-12 xl:col-12">
                <div className="card card-w-title global-sales ui-fluid">
                    <h5>Liste de candidats</h5>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                        <span style={{ marginRight: '20px' }}>Nombre de candidats a selectionner:</span>
                        <Slider value={sliderValue} onChange={handleSliderChange} min={1} max={100} step={1} 
                          style={{ width: '50%' }} tooltip={sliderTooltip} />
                        <span style={{ marginLeft: '20px' }}>{sliderValue}</span>
                    </div>
                    <DataTable
                        value={data}
                        selection={selectedData}
                        onSelectionChange={(e) => setSelectedData(e.value)}
                        paginator
                        rows={size}
                        first={page * size}
                        onPage={(e) => {
                            setPage(e.page);
                            setSize(e.rows);
                        }}
                        sortField="similarity_score"
                        sortOrder={-1}
                        filterDisplay="row"
                        filters={filters}
                        emptyMessage="Pas de candidats"
                        globalFilterFields={['job_name', 'email', 'similarity_score']}
                        className="p-datatable-products"
                        rowClassName={rowClassName}
                    >
                        <Column
                            key="checkbox"
                            selectionMode="multiple"
                            style={{ width: '3rem' }}
                            headerStyle={{ width: '3rem' }}
                        />
                        {columns.map((el) => renderColumns(el))}

                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;