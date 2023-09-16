import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./globalStyles.css";
import "./taskDetails.css";
import { axiosInstance } from "../api/api";
import LoadingIndicator from "./elements/LoadingIndicator";
import { Button, Form } from "react-bootstrap";

const TasksDetails = () => {
	const { taskNameParam, taskId } = useParams();
	const [taskName, setTaskName] = useState(taskNameParam);
	const [description, setDescription] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [showTaskNameError, setShowTaskNameError] = useState(false);
	const [showDescriptionError, setShowDescriptionError] = useState(false);
    const navigate = useNavigate();

	const getTaskDetails = async () => {
		try {
			const response = await axiosInstance.get(`/tasks/get-task/${taskId}`);
			setTaskName(response.data[0].task_name);
			setDescription(response.data[0].description);
			setIsLoading(false);
		} catch (err) {
			console.log(err.response.data.message);
		}
	};

	const handleUpdateTask = async () => {
		if (taskName === "") {
			setShowTaskNameError(true);
			return;
		} else {
			setShowTaskNameError(false);
		}
		if (description === "") {
			setShowDescriptionError(true);
			return;
		} else {
			setShowDescriptionError(false);
		}
		try {
			const res = await axiosInstance.put(`/tasks/modify-task/${taskId}`, {
				task_name: taskName,
				description: description,
			});
            alert("Task Updated Successfully");
		} catch (err) {
			console.log(err.response.data.message);
		}
	};

	useEffect(() => {
		getTaskDetails();
	}, []);

    useEffect(() => {
		if (taskName === "") {
			setShowTaskNameError(true);
		} else {
			setShowTaskNameError(false);
		}
		if (description === "") {
			setShowDescriptionError(true);
		} else {
			setShowDescriptionError(false);
		}
	}, [taskName,description]);

	return (
		<div className="outerContainer">
			<div className="taskDetailsContainer">
				<div className="pageHeading">Update Task Details</div>
				{!isLoading ? (
					<Form className="updateTaskFormContainer">
						<Form.Group className="mb-3">
							<Form.Label>Task Name:</Form.Label>
							<Form.Control
								type="text"
								value={taskName}
								onChange={(e) => setTaskName(e.target.value.trimStart())}
								isInvalid={showTaskNameError}
								size="lg"
							/>
							<Form.Control.Feedback type="invalid">
								Task Name Not Entered:
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group>
							<Form.Label>Description:</Form.Label>
							<Form.Control
								as="textarea"
                                className="taskDescriptionInput"
								value={description}
								onChange={(e) => setDescription(e.target.value.trimStart())}
								isInvalid={showDescriptionError}
								rows={3}
							/>
							<Form.Control.Feedback type="invalid">
								Description cannot be Empty
							</Form.Control.Feedback>
						</Form.Group>
                        <div className="text-center">
                            <Button className="mt-5 w-50 text-center" onClick={handleUpdateTask}>
                                Update
                            </Button>
                        </div>
					</Form>
				) : (
					<LoadingIndicator text="Loading Task Description..." />
				)}
			</div>
		</div>
	);
};

export default TasksDetails;
