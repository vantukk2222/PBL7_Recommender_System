import React, { useState } from 'react'
import { addAccount } from '../../../ultis/utilsAccount';
import { Link, useNavigate } from 'react-router-dom';
import { SelectComponent } from '../../../components/Select/SelectComponent';
import { Loading } from '../../../components/UI/Loading';
import AdBanner from '../../../components/admin/AdBanner';
import { addCategory } from '../../../ultis/utilsCategory';

const AddCategory = () => {
    const navigate = useNavigate()
    const [userSelect, setUserSelect] = useState({})

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserSelect((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    const [loading, setLoading] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userSelect);
        setLoading(true)
        addCategory(userSelect).then((res) => {
            console.log(res);
            if (res.status == 200 || res.status == 202) {
                alert("Add category successful")

            }
            else {
                alert("Couldn't add category\n ", err.response.data.message)
            }
            setLoading(false)
            navigate("/categories")
        }).catch((err) => {
            console.log("err: ", err.response.data.message);
            alert("Couldn't add category\n" + err.response.data.message)
            setLoading(false)
            navigate("/categories")
        })
    }
    return !loading ? (

        <div className=" flex flex-col justify-start items-center mx-auto bg-slate-200  w-screen h-[550px]  max-w-[1080px]  ">
            <div className='pb-5'>
                <AdBanner name={""} />
            </div>
            <div className="w-[400px] h-2/3 flex items-center justify-center py-10">
            
                <div className="w-full max-w-md p-10 space-y-6 bg-white rounded-lg shadow-md">
                    <Link to="/categories" className="rounded-md border-2 bg-slay-200 px-2 absolute z-10 text-red-400">Back</Link>
                    <h2 className="text-2xl font-bold text-center text-purple-700">
                        Add Category
                    </h2>
                    
                    <form className="space-y-4" onSubmit={handleSubmit}>

                        <div className="flex flex-row">
                            <label htmlFor="name" className="px-4 py-2  w-[125px]">
                                Name{" "}
                            </label>

                            <input
                                type="text"
                                id="name"
                                name="name"
                                onChange={handleInputChange}
                                placeholder="Name"
                                value={userSelect?.name || ""}
                                className="w-full  px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div className='mt-10'>
                            <button
                                type="submit"
                                className="w-full py-2 text-white bg-purple-500 rounded-md hover:bg-purple-600"
                            >
                                Save changes
                            </button>
                            
                        </div>
                    </form>
                </div>

            </div>
            <div className="absolute bottom-0 ">
                <AdBanner name={""} />
            </div>
        </div>
    ) : (
        <div className="flex justify-center">
            <Loading />
        </div>
    )
}

export default AddCategory