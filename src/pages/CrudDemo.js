import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import '../../src/pages/Crud.css'
const CrudDemo = () => {
  const [visible, setVisible] = useState(false);
  const [jobOffers, setJobOffers] = useState([]);
  const toast = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button label="Nouveau" icon="pi pi-plus" className="mon-bouton-orange mr-2" onClick={handleApplyClick} />
          <Button label="Supprimer" icon="pi pi-trash" className="mon-bouton-rouge" />
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
        <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" />
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

    setShowModal(false);

  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:10082/api/example/joboffer');
      const data = await response.json();
      console.log(data);
      setJobOffers(data);
    };

    fetchData();
  }, []);

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />
          <Toolbar className="mb-4" left={leftToolbarTemplate} />
          <DataTable
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
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
            <Column field="content" header="Content" sortable headerStyle={{ width: '14%', minWidth: '10rem' }} />
            <Column body={actionBodyTemplate} headerStyle={{ width: '6rem' }}></Column>
          </DataTable>
          <div>
            {showModal && (
              <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={handleCloseModal}>&times;</span>
                
                <form  onSubmit={handleSave}>
                  <label htmlFor="job_name">job_name:</label>
                  <input type="text" id="joboffre_nom" name="joboffre_nom" required />
                  <label htmlFor="joboffre">joboffre:</label>
                  <input type="file" id="joboffre" name="joboffre" accept=".pdf,.doc,.docx" required />
                  <button type="submit" className="butt" >Envoyer</button>
                </form>
                <p>*veuillez remplir les champs correctement</p>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrudDemo;