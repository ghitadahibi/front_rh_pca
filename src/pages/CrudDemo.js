import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { Modal,message } from 'antd';
import '../../src/pages/Crud.css'

const CrudDemo = () => {
  const [visible, setVisible] = useState(false);
  const [jobOffers, setJobOffers] = useState([]);
  const toast = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const handleDeleteClick = async () => {
    try {
      const response = await fetch('http://localhost:10082/api/example/joboffers', {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log('Job offers deleted successfully');
  
        // Mettre à jour la liste des offres d'emploi
        const updatedJobOffers = jobOffers.filter((jobOffer) => !jobOffer.isSelected);
        setJobOffers(updatedJobOffers);
  
        toast.current.show({ severity: 'success', summary: 'Supprimé avec succès', life: 3000 });
      } else {
        console.error('Error deleting job offers');
      }
    } catch (error) {
      console.error('Error deleting job offers', error);
    }
  };
  const handleDeleteone = async (jobOfferName
    ) => {
  try {
    const response = await fetch(`http://localhost:10082/api/example/joboffers/${jobOfferName}`, {
      method: 'DELETE',
    });
   
    console.log(jobOfferName)
    if (response.ok) {
      console.log(`Job offer with ID ${jobOfferName
      } deleted successfully`);

      // Mettre à jour la liste des offres d'emploi
      const updatedJobOffers = jobOffers.filter((jobOffer) => jobOffer.jobOfferName
      !== jobOfferName
      );
      setJobOffers(updatedJobOffers);

      toast.current.show({ severity: 'success', summary: 'Supprimé avec succès', life: 3000 });
    } else {
      console.error('Error deleting job offer');
    }
  } catch (error) {
    console.error('Error deleting job offer', error);
  }
};


   const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button label="Nouveau" icon="pi pi-plus" className="mon-bouton-orange mr-2" onClick={handleApplyClick} />
          <Button label="Supprimer" icon="pi pi-trash" className="mon-bouton-rouge" onClick={handleDeleteClick } />
        </div>
      </React.Fragment>
    );
  };

  

  const productDialogFooter = (
    <>
      <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={() => setVisible(false)} />
      <Button label="Enregistrer" icon="pi pi-check" className="p-button-text" />
    </>
  );

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Gestion des Offres d'emploie</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" placeholder="Chercher..." />
      </span>
    </div>
  );

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
<Button
  icon="pi pi-trash"
  className="p-button-rounded p-button-warning mt-2"
  onClick={() => rowData.jobOfferName
    && handleDeleteone(rowData.jobOfferName
      )}
/>



      </div>
    );
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleApplyClick = () => {
    setShowModal(true);
  };

  const handleSave = async (event) => {
    event.preventDefault();

    // Récupérer les valeurs du formulaire
    const joboffre_nom = document.getElementById('joboffre_nom').value;
    const joboffre = document.getElementById('joboffre').files[0];

    // Créer un objet FormData pour envoyer les données de formulaire et les fichiers
    const formData = new FormData();
    formData.append('joboffre_nom', joboffre_nom);
    formData.append('joboffre', joboffre);

    try {
      const response = await fetch('http://localhost:10082/api/example/uploadjoboffre', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Une erreur est survenue lors de l\'appel à l\'API REST');
      }

      const responseBody = await response.text();
      console.log('Réponse de l\'API REST :', responseBody);
    } catch (error) {
      console.error(error);
    }
// Handle form submission here
message.success('Job offer added');
    setShowModal(false);

  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:10082/api/example/joboffer?page=${page}&size=${size}`);
      const data = await response.json();
      console.log(data);
      setJobOffers(data);
    };

    fetchData();
  }, [page, size]);
  const contentBodyTemplate = (rowData) => {
    const maxLines = 3;
    const isExpanded = expandedRows.has(rowData.id);
    const content = isExpanded ? rowData.content : rowData.content.split('\n').slice(0, maxLines).join('\n');
    return (
      <div>
        <pre>{content}</pre>
        {rowData.content.split('\n').length > maxLines && (
          <Button className="butt" label={isExpanded ? 'Voir moins' : 'Voir plus'} onClick={() => handleExpandClick(rowData.id)} />
        )}
      </div>
    );
  };
  const handleExpandClick = (rowId) => {
    setExpandedRows((prevExpandedRows) => {
      const newExpandedRows = new Set(prevExpandedRows);
      if (newExpandedRows.has(rowId)) {
        newExpandedRows.delete(rowId);
      } else {
        newExpandedRows.add(rowId);
      }
      return newExpandedRows;
    });
  };  

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />
          <Toolbar className="mb-4" left={leftToolbarTemplate} />
          <DataTable
            dataKey="id"
            paginator
            rows={size}
            first={page * size}
            onPage={(e) => {
                            setPage(e.page);
                            setSize(e.rows);
                        }}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Presentation {first} a {last} offre d'emploie {totalRecords} "
            emptyMessage="Pas d'offre disponible."
            header={header}
            value={jobOffers}
            responsiveLayout="scroll"
          >
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
            <Column field="jobOfferName" header="JobofferName" sortable headerStyle={{ width: '14%',minWidth: '10rem' }} />
            <Column field="content" header="Content" sortable headerStyle={{ width: '14%', minWidth: '10rem' }} body={contentBodyTemplate}/>
            <Column body={actionBodyTemplate} headerStyle={{ width: '6rem' }}></Column>
          </DataTable>
          <div>
          <Modal
        title="Ajouter un offre d'emploie"
        visible={showModal}
        onCancel={handleCloseModal}
        footer={[
          <Button key="cancel" className='annuler' onClick={handleCloseModal}>
            Annuler
          </Button>,
          <Button key="postuler" className='orange' onClick={handleSave}>
            Postuler
          </Button>,
        ]}
      >
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="joboffre_nom">job_name:</label>
            <input type="text" id="joboffre_nom" className='text' name="joboffre_nom" placeholder='Entrer job offer name' required />
          </div>
          <div className="form-group">
            <label htmlFor="joboffre">joboffre:</label>
            <input type="file" id="joboffre" name="joboffre" className='file' placeholder='Entrer job offer'  accept=".pdf,.doc,.docx" required />
          </div>
          <p>*veuillez remplir les champs correctement</p>
        </form>
      </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrudDemo;