import React, { useContext, useEffect, useState } from "react";
import { AppContext } from '../../providers/AppProvider'
import DonationForm from "../DonationForm/DonationForm";
import './DonationsList.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt , faTrashAlt, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const DonationList = () => {
    const { donationsList, formValue,  setFormValue, deleteDonation} = useContext(AppContext);

    function openDetails(item) {
        if(formValue != null && formValue.id== item.id){
            setFormValue(null);
        }
        else{
        setFormValue({...item, isEdit:false});
        }
    }

    function editDonation(e, item){
        e.stopPropagation();
        setFormValue({...item, isEdit:true});
    }

    function removeDonation(e, id) {
        e.stopPropagation();
        var confirm = window.confirm("האם אתה בטוח שברצונך למחוק תרומה זו?");
if(confirm==true){
    deleteDonation(id);
}
    }
      
    function detailsOpen(item){
        return formValue != null && formValue.id== item.id;
    }

      return (
        <div className="donations-list">
            <h2>רשימת תרומות</h2>
            {donationsList != null ?
                <div className="list">
                    {donationsList.map((item, i) => {
                        return (<div key={i} className={"item-wrapper" + (formValue !=null && item.id == formValue.id? " open" : "")}>
                            <a className="item" onClick={() => openDetails(item)}>
                                <div className="details">
                                    <p className="entity-name">{item.entityName}</p>
                                    <p className="sum">{item.sum}</p>
                                </div>
                                <div className="btns">
                                <button href="javascript:" onClick={(e) => editDonation(e,item)} className="edit-btn"><FontAwesomeIcon icon={faPencilAlt} /></button>
                                <button href="javascript:" onClick={(e) => removeDonation(e, item.id)} className="remove-btn"><FontAwesomeIcon icon={faTrashAlt} /></button>
                                    <span className="line"></span>
                                    <span className="arrow-icon"><FontAwesomeIcon icon={detailsOpen(item)? faAngleUp : faAngleDown} /></span>
                                </div>
                            </a>
                            {detailsOpen(item)?
                                <div className="more-details">
                                        <DonationForm item={item} isEdit="true"/>
                                </div>: null}
                        </div>)
                    })}
                </div>
                : <h3>לא נמצאו תרומות</h3>}
        </div>
    )
}

export default DonationList;