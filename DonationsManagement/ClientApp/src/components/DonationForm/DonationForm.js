import React, { useContext, useEffect, useState, useRef} from "react";
import { AppContext } from '../../providers/AppProvider'
import './DonationForm.scss';

const DonationForm = ({item, isEdit}) => {
    const { formValue, setFormValue, updateDonation } = useContext(AppContext);

    const
    entityNameRef = useRef(),
    entityTypeRef = useRef(),
    sumRef = useRef(),
    designationRef = useRef(),
    currencyTypeRef = useRef(),
    rateConversionRef = useRef();

    const formOnChange =(e) => {
        var val = e.target.value;
        setFormValue({...formValue, [e.target.name] : val});
    };

    function clearDonation() {
        if(isEdit==="true")
        {
            setFormValue({...item, isEdit: true });
        }
        else{
            setFormValue({...formValue, entityName: "",
             id:null,
             entityType: "",
             sum: "",
             designation: "",
             conditions: "",
             currencyType: "",
             rateConversion: ""
            });
        }
    };

    function onInputFocus(ref) {
        if (!ref.current)
            return;

        return (e) => {
            if (ref.current.classList.value.includes('error')) {
                ref.current.classList.remove('error');
            }
        }
    }

    const validateInputs =() => {
        var formHasErrors= false;
        var inputValue = entityNameRef.current.value;
        var regaxEntityName= "^[A-Za-z\u0590-\u05fe 0-9]+$";
        if (!inputValue.trim().match(new RegExp(regaxEntityName))) {
            entityNameRef.current.classList.add('error');
            formHasErrors= true;
        }

        inputValue = sumRef.current.value;
        var regaxFloatNum ="^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$";

        if (!inputValue.trim().match(new RegExp(regaxFloatNum))) {
            sumRef.current.classList.add('error');
            formHasErrors= true;
        }

        inputValue = rateConversionRef.current.value;
        if (!inputValue.trim().match(new RegExp(regaxFloatNum))) {
            rateConversionRef.current.classList.add('error');
            formHasErrors= true;
        }

        const requiredRefsArray = [entityNameRef, entityTypeRef, sumRef, designationRef, currencyTypeRef, rateConversionRef ];
        requiredRefsArray.forEach((ref) => {
            if (!ref.current)
                return;

            const inputValue = ref.current.value;
            if (inputValue == null || inputValue == "") {
                ref.current.classList.add('error');
                formHasErrors= true;
            }

        });
        return formHasErrors;
    }

    const saveDonation = ()=>{
        var formHasErrors= validateInputs();
        if (formHasErrors) {
            return;
        }

        updateDonation();
    }

    return (
        <div className="donation-form">
            <div className="inputs-wrapper line-1">
            <div className="input-wrapper">
                <input type="text" id="EntityName" name="entityName" onFocus={onInputFocus(entityNameRef)} ref={entityNameRef} className="input-text" required disabled={!formValue.isEdit} value={formValue.entityName} onChange={formOnChange} />
                <p className="floating-label">שם הישות המדיניות הזרה <span className="required-icon">*</span></p>
            </div>
            <div className="input-wrapper">
                <input type="number" id="Sum" name="sum" onFocus={onInputFocus(sumRef)} ref={sumRef} className="input-text" required disabled={!formValue.isEdit} value={formValue.entityName} className="input-text" required disabled={!formValue.isEdit} value={formValue.sum} onChange={formOnChange} />
                <p className="floating-label">סכום התרומה בש"ח <span className="required-icon">*</span></p>
            </div>
            <div className="input-wrapper">
                <input type="text" id="EntityType" name="entityType" onFocus={onInputFocus(entityTypeRef)} ref={entityTypeRef} className="input-text" required disabled={!formValue.isEdit} value={formValue.entityName} className="input-text" required disabled={!formValue.isEdit} value={formValue.entityType} onChange={formOnChange} />
                <p className="floating-label">סוג הישות המדיניות הזרה <span className="required-icon">*</span></p>
            </div>
            </div>
            <div className="inputs-wrapper line-2">
            <div className="input-wrapper">
                <input type="text" id="designation" name="designation" onFocus={onInputFocus(designationRef)} ref={designationRef} className="input-text" required disabled={!formValue.isEdit} value={formValue.entityName} className="input-text" required disabled={!formValue.isEdit} value={formValue.designation} onChange={formOnChange} />
                <p className="floating-label">ייעוד התרומה <span className="required-icon">*</span></p>
            </div>
            </div>
            <div className="inputs-wrapper line-3">
            <div className="input-wrapper">
                <input type="text" id="Conditions" name="conditions" className="input-text" required disabled={!formValue.isEdit} value={formValue.entityName} className="input-text" disabled={!formValue.isEdit} value={formValue.conditions} onChange={formOnChange} />
                <p className="floating-label">התנאים לתרומה </p>
            </div>
            </div>
            <div className="inputs-wrapper line-4">
            <div className="input-wrapper">
                <input type="text" id="CurrencyType" name="currencyType" onFocus={onInputFocus(currencyTypeRef)} ref={currencyTypeRef} className="input-text" required disabled={!formValue.isEdit} value={formValue.entityName} className="input-text" required disabled={!formValue.isEdit} value={formValue.currencyType} onChange={formOnChange} />
                <p className="floating-label">סוג המטבע <span className="required-icon">*</span> </p>
            </div>
            <div className="input-wrapper">
                <input type="number" id="RateConversion" name="rateConversion" onFocus={onInputFocus(rateConversionRef)} ref={rateConversionRef} className="input-text" required disabled={!formValue.isEdit} value={formValue.entityName} className="input-text" required disabled={!formValue.isEdit} value={formValue.rateConversion} onChange={formOnChange} />
                <p className="floating-label">שער ההמרה <span className="required-icon">*</span> </p>
            </div>
            </div>
            <div className="btns-wrapper">
                <button className="btn white-btn" disabled={!formValue.isEdit} onClick={() => clearDonation()}>ניקוי</button>
                <button className="btn blue-btn" disabled={!formValue.isEdit} onClick={saveDonation}>שמירה</button>
        </div>
        </div>
    )
}

export default DonationForm;