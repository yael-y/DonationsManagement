import React, { useContext } from "react";
import { AppContext } from '../../providers/AppProvider'
import './AddDonation.scss';
import DonationForm from '../DonationForm/DonationForm'

const AddDonation = () => {
    const { formValue, setFormValue } = useContext(AppContext);

    const addDonationClick = () => {
        setFormValue({...formValue, entityName: "",
        entityType: "",
        sum: "",
        designation: "",
        conditions: "",
        currencyType: "",
        rateConversion: "",
        isEdit: true,
        id:null
       });
   };

    return (
        <div className="add-donation">
                <button className="btn blue-btn" onClick={addDonationClick}>הוספת תרומה</button>
                {formValue!= null && formValue.id == null ?
                    (<div className="form-wrapper">
                        <h3 className="title">הוספת דיווח על עמותה</h3>
                        <DonationForm isEdit="false"/>
                        </div>)
                    : null}
            </div>
    )
}

export default AddDonation;