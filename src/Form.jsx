import { useState , useEffect } from "react"
import React from 'react'


const Form = () => {
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [allEntry, setallEntry] = useState([]);
    const [alertMsg, setAlertMsg] = useState();
    const [alertSuccess, setalertSuccess] = useState();
    const [indexToEdit, setIndexToEdit] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isDataUpdated, setIsDataUpdated] = useState(false);

    const submitForm = (e) => {
        e.preventDefault();
        if (firstName === "" || lastName === "" || email === "" || password === "") {
            setAlertMsg("Please Fill All The Blank Fields");
            setTimeout(function () {
                setAlertMsg("");
            }, 3000);
            return;

        }else {
            setalertSuccess(indexToEdit === null ? "Data Submit Successfully" : "Data Updated Successfully");
            setTimeout(function () {
              setalertSuccess("");
            }, 3000);
        }

        const entry = { firstName: firstName, lastName: lastName, email: email, password: password };

        if (indexToEdit === null) {
            setallEntry([...allEntry, entry]);
        } else {
            const updatedData = [...allEntry];
            updatedData[indexToEdit] = entry;
            setallEntry(updatedData);
            setIndexToEdit(null);
            setIsEditing(false);
        }

        setfirstName("");
        setlastName("");
        setemail("");
        setpassword("");

        localStorage.setItem('formData', JSON.stringify([...allEntry, entry]));

    };
    console.log(allEntry)
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('formData'));
        if (storedData) {
          setallEntry(storedData);
        }
      }, []);


      const handleDelete = (index) => {
        const filterData = allEntry.filter((item, i) => i !== index);
        setallEntry(filterData);
        localStorage.setItem('formData', JSON.stringify(filterData));
      };

    const handleEdit = (index) => {
        const itemToEdit = allEntry[index];
        setfirstName(itemToEdit.firstName);
        setlastName(itemToEdit.lastName);
        setemail(itemToEdit.email);
        setpassword(itemToEdit.password);
        setIndexToEdit(index);
        setIsEditing(true);
    };
    useEffect(() => {
        if (isDataUpdated) {
          alert("Data is updated"); // show an alert when isDataUpdated is set to true
          setIsDataUpdated(false); // reset isDataUpdated to false
        }
      }, [isDataUpdated]);
    return (
        <div>
            <div className={`text-[#FFF] w-[300px]  mx-auto alert ${alertMsg ? 'bg-red-500 div12' : ''} ${alertSuccess ? 'bg-green-500 div12' : ''}`}>
                {alertMsg ? alertMsg : alertSuccess}
            </div>

            <div className="flex justify-center text-white">
                <form action="" onSubmit={submitForm}>
                    <div >
                        <label className="block pt-3" htmlFor='First Name'>First Name</label>
                        <input type="text" name='firstName' id='firstName' className="bg-transparent border-b-[1px] border-b-slate-300 w-96 outline-none" onChange={(e) => setfirstName(e.target.value)} value={firstName} />
                    </div>
                    <div>
                        <label className="block pt-3" htmlFor='Last Name'>Last Name</label>
                        <input type="text" name='lastName' id='lastName' className="bg-transparent border-b-[1px] border-b-slate-300 w-96 outline-none" onChange={(e) => setlastName(e.target.value)} value={lastName} />
                    </div>
                    <div>
                        <label className="block pt-3" htmlFor='Email'>Email</label>
                        <input type="email" name='email' id='email' className="bg-transparent border-b-[1px] border-b-slate-300 w-96 outline-none" onChange={(e) => setemail(e.target.value)} value={email} />
                    </div>
                    <div>
                        <label className="block pt-3" htmlFor='Password'>Password</label>
                        <input type="password" name='password' id='password' className="bg-transparent border-b-[1px] border-b-slate-300 w-96 outline-none" onChange={(e) => setpassword(e.target.value)} value={password} />
                    </div>
                    <div className="flex mx-auto bg-gray-400 cursor-pointer w-[150px] text-black text-center outline-none border-none mt-3">
                        <button className="mx-12 my-2" type="submit">{indexToEdit === null ? 'Submit' : 'Update'}</button>
                    </div>
                </form>
            </div>
            <div className="flex justify-center mt-6 p-3">
                <table>
                    <thead>
                        <tr className="text-[#FFF]">
                            <th className="w-[200px] text-center border-[1px] border-[#FFF] p-2">First Name</th>
                            <th className="w-[200px] text-center border-[1px] border-[#FFF] p-2">Last Name</th>
                            <th className="w-[300px] text-center border-[1px] border-[#FFF] p-2">Email</th>
                            <th className="w-[200px] text-center border-[1px] border-[#FFF] p-2">Password</th>
                            <th className="w-[300px] text-center border-[1px] border-[#FFF] p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allEntry.map((curElm, index) => {
                            return (
                                <tr className="text-[#FFF]" key={index}>
                                    <td className="py-3 text-center border-b-[1px] border-b-[#FFF] border-l-[1px] border-l-[#FFF] ">{curElm.firstName}</td>
                                    <td className="py-3 text-center border-b-[1px] border-b-[#FFF] ">{curElm.lastName}</td>
                                    <td className="py-3 text-center border-b-[1px] border-b-[#FFF] ">{curElm.email}</td>
                                    <td className="py-3 text-center border-b-[1px] border-b-[#FFF] ">{curElm.password}</td>
                                    <td className="flex gap-3 justify-center py-3 text-center border-b-[1px] border-b-[#FFF] border-r-[1px] border-r-[#FFF]">
                                        <button className="bg-red-500 text-[#FFF]  px-6 py-1" onClick={(e) => handleDelete(index)}>Delete</button>
                                        <button className="bg-green-500   px-[35px] py-1" onClick={() => handleEdit(index)}>Edit</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div >
    )

}

export default Form