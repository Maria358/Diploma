

import './Registration.css';
import { Toast } from 'primereact/toast';
import { auth, db } from '../../index';
import {
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useAuthContext } from '../../contexts/auth.context';
import { Card } from 'primereact/card';

const RegistrationForm = () => {
const { signUpWithEmailAndPassword } = useAuthContext();
const [role, setRole] = useState('customer');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
let toast;

const handleEmailChange = (e) => {
    setEmail(e.target.value);
};

const handlePasswordChange = (e) => {
    setPassword(e.target.value);
};

const handleRegistration = async (e) => {
    e.preventDefault();
    try {
        await signUpWithEmailAndPassword(email, password);
    }
    catch (e) {
        toast.show({
            severity: 'error',
            summary: 'Error',
            detail: `Invalid username or password!: ${e}`,
            life: 3000,
        });
    }
};

const handleRoleChange = (e) => {
    setRole(e.value);
};

    return (
        <div className="registration-page">
            <div className="registration-content">
                <Card title="Join Our Motorcycle Community" className="registration-card">
                    <form onSubmit={handleRegistration}>
                        <div className="p-fluid mb-2">
                            <label htmlFor="email">Email:</label>
                            <InputText
                                id="email"
                                className="mb-2"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                        </div>
                        <div className="p-fluid mb-4">
                            <label htmlFor="password">Password:</label>
                            <InputText
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                        <div className="p-field mb-4">
                            <label>Role:</label>
                            <div className="p-formgroup-inline">
                                <div className="p-field-radiobutton">
                                    <RadioButton
                                        className="mr-2"
                                        inputId="customer"
                                        name="role"
                                        value="customer"
                                        checked={role === 'customer'}
                                        onChange={handleRoleChange}
                                    />
                                    <label htmlFor="customer">I would like to buy motorcycles</label>
                                </div>
                                <div className="p-field-radiobutton">
                                    <RadioButton
                                        className="mr-2"
                                        inputId="owner"
                                        name="role"
                                        value="owner"
                                        checked={role === 'owner'}
                                        onChange={handleRoleChange}
                                    />
                                    <label htmlFor="owner">I would like to sell motorcycles</label>
                                </div>
                            </div>
                        </div>
                        <Button type="submit" label="Register" className="p-mt-3 button" />
                    </form>
                </Card>
            </div>
            <Toast ref={(el) => (toast = el)} />
        </div>
    );
};

export default RegistrationForm;


// import React, { useEffect, useState } from 'react';
// import { Form, Field } from 'react-final-form';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { RadioButton } from 'primereact/radiobutton';
// import { Dropdown } from 'primereact/dropdown';
// import { Calendar } from 'primereact/calendar';
// import { Password } from 'primereact/password';
// import { Checkbox } from 'primereact/checkbox';
// import { Dialog } from 'primereact/dialog';
// import { Divider } from 'primereact/divider';
// import { classNames } from 'primereact/utils';
// import { countries as list } from '../../countries/countries'
// import './Registration.css';
// import { useAuthContext } from '../../contexts/auth.context';

// export const RegistrationForm = () => {
//     const [countries, setCountries] = useState([]);
//     const [showMessage, setShowMessage] = useState(false);
//     const [formData, setFormData] = useState({});

//     const { signUpWithEmailAndPassword } = useAuthContext();
//     const [role, setRole] = useState('customer');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     let toast;

//     const handleEmailChange = (e) => {
//         setEmail(e.target.value);
//     };

//     const handlePasswordChange = (e) => {
//         setPassword(e.target.value);
//     };

//     const handleRegistration = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await signUpWithEmailAndPassword(email, password);
//             console.log('res', response)
//         }
//         catch (e) {
//             toast.show({
//                 severity: 'error',
//                 summary: 'Error',
//                 detail: `Invalid username or password!: ${e}`,
//                 life: 3000,
//             });
//         }
//     };

//     const handleRoleChange = (e) => {
//         setRole(e.value);
//     };

//     useEffect(() => {
//         setCountries(list);
//     }, []);

//     const validate = (data) => {
//         let errors = {};

//         if (!data.name) {
//             errors.name = 'Name is required.';
//         }

//         if (!data.email) {
//             errors.email = 'Email is required.';
//         }
//         else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
//             errors.email = 'Invalid email address. E.g. example@email.com';
//         }

//         if (!data.password) {
//             errors.password = 'Password is required.';
//         }

//         if (!data.accept) {
//             errors.accept = 'You need to agree to the terms and conditions.';
//         }

//         return errors;
//     };

//     const onSubmit = (data, form) => {
//         setFormData(data);
//         setShowMessage(true);

//         form.restart();
//     };

//     const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
//     const getFormErrorMessage = (meta) => {
//         return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
//     };

//     const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
//     const passwordHeader = <h6>Pick a password</h6>;
//     const passwordFooter = (
//         <React.Fragment>
//             <Divider />
//             <p className="mt-2">Suggestions</p>
//             <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
//                 <li>At least one lowercase</li>
//                 <li>At least one uppercase</li>
//                 <li>At least one numeric</li>
//                 <li>Minimum 8 characters</li>
//             </ul>
//         </React.Fragment>
//     );

//     return (
//         <div className="form-demo registration-page">
//             <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
//                 <div className="flex align-items-center flex-column pt-6 px-3">
//                     <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
//                     <h5>Registration Successful!</h5>
//                     <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
//                         Your account is registered under name <b>{formData.name}</b> ; it'll be valid next 30 days without activation. Please check <b>{formData.email}</b> for activation instructions.
//                     </p>
//                 </div>
//             </Dialog>

//             <div className="flex justify-content-center registration-card">
//                 <div className="card registration-card">
//                     <h3 className="text-center">Join Our Community!</h3>
//                     <Form onSubmit={onSubmit} initialValues={{ name: '', email: '', password: '', date: null, country: null, accept: false }} validate={validate} render={({ handleSubmit }) => (
//                         <form onSubmit={handleSubmit} className="p-fluid">
//                             <Field name="name" render={({ input, meta }) => (
//                                 <div className="field">
//                                     <span className="p-float-label">
//                                         <InputText id="name" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
//                                         <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Name*</label>
//                                     </span>
//                                     {getFormErrorMessage(meta)}
//                                 </div>
//                             )} />
//                             <Field name="email" render={({ input, meta }) => (
//                                 <div className="field">
//                                     <span className="p-float-label p-input-icon-right">
//                                         <i className="pi pi-envelope" />
//                                         <InputText id="email" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
//                                         <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Email*</label>
//                                     </span>
//                                     {getFormErrorMessage(meta)}
//                                 </div>
//                             )} />
//                             <Field name="password" render={({ input, meta }) => (
//                                 <div className="field">
//                                     <span className="p-float-label">
//                                         <Password id="password" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} header={passwordHeader} footer={passwordFooter} />
//                                         <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Password*</label>
//                                     </span>
//                                     {getFormErrorMessage(meta)}
//                                 </div>
//                             )} />
//                             <Field name="date" render={({ input }) => (
//                                 <div className="field">
//                                     <span className="p-float-label">
//                                         <Calendar id="date" {...input} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />
//                                         <label htmlFor="date">Birthday</label>
//                                     </span>
//                                 </div>
//                             )} />
//                             <Field name="country" render={({ input }) => (
//                                 <div className="field">
//                                     <span className="p-float-label">
//                                         <Dropdown id="country" {...input} options={countries} optionLabel="name" />
//                                         <label htmlFor="country">Country</label>
//                                     </span>
//                                 </div>
//                             )} />

//                             <div className="p-field mb-4">
//                                 <label>Role:</label>
//                                 <div className="p-formgroup-inline">
//                                     <div className="p-field-radiobutton">
//                                         <RadioButton
//                                             className="mr-2"
//                                             inputId="customer"
//                                             name="role"
//                                             value="customer"
//                                             checked={role === 'customer'}
//                                             onChange={handleRoleChange}
//                                         />
//                                         <label htmlFor="customer">I would like to buy motorcycles</label>
//                                     </div>
//                                     <div className="p-field-radiobutton">
//                                         <RadioButton
//                                             className="mr-2"
//                                             inputId="owner"
//                                             name="role"
//                                             value="owner"
//                                             checked={role === 'owner'}
//                                             onChange={handleRoleChange}
//                                         />
//                                         <label htmlFor="owner">I would like to sell motorcycles</label>
//                                     </div>
//                                 </div>
//                             </div>

//                             <Field name="accept" type="checkbox" render={({ input, meta }) => (
//                                 <div className="field-checkbox">
//                                     <Checkbox inputId="accept" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
//                                     <label htmlFor="accept" className={classNames({ 'p-error': isFormFieldValid(meta) })}>I agree to the terms and conditions*</label>
//                                 </div>
//                             )} />

//                             <Button type="submit" label="Submit" className="mt-2" />
//                         </form>
//                     )} />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default RegistrationForm;

