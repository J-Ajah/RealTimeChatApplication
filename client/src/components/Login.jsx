import React, { useRef } from 'react'
import { v4 as uuid } from "uuid";

const Login = ({ onIdSubmit, id }) => {
    const idRef = useRef();


    function handleSubmit(e) {
        e.preventDefault();
        onIdSubmit(idRef.current.value);
    }

    function createId() {
        const generatedId = uuid();
        idRef.current.value = generatedId;
        onIdSubmit(generatedId);
    }

    return (
        <div className="App h-[100vh] w-full flex items-center justify-center">
            <form className="w-full" onSubmit={handleSubmit}>

                <div className="border-2 bg-blue-500 rounded-md w-[50%] text-[#fff] mx-auto space-y-3 p-10 pt-2">
                    <div className="generated-Id  pb-8 font-[500]"> Generated Id: <span className="">{id}</span> </div>
                    <label className="font-[500]">Enter your Id</label>
                    <input
                        className="border-2 block py-[5px] w-[500px] outline-none rounded-md pl-2"
                        type="text"
                        ref={idRef}
                        required
                    />

                    <div className="space-x-2">
                        <button
                            className="border-2 border-[#c0e0ea] px-4 py-[4px] rounded-md font-[400]"
                            type="submit"
                        >
                            Login
                        </button>
                        <button
                            className="border-2 border-[#1b99c3] px-4 py-[4px] rounded-md font-[400]"
                            onClick={() => createId()}
                        >
                            Create A new ID
                        </button>
                    </div>
                    <button></button>
                </div>
            </form>
        </div>
    )
}

export default Login