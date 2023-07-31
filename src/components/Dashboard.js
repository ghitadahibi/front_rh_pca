import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';

const Dashboard = () => {
    const [filters, setFilters] = useState({
        Title: { value: null, matchMode: FilterMatchMode.CONTAINS },
        "Technologies et domaines d'expertise": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        "Années d'expérience": { value: null, matchMode: FilterMatchMode.IN },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getAllData = async () => {
        setIsLoading(true);
    
        try {
            const response = await fetch('http://localhost:10081/api/example/jobmatching');
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
    }, []);

    const renderColumns = (el) => {
        return <Column filter field={el} header={el} />;
    };

    const ImageTemplate = (rowData, column) => {
        var src = 'assets/demo/images/product/' + rowData.image;
        return <img src={src} alt={rowData.brand} width="50px" />;
    };

    const priceBodyTemplate = (data) => {
        return (
            <>
                <span className="p-column-title">Price</span>
                {formatCurrency(data.price)}
            </>
        );
    };

    const bodyTemplate = (data, props) => {
        return (
            <>
                <span className="p-column-title">{props.header}</span>
                {data[props.field]}
            </>
        );
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const actionTemplate = (rowData, column) => {
        return (
            <>
                <Button icon="pi pi-search" type="button" style={{ marginRight: '.5rem' }}></Button>
                <Button icon="pi pi-times" type="button" className="p-button-danger"></Button>
            </>
        );
    };

    const statusBodyTemplate = (data) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                <span className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}>{data.inventoryStatus}</span>
            </>
        );
    };

    return (
        <div className="grid layout-dashboard">
            <div className="col-12 xl:col-12">
                <div className="card card-w-title global-sales ui-fluid">
                    <h5>Liste de candidats</h5>
                    <DataTable
                        value={data}
                        paginator
                        rows={5}
                        filterDisplay="row"
                        filters={filters}
                        emptyMessage="Pas de candidats"
                        globalFilterFields={['Titre', "Technologies et domaines d'expertise", "Années d'expérience", 'status']}
                        className="p-datatable-products"
                    >
                        {columns.map((el) => renderColumns(el))}
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;