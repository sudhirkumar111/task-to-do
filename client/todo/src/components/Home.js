import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import axios from 'axios'
const Home = () => {
    const { register, handleSubmit,reset, formState: { errors }, } = useForm()
    const [tasks, setTask] = useState([]);


    const getTask = async () => {

        const result = await axios.get('http://127.0.0.1:4000/get-task');
        setTask(result.data)
    }

    useEffect(() => {
        getTask();
    })

    const submitTask = async (data) => {
        try {
            const response = await axios.post('http://127.0.0.1:4000/save-task', { "description": data.taskName });
            if (response.status === 200) {
                toast.success(response.data.msg)
            }
            reset({taskName:""})
        }
        catch (error) {
            toast.error("something went wrong")

        }


    }


    const removeTask = async (id) => {
        try {
            const result = await axios.delete('http://127.0.0.1:4000/remove-task', { params: { id } });
            console.log(result)
            if (result.status === 200) {
                toast.warning(result.data.msg)
            }
        }
        catch (error) {
            toast.error("Something went wrong")
        }
    }
    return (

        <>
            <ToastContainer
                autoClose={1000}
            />
            <h1 className="display-5 text-warning">Welcome to TODO </h1>
            <div className="container">
                <div className="row">

                    <div className="col-4">
                        <div className="card" style={{ width: "16rem" }}>
                            <div className="card-body">
                                <form onSubmit={handleSubmit(submitTask)}>
                                    {/* <textarea cols="3" rows="3"></textarea> */}
                                    <label className='h5'>Enter Task</label>
                                    <input {...register("taskName", { required: true })} />
                                    {errors.taskName?.type === "required" && (
                                        <p className="text-danger">Task is required</p>
                                    )}

                                    <button type="submit" className="btn btn-sm btn-success mt-4 ">Add Task</button>
                                </form>
                            </div>
                        </div>

                    </div>
                    <div className="col-8">
                        <table className='table table-striped'>
                            <thead className='text-white'>

                                <th>Task</th>
                                <th>Action</th>

                            </thead>

                            <tbody>
                                {
                                    tasks.length > 0 ? tasks.map(
                                        (task) => {
                                            return (
                                                <tr>

                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button className='btn btn-danger btn-sm' onClick={() => removeTask(task._id)}>Delete</button>
                                                    </td>
                                                </tr>

                                            )
                                        }
                                    ) : <h1 className='text-white'>No task available</h1>
                                }

                            </tbody>
                        </table>

                    </div>
                </div>


            </div>

        </>
    )




}

export default Home