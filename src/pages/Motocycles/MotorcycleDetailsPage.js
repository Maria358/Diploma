import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, onSnapshot, collection, addDoc } from 'firebase/firestore';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import './MotorcycleDetailsPage.css';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';


const MotorcycleDetailsPage = () => {
    const { motorcycleId } = useParams();
    const [motorcycle, setMotorcycle] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        phone: '',
        town: '',
        model: '',
        color: '',
        engineSize: '',
        features: [],
        deliveryDate: null,
        paymentMethod: '',
        specialRequests: ''
    });
    let toast;

    useEffect(() => {
        const fetchMotorcycle = async () => {
            const db = getFirestore();

            const unsub = onSnapshot(doc(db, 'motorcycles', motorcycleId), (doc) => {
                setMotorcycle(doc.data());
                return unsub;
            });
        };

        fetchMotorcycle();
    }, [motorcycleId]);

    const handleOrder = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const db = getFirestore();
            const ordersCollection = collection(db, 'orders');

            const newOrder = {
                motorcycleId: motorcycleId,
                createdAt: new Date().toISOString(),
                ...formData
            };

            await addDoc(ordersCollection, newOrder);

            toast.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Order created successfully! Thew owner will contact you soon!',
                life: 3000,
            });

            console.log('Order created successfully!');
            setIsModalOpen(false);
        } catch (error) {
            toast.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error creating order',
                life: 3000,
            });

            console.error('Error creating order:', error);
        }
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    if (!motorcycle) {
        return <div>Loading...</div>;
    }

    return (
        <div className="motorcycle-info-container">
            <div className="motorcycle-photo">
                <img
                    alt="Motorcycle"
                    src={motorcycle.Photo}
                    className="motorcycle-image"
                />
            </div>
            <div className="motorcycle-details">
                <h1 className="motorcycle-name">{motorcycle.Brand}</h1>
                <div className="motorcycle-details">
                    {Object.entries(motorcycle).map(([key, value]) => (
                        key !== 'Photo' && key !== 'description' && (
                            <div key={key} className="motorcycle-info">
                                <span className="motorcycle-label">{key}:</span>
                                <span className="motorcycle-value">{value}</span>
                            </div>
                        )
                    ))}
                </div>
                <Button
                    label="Order the bike"
                    className="p-button-outlined p-button-success mt-5"
                    onClick={handleOrder}
                />
            </div>

            <Dialog
                visible={isModalOpen}
                onHide={handleCloseModal}
                header="Order Bike"
                style={{ width: '400px' }}
                footer={
                    <div>
                        <Button
                            label="Confirm"
                            className="p-button-success"
                            onClick={handleFormSubmit}
                        />
                        <Button
                            label="Cancel"
                            className="p-button-secondary"
                            onClick={handleCloseModal}
                        />
                    </div>
                }
            >
                <form onSubmit={handleFormSubmit}>
                    <div className="field">
                        <span className="p-float-label">
                            <label htmlFor="name">Name:</label>
                            <InputText
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </span>
                    </div>
                    <div className="field">
                        <span className="p-float-label">
                            <label htmlFor="surname">Surname:</label>
                            <InputText
                                id="surname"
                                name="surname"
                                value={formData.surname}
                                onChange={handleInputChange}
                            />
                        </span>
                    </div>
                    <div className="field">
                        <span className="p-float-label">
                            <label htmlFor="phone">Phone:</label>
                            <InputText
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </span>
                    </div>
                    <div className="field">
                        <span className="p-float-label">
                            <label htmlFor="town">Town:</label>
                            <InputText
                                id="town"
                                name="town"
                                value={formData.town}
                                onChange={handleInputChange}
                            />
                        </span>
                    </div>
                    <div className="field">
                        <span className="p-float-label">
                            <label htmlFor="model">Motorcycle Model:</label>
                            <InputText
                                id="model"
                                name="model"
                                value={formData.model}
                                onChange={handleInputChange}
                            />
                        </span>
                    </div>
                    <div className="field">
                        <span className="p-float-label">
                            <label htmlFor="color">Color:</label>
                            <InputText
                                id="color"
                                name="color"
                                value={formData.color}
                                onChange={handleInputChange}
                            />
                        </span>
                    </div>
                    <div className="field">
                        <span className="p-float-label">
                            <label htmlFor="engineSize">Engine Size:</label>
                            <InputText
                                id="engineSize"
                                name="engineSize"
                                value={formData.engineSize}
                                onChange={handleInputChange}
                            />
                        </span>
                    </div>
                    <div className="field">
                        <label htmlFor="paymentMethod">Payment Method:</label>
                        <Dropdown
                            id="paymentMethod"
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            options={[
                                { label: 'Cash', value: 'cash' },
                                { label: 'Credit Card', value: 'creditCard' },
                                { label: 'Financing', value: 'financing' },
                            ]}
                            onChange={handleSelectChange}
                        />
                    </div>
                </form>
            </Dialog>

            <Toast ref={(el) => (toast = el)} />
        </div>
    );
};

export default MotorcycleDetailsPage;
