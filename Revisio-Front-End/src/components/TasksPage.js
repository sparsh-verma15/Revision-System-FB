import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { axiosInstance } from "../api/api";
import LoadingIndicator from "./elements/LoadingIndicator";
import { Button, Form, Row, Col } from "react-bootstrap";
import './globalStyles.css'
import './tasksPage.css'
import Logout from "./Logout";

const TasksPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [isChecked, setIsChecked] = useState(false);
    const [listTasks, setListTasks] = useState([]);
    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [showTaskNameError, setShowTaskNameError] = useState(false);
    const [showDescriptionError, setShowDescriptionError] = useState(false);


    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
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
            const response = await axiosInstance.post('/tasks/create-task', {
                task_name: taskName,
                description: description,
                is_completed: isChecked,
                category_id: params.categoryId
            });
            getTasks();
            setTaskName("");
            setDescription("");
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    const getTasks = async () => {
        try {
            const response = await axiosInstance.get(`/tasks/get-tasks/${params.categoryId}`);
            setListTasks(response.data);
            setIsLoading(false);
            // console.log(response.data);
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    const handleReviseChange = async (taskId, isComp) => {
        try {
            const response = await axiosInstance.put(`tasks/modify-task/${taskId}`, { is_completed: isComp });
            getTasks();
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    const handleDeleteTask = async (taskId) => {
        try {
            const response = await axiosInstance.post("tasks/delete-task",{task_id:taskId});
            getTasks();
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    useEffect(() => {
        getTasks();
    }, [])

    useEffect(() => {
        if (taskName !== "") setShowTaskNameError(false);
        if (description !== "") setShowDescriptionError(false);
    }, [description, taskName])


    return (
        <div className="outerContainer">
            <Logout/>
            <div className="pageHeading">{params.categoryName}</div>
            <Row className="mt-5">
                <Col xs={12} md = {4}>
                    <div className="addTaskHeading">Add Task</div>
                    <Form className="addTaskFormContainer">
                        <Form.Group>
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
                                value={description}
                                onChange={(e) => setDescription(e.target.value.trimStart())}
                                isInvalid={showDescriptionError}
                                rows={3}
                                className="taskDescriptionInput"
                            />
                            <Form.Control.Feedback type="invalid">
                                Description cannot be Empty
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button className="mt-3 w-100" onClick={handleAddTask}>Add Task</Button>
                    </Form>
                </Col>
                <Col xs={12} md = {8}>
                    <div className="taskListHeading">Task List</div>
                    {
                        isLoading ? <LoadingIndicator text={"Loading Tasks..."} /> :
                            (listTasks.map((item, idx) => {
                                return (
                                    <div id={item.task_id} className="taskCardContainer">
                                        <div className="taskCardHeading" onClick={() => navigate(`/tasks/${item.task_name}/${item.task_id}`)}>{item.task_name}</div>
                                        <div className = "taskDescription"> {item.description}</div>
                                        {/* <div>
                                            {
                                                item.is_completed ?
                                                    <span>This is Revised</span> :
                                                    <span>Revision is Needed</span>
                                            }
                                        </div> */}
                                        <div className="d-flex justify-content-center">
                                            <button className={`isRevisedButton ${item.is_completed ? 'revised':'notRevised'} `} onClick={() => handleReviseChange(item.task_id, !(item.is_completed))}>
                                            {
                                                item.is_completed ?
                                                    <span>Remove from Revised</span> :
                                                    <span>Mark As Revised</span>
                                            }
                                            </button>
                                            <button className="deleteTaskButton" onClick={ () => handleDeleteTask(item.task_id)}>
                                                Delete Task
                                            </button>
                                        </div>
                                    </div>
                                )
                            }))
                    }
                    {
                        (listTasks.length === 0 && !isLoading) ? <div className="text-center w-100">No Tasks Added Yet</div> : <span></span>
                    }
                </Col>
            </Row>




        </div>
    );
};

export default TasksPage;
