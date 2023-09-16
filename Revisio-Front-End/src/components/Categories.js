import React, { useEffect, useState } from "react";
import {  Navigate, useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/api";
import { useAuthContext } from "../context/AuthContext";
import "./globalStyles.css";
import "./categoriesPage.css"
import CCard from "./elements/CCard";
import { Button,Form } from "react-bootstrap";
import LoadingIndicator from "./elements/LoadingIndicator";
import Logout from "./Logout";

const Categories = () => {
	const { user } = useAuthContext();
	const navigate = useNavigate();
	const [listCategories, setListCategories] = useState([]);
	const [newCategoryName, setNewCategoryName] = useState("");
	const [showCategoryError,setShowCategoryEmptyError] =  useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const handleAddCategory = async (e) => {
		e.preventDefault();
		if(newCategoryName === "") {
			setShowCategoryEmptyError(true);
			return;
		} else {
			setShowCategoryEmptyError(false);
		}
		try {
			const response = await axiosInstance.post("/categories/add-category", {
				category_name: newCategoryName,
				user_id: user.user_id,
			});
			getCategories();
			// console.log(response.message);
		} catch (error) {
			console.log(error.response.data.message);
		}
	};
	console.log(newCategoryName)
	const getCategories = async () => {
		const response = await axiosInstance.post("/categories/get-categories", {
			user_id: user.user_id,
		});
		setListCategories(response.data);
		setIsLoading(false);
		// console.log(response.data);
	};

	const handleDelete = async (categoryId) => {
        try {
            const response = await axiosInstance.post('/categories/delete-category',{category_id:categoryId});
			getCategories();
			console.log(response.data.message);
        } catch(err){
            console.log(err.response.data.message);
        }
    }

	useEffect(() => {
		getCategories();
	}, []);

	useEffect(() => {
        if (newCategoryName !== "") setShowCategoryEmptyError(false);
    }, [newCategoryName])
	return (
		<div className="outerContainer">
			<Logout/>
			<div className="pageHeading">Categories</div>
			<div>
				<Form className="addCategoryFormContainer">
					<Form.Group controlId="newCategoryName">
						<Form.Label>Add New Category:</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Category Name"
							value = {newCategoryName}
							// required
							onChange={(e) => setNewCategoryName(e.target.value.trimStart())}
							isInvalid = {showCategoryError}
							className="mt-2 mb-2"
						/>
						<Form.Control.Feedback type="invalid">
							Category name not Entered
						</Form.Control.Feedback>
						<div className="d-flex justify-content-center">
							<Button className="w-50"  variant="primary" onClick={handleAddCategory}>Add Category</Button>
						</div>
					</Form.Group>
				</Form>
			</div>
			{isLoading ? (
				<LoadingIndicator text={"Loading Categories...."}/>
			) : (
				<div className="d-flex justify-content-around flex-wrap">
					{listCategories.map((item, idx) => {
						return (
							<div>
								<div
									onClick={() =>
										navigate(`${item.category_name}/${item.category_id}`)
									}
								>
									<CCard id={item.category_id} heading={item.category_name}/>
								</div>
								<Button className="btn btn-danger mt-1 mb-2 w-100" onClick={ () => handleDelete(item.category_id)}>Delete</Button>
							</div>
						);
					})}
				</div>
			)}
			{
				(listCategories.length === 0 && !isLoading) ? <div className="text-center w-100">No Categories Added</div> : <span></span>
			}
		</div>
	);
};

export default Categories;
