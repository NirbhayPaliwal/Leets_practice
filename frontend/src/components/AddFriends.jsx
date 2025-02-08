import { useState } from "react";

const AddFriends = () => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [Username,setUsername] = useState("");
  const handleChange = (event) => {
    setUsername(event.target.value); 
  };
  function handleclick(event){
    
    event.preventDefault(); 
    setAlertVisible(1);
    setUsername("");
        setTimeout(() => {
          setAlertVisible(false); 
        }, 1500);
  }
  return (
    <div>
      {alertVisible && (
        <div
          role="alert"
          className={`alert alert-success w-[300px] fixed bottom-4 right-4 shadow-lg p-4 flex items-center gap-2 ${
            alertVisible == 1 ? "bg-green-400" : "bg-red-400"
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
              d={`${alertVisible==1 ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : "M6 18L18 6M6 6l12 12"}`}
            />
          </svg>
          {alertVisible == 1 && <span>User added successfully!</span>}
          {alertVisible == 2 && <span>User not found</span>}
        </div>
      )}
      <div className="dropdown dropdown-bottom dropdown-end">
        <div tabIndex={0} role="button" className="btn">
          Add Friends
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content mt-4 rounded-box z-[1] w-[300px] shadow bg-darkest">
          <li>
            <form>
              <label
                for="search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white ">
                Search
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20">
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="username"
                  id="username"
                  value={Username}
                  onChange={handleChange}
                  class="block w-full p-4 ps-10 text-sm rounded-md bg-dark"
                  placeholder="username"
                  required
                />
                <button
                  type="submit"
                  class="text-white absolute end-2.5 bottom-2.5 bg-darker hover:bg-darkest px-4 py-2 btn btn-sm border-0 text-center"
                  onClick={handleclick}>
                  Add
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