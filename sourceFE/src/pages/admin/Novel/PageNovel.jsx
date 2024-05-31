import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../../ultis/convertTime.js";
import Modal from "react-modal";
import {
    AddUserIcon,
    DeleteIcon,
    EditIcon,
    LeftIcon,
    RightIcon,
    SearchIcon,
} from "../../../components/headers/icon.jsx";
import useNovel from "../../../hooks/useNovel.js";
import { getNovels, updateNovel } from "../../../ultis/utilsNovel.js";
import { Loading } from "../../../components/UI/Loading.jsx";
import AdBanner from "../../../components/admin/AdBanner.jsx";
Modal.setAppElement('#root');

const PageNovel = () => {
    
    const { novelData,
        setNovelData,
        listNovel,
        setListNovel,
        filter,
        setFilter,
        page,
        setPage } = useNovel();
    const [isLoading, setIsLoading] = useState(true);
    const searchInputRef = useRef(null);
    const [isShowModal, setIsShowModal] = useState(false);
    const [novelSelect, setNovelSelect] = useState({});
    useEffect(() => {
        setIsLoading(true)
        getNovels(filter)
            .then((res) => {
                console.log("call api", res);
                // const listAcc  = handleFilter(res.accounts)
                // console.log('list',listAcc);
                setListNovel(res.novels);
                setIsLoading(false);
                setPage({
                    totalPages: res.page.totalPages,
                    currentPage: res.page.currentPage
                })
            })
            .catch((err) => {
                alert(
                    "An error occurred while fetching author. Please try again later."
                );
                setIsLoading(false);
            });
    }, [filter]);
    function openModal(userInfor) {
        console.log(userInfor);
        setNovelSelect(userInfor);
        setIsShowModal(true);
    }
    function closeModal() {
        setIsShowModal(false);
    }   
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovelSelect((prev) => ({
            ...prev,
            [name]: value,
        }));
        
    };
    // console.log(userSelect);
    const handleSubmitEditUser = (e) => {
        e.preventDefault();
        const acc = {
            id: novelSelect._id,
            name: novelSelect.name,
        };
        updateAuthor(acc)
            .then((res) => {
                // console.log(res.data);
                if (res.status == 200) {
                    setListAuthor((prev) =>
                        prev.map((author) => (author._id === res.data._id ? res.data : author))
                    );
                }
                closeModal()
            })
            .catch((err) => {
                alert("Could'nt update author");
                closeModal()
                setNovelSelect({});
            });
    };
    const handlePageChange = (newPage) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            page: newPage,
        }));
    };
    const customStyles = {
        content: {
            top: "55%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };
    return !isLoading ?(
        <div className=" flex flex-col justify-start items-center mx-auto bg-slate-200 rounded-xl w-screen  max-w-[1080px]  ">
            <div>
                <AdBanner name={""} />
            </div>
            <div className="w-[1020px] mt-2 h-[60px] flex items-center justify-between  bg-slate-500 dark:bg-gray-700 p-4 rounded-t-lg shadow">
                <div className="flex-none w-[20px] h-[20px]"></div>
                <div className="shrink w-[300px] h-[40px]">
                    <div className="flex bg-gray-200 rounded-lg px-4 py-2">
                        <button className="mx-2" >
                            <SearchIcon classname="text-gray-500 hover:bg-gray-400" />
                        </button>
                        <input
                            type="text"
                            placeholder="Search"
                            ref={searchInputRef}
                            className="bg-transparent border-none outline-none"
                        />
                        {/* <i className="fas fa-search text-gray-500"></i> */}
                    </div>
                </div>
                <div className="flex-none w-[148px] h-[40px] ">
                    {/* <Link to={"/addAuthor"} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
                        
                        <div className="mx-1">
                            <AddUserIcon />
                        </div>
                        Add Author
                    </Link> */}
                </div>
            </div>
            <div className="bg-while-300 w-[1020px] min-h-screen ">
                <div className="relative overflow-x-auto shadow-md sm:rounded-b-lg ">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                        <thead className="h-[50px] text-xs text-gray-700 uppercase bg-slate-200 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Create at
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Update at
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {listNovel && listNovel?.map((novel,index)=>(
                                  <tr
                                  key={novel._id}
                                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                >
                                  <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                  >
                                    {novel?.name}
                                  </th>
                                  
                                  <td className="px-6 py-4">
                                    {formatDate(novel?.createdAt)}
                                  </td>
                                  <td className="px-6 py-4">
                                    {formatDate(novel?.updatedAt)}
                                  </td>
                                  <td className="px-6 py-4 ">
                                    <div
                                          onClick={() => {
                                            openModal(novel);
                                          }}
                                          className="mt-2 font-medium text-blue-300 dark:text-blue-500 hover:text-blue-700 "
                                    >
                                        <EditIcon></EditIcon>
                                    </div>
                                  </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="6" className="px-6 py-3">
                                    <div className="flex justify-end  items-center">
                                        <button
                                            disabled={page?.currentPage === 1}
                                            onClick={() => handlePageChange(page?.currentPage - 1)}
                                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50  mx-2"
                                        >
                                            <LeftIcon />
                                        </button>
                                        <span>
                                            Page {page?.currentPage} of {page?.totalPages}
                                        </span>
                                        <button
                                            disabled={page?.currentPage === page?.totalPages}
                                            onClick={() => handlePageChange(page?.currentPage + 1)}
                                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50  mx-2"
                                        >
                                            <RightIcon />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    
                </div>
            </div>
           
            <div>
                <Modal
                    isOpen={isShowModal}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className="w-[600px] flex items-center justify-center">
                        <div className="w-full  p-8 space-y-6 bg-white rounded-lg shadow-md">
                            <button onClick={closeModal} className="rounded-md border-2 bg-slay-200 px-2">close</button>
                            <h2 className="text-2xl font-bold text-center text-purple-700">
                                Update account
                            </h2>
                            <form className="space-y-4" onSubmit={handleSubmitEditUser}>
                                
                                <div className="flex flex-row">
                                    <label htmlFor="username" className="px-4 py-2 w-[131px]">
                                        ID{" "}
                                    </label>
                                    <p className="w-auto  px-4 py-2 border rounded-md border-red-500 focus:outline-none focus:ring-2 focus:ring-purple-500">
                                        {novelSelect?._id}
                                    </p>
                                    <label htmlFor="chapters" className="px-4 py-2 w-[130px]">
                                        Chapters{" "}
                                    </label>

                                    <input
                                        type="tel"
                                        id="chapters"
                                        name="chapters"
                                        onChange={handleInputChange}
                                        placeholder="chapters"
                                        value={novelSelect?.chapters || ""}
                                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div className="flex flex-row">
                                        <label htmlFor="name" className="px-4 py-2 w-[131px]">
                                            Name{" "}
                                        </label>

                                        <input
                                            type="tel"
                                            id="name"
                                            name="name"
                                            onChange={handleInputChange}
                                            placeholder="Name"
                                            value={novelSelect?.name || ""}
                                            className="w-full  px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                   
                                    
                                </div>
                                <div className="flex flex-row">
                                    <label htmlFor="powerStone" className="px-4 py-2 w-[131px]">
                                    powerStone{" "}
                                    </label>

                                    <input
                                        type="number"
                                        id="powerStone"
                                        name="powerStone"
                                        onChange={handleInputChange}
                                        placeholder="powerStone"
                                        value={novelSelect?.powerStone || 0}
                                        className="w-full  px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div className="flex flex-row">
                                    <label htmlFor="description" className="px-4 py-2 w-[131px]">
                                        Description{" "}
                                    </label>

                                    <textarea
                                        type="tel"
                                        id="description"
                                        name="description"
                                        onChange={handleInputChange}
                                        placeholder="description"
                                        value={novelSelect?.description || ""}
                                        className="w-full h-[150px]  px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div className="flex flex-row">
                                    <label htmlFor="views" className="px-4 py-2 w-[131px]">
                                        View{" "}
                                    </label>

                                    <input
                                        type="number"
                                        id="views"
                                        name="views"
                                        onChange={handleInputChange}
                                        placeholder="views"
                                        value={novelSelect?.views || ""}
                                        className="w-full   px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                
                                <div>
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
                </Modal>
            </div>
            
        </div>
    ) : (
        <div className="flex justify-center">
            <Loading />
        </div>
    )
}

export default PageNovel