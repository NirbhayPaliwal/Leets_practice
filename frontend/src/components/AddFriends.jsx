import { use, useState } from "react";
import { axiosInstance } from "../lib/axios.js";
const AddFriends = () => {
  const [alert, setAlert] = useState("");
  const [Username,setUsername] = useState("");
  const [loading,setloading] = useState(false);
  const handleChange = (event) => {
    setUsername(event.target.value); 
  };
  async function handleclick(event){
    if(!Username) return ;
    setloading(true)
    event.preventDefault(); 
    const res = await axiosInstance.get(`/friend/add/${Username}`);
    if(res.ok == 0){
      alert("Internal Server Error");
      return ;
    }
    setloading(false);
    setAlert(res.data.alertmessage);
    if(res.data.alertmessage[0] != 'N') setUsername("");
        setTimeout(() => {
          setAlert(""); 
        }, 1500);
  }
  return (
    <div>
      {alert && (
        <div
          role="alert"
          className={`alert alert-success w-[300px] fixed bottom-4 right-4 shadow-lg p-4 flex items-center gap-2 ${
            alert[0] !== "N" ? "bg-green-400" : "bg-red-400"
          }`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={`${
                alert[0] !== "N"
                  ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  : "M6 18L18 6M6 6l12 12"
              }`}
            />
          </svg>
          <span>{alert}</span>
        </div>
      )}
      <div className="dropdown dropdown-bottom dropdown-end">
        <div tabIndex={0} role="button" className="btn dropdown-toggle">
          Add Friends
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content mt-4 rounded-box z-[1] w-[300px] shadow bg-darkest">
          <li>
            <form>
              <label
                htmlFor="search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white ">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="username"
                  id="username"
                  value={Username}
                  onChange={handleChange}
                  className="block w-full p-4 ps-10 text-sm rounded-md bg-dark"
                  placeholder="username"
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-darker hover:bg-darkest px-4 py-2 btn btn-sm border-0 text-center "
                  onClick={handleclick}>
                  <div className="h-[20px] w-[30px] flex justify-center items-center">
                    {!loading && <>Add</>}
                    {loading && (
                      <>
                        <div className="h-[15px] w-[15px] border-2 border-darkest border-t-white animate-spin rounded-full"></div>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </form>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AddFriends