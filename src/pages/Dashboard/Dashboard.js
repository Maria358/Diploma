import { useEffect, useState } from 'react';
import { getFirestore, collection, onSnapshot, query, where, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import './Dashboard.css';
import { Toast } from 'primereact/toast';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { classNames } from 'primereact/utils';



const MotorcyclesList = ({ selectedCategory, searchQuery }) => {
    const [motorcycles, setMotorcycles] = useState(null);
    const navigate = useNavigate();
    const db = getFirestore();
    let toast;

    const handleSeeDetails = (motorcycleId) => {
        navigate(`/motorcycle/${motorcycleId}`);
    };

    const handleAddToBucket = async (motoDocumentId, userId) => {
        try {
            const bucketCollection = collection(db, 'bucket');
            const docRef = await addDoc(bucketCollection, { motoDocumentId: motoDocumentId, userId: userId });
            toast.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Selected motocycle was added to bucket!',
                life: 3000,
            });
            console.log('Item added to bucket with ID:', docRef.id);
        } catch (error) {
            console.error('Error adding item to bucket:', error);
            toast.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to add item to bucket!',
                life: 3000,
            });
        }
    };

    const MotorcycleCard = ({ motorcycle, id, handleSeeDetails, isFavorite }) => {
        const footer = (
            <div className="flex justify-content-space-between">
                <Button
                    label="See details"
                    icon="pi pi-check"
                    className="p-button-primary mr-1"
                    onClick={() => handleSeeDetails(id)}
                />
                <Button
                    label="Add to bucket"
                    icon="pi pi-times"
                    className="p-button-outlined p-button-success"
                    onClick={() => handleAddToBucket(id)}
                />
                <Button
                    icon={classNames('pi', { 'pi-heart ': !isFavorite, 'pi-heart red-heart': isFavorite })}
                    className="p-button-rounded p-button-text"
                    // onClick={() => handleAddToFavorites(id)}
                />
            </div>
        );

        return (
            <Card
                title={motorcycle.Brand}
                subTitle={motorcycle.Model}
                footer={footer}
                header={<img alt="Card" src={motorcycle.Photo} className="image" />}
                className="motorcycle-card"
            >
                <div>{motorcycle.description}</div>
            </Card>
        );
    };

    useEffect(() => {
        const motorcyclesCollection = collection(db, 'motorcycles');
        let motorcyclesQuery = query(motorcyclesCollection);

        if (selectedCategory !== 'All') {
            motorcyclesQuery = query(motorcyclesCollection, where('Category', '==', selectedCategory));
        }

        if (searchQuery) {
            motorcyclesQuery = query(
                motorcyclesCollection,
                where('Brand', '>=', searchQuery),
                where('Brand', '<=', searchQuery + '~')
            );
        }

        const unsubscribe = onSnapshot(motorcyclesQuery, (snapshot) => {
            const updatedMotorcycles = snapshot.docs.map((doc) => ({ docId: doc.id, data: doc.data() }));
            setMotorcycles(updatedMotorcycles);
        });

        return () => unsubscribe();
    }, [selectedCategory, searchQuery]);

    return (
        <div className="card flex justify-content-center m-3 gap-5 flex-wrap">
            {motorcycles &&
                motorcycles.map(({ data, docId }, idx) => (
                    <MotorcycleCard
                        key={idx}
                        motorcycle={data}
                        id={docId}
                        handleSeeDetails={handleSeeDetails}
                        handleAddToBucket={handleAddToBucket}
                    />
                ))}

            <Toast ref={(el) => (toast = el)} />
        </div>
    );
};

export default MotorcyclesList;