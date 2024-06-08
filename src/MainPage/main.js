import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "./Main.css";
import logo from '../assests/images/Vector.png'
import { FaEllipsisV } from 'react-icons/fa';
import Select from 'react-select';
import { database } from "./config"; // Make and sure to export and import Firebase configuration correctly
import { addDoc, collection, deleteDoc, query, where, doc, getDocs, updateDoc } from "firebase/firestore";

function Home() {
    // State hooks for managing form inputs, data, filter, and search query
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [getData, setGetData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState('');
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

    const value = collection(database, 'toDo'); // Reference to Firestore collection
    const dropdownRefs = useRef([]); // Reference to manage dropdown elements

    // Function to fetch and filter data based on the status filter
    const fetchData = async (filterStatus) => {
        try {
            let q;
            if (filterStatus) {
                q = query(collection(database, 'toDo'), where('status', '==', filterStatus));
            } else {
                q = query(collection(database, 'toDo'));
            }

            const datas = await getDocs(q);
            setGetData(datas.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    };

    // useEffect to fetch data when component mounts or filter changes
    useEffect(() => {
        fetchData(filter);
    }, [filter]);

    // Function to update the status of a document
    const handleUpdate = async (id, status) => {
        try {
            const updateData = doc(database, 'toDo', id);
            await updateDoc(updateData, { status });
            fetchData(filter);
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    // Function to handle form submission and add a new document
    const onSubmit = async () => {
        try {
            if (title && description) {
                await addDoc(value, { title, description });
                fetchData(filter); // Refresh data after adding new document
                setTitle(''); // Clear input fields
                setDescription('');
            } else {
                alert("Please provide both title and description.");
            }
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    // Function to handle search input changes and filter data locally
    const handleInputChange = (event) => {
        const newSearchQuery = event.target.value;
        setSearchQuery(newSearchQuery);
        if (newSearchQuery !== '') {
            const newFilteredItems = getData.filter(item =>
                item?.title?.toLowerCase().includes(newSearchQuery.toLowerCase()) ||
                item?.description.toLowerCase().includes(newSearchQuery.toLowerCase()) ||
                item?.status.toLowerCase().includes(newSearchQuery.toLowerCase())
            );
            setGetData(newFilteredItems);
        } else {
            fetchData(filter); // Reset data to the full list if search is cleared
        }
    };

    // Function to toggle dropdown menu visibility
    const toggleDropdown = (index) => {
        setOpenDropdownIndex(openDropdownIndex === index ? null : index);
    };

    // Function to handle dropdown menu actions and close dropdown
    const closeDropdownFn = (id, status) => {
        handleUpdate(id, status);
        setOpenDropdownIndex(null);
    };

    // Function to clear local storage and logout
    const logout = () => {
        localStorage.clear();
        // Redirect or further logout actions here
    };

    // Options for the filter dropdown menu
    const sortData = [
        { name: "Complete", value: "complete" },
        { name: "Favourite", value: "favorite" },
        { name: "Delete", value: "delete" },
    ];

    return (
        <div>
            {/* Logo */}
            <img className="logo" src={logo} alt="Logo" />

            <Row>
                <Col lg={5}>
                    <h2 className="todo">TODO</h2>
                    <h4 className="lorum">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet at eleifend feugiat vitae faucibus nibh dolor dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet at eleifend feugiat vitae faucibus nibh dolor dui.Aliquet at eleifend feugiat vitae faucibus nibh dolor dui.  </h4>
                    <Form>
                        <Form.Group controlId="formTitle" className="input-container">
                            <Form.Control
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                placeholder="Title"
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescription" className="input-container">
                            <Form.Control
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                type="text"
                                placeholder="Description"
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            className="submit mt-3"
                            onClick={onSubmit}
                        >
                            ADD
                        </Button>
                    </Form>
                </Col>

                <Col lg={2} className="d-none d-lg-block">
                    <hr className="vertical-line" />
                </Col>

                <Col lg={5} >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <h2 className="list">TODO LIST</h2>

                        </div>
                        <div className="indigo">
                            <Button variant="primary" onClick={logout}>Logout</Button>

                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: 'space-around' }}>
                        <div className="search-bar">
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search By Title"
                                value={searchQuery}
                                onChange={handleInputChange}
                            />
                            <span className="search-icon">
                                <img src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png" alt="Search" />
                            </span>
                        </div>
                        <div className="sort">
                            <Select
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        width: '200px',
                                    }),
                                    zIndex: 100
                                }}
                                options={sortData.map((item) => ({
                                    label: item.name,
                                    value: item.value
                                }))}
                                placeholder="Filter By"
                                onChange={(selectedOption) => setFilter(selectedOption.value)}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className="datatable">
                            {getData.map((item, index) => (
                                <div key={index}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                        <div>
                                            <h5>{item.title}</h5>
                                            <p>{item.description}</p>
                                            <p>{item.status}</p>
                                        </div>
                                        <div
                                            className="ml-auto sm:ml-3 relative"
                                            style={{ position: 'relative' }}
                                            ref={(el) => (dropdownRefs.current[index] = el)}
                                        >
                                            {openDropdownIndex === index && (
                                                <div className="dropdown-menu show">
                                                    <a
                                                        href="#"
                                                        className="dropdown-item"
                                                        onClick={() => closeDropdownFn(item.id, 'complete')}
                                                    >
                                                        Complete
                                                    </a>
                                                    <a
                                                        href="#"
                                                        className="dropdown-item"
                                                        onClick={() => closeDropdownFn(item.id, 'favorite')}
                                                    >
                                                        Favourite
                                                    </a>
                                                    <a
                                                        href="#"
                                                        className="dropdown-item"
                                                        onClick={() => closeDropdownFn(item.id, 'delete')}
                                                    >
                                                        Delete
                                                    </a>
                                                </div>
                                            )}
                                            <button
                                                onClick={() => toggleDropdown(index)}
                                                className="btn btn-link p-0 text-dark dot"
                                            >
                                                <FaEllipsisV />
                                            </button>
                                        </div>
                                    </div>
                                    <hr className="line" />
                                </div>
                            ))}
                        </div>
                    </div>
                </Col>
            </Row>

        </div>
    );
}

export default Home;
