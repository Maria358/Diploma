import React from 'react';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { useRoleContext } from '../../contexts/role.context';

const AboutPage = () => {
    const { role } = useRoleContext();

    if (role == "customer") {
        return (
            <div className="about-page">
                <h1>About Our Motorcycle Shop</h1>

                <h2>For Customers</h2>
                <Card className="p-card">
                    <p>
                        Welcome to our Motorcycle Shop! We are dedicated to providing motorcycle enthusiasts with a platform to discover and purchase their dream bikes. Whether you're a seasoned rider or a beginner looking to embark on your two-wheeled adventures, we've got you covered.
                    </p>
                    <p>
                        Our shop features a wide selection of motorcycles from various brands, styles, and price ranges. You can browse through our inventory, view detailed information and photos of each bike, and even connect with sellers to ask questions or negotiate deals.
                    </p>
                    <p>
                        With our user-friendly interface and powerful search functionality, finding the perfect motorcycle has never been easier. Simply filter your search based on your preferences, such as brand, model, year, and more, to discover the motorcycles that match your criteria.
                    </p>
                    <p>
                        Once you find the motorcycle of your dreams, you can securely complete the purchase through our platform. We prioritize the safety and satisfaction of our customers, so you can trust that your transaction will be smooth and secure.
                    </p>
                    <p>
                        Start your motorcycle journey with us today and explore our wide range of bikes. Get ready to hit the road and experience the thrill of riding on two wheels!
                    </p>
                </Card>
            </div>
        )
    }
    return (
        <div className="about-page">
            <h1>About Our Motorcycle Shop</h1>

            <h2>For Owners</h2>
            <Card className="p-card">
                <p>
                    Welcome, motorcycle owners! Our Motorcycle Shop is not only a place for customers but also a platform for you to showcase and sell your beloved bikes. We understand that your motorcycles hold sentimental value and deserve to be in the hands of passionate riders.
                </p>
                <p>
                    By joining our community of owners, you gain the opportunity to reach a wide audience of potential buyers. Our platform allows you to create detailed listings for your motorcycles, including specifications, photos, and pricing information, ensuring that interested customers have all the necessary details to make an informed decision.
                </p>
                <p>
                    Selling through our shop is convenient and hassle-free. We handle the technical aspects of managing listings and connecting you with potential buyers. You can focus on providing accurate information about your motorcycles and interacting with interested customers through our messaging system.
                </p>
                <p>
                    Our goal is to connect you with motorcycle enthusiasts who will appreciate and care for your bikes as much as you do. We strive to create a trusted and transparent environment where both buyers and sellers can enjoy a seamless experience.
                </p>
                <p>
                    Join our community of owners today and let your motorcycles find their new riders. We look forward to helping you showcase your motorcycles and make successful sales.
                </p>
            </Card>
        </div>
    );
};

export default AboutPage;

