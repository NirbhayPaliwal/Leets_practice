import AddFriends from './AddFriends.jsx'
import Loading from './LoadingActivity.jsx';
import { useState ,useEffect} from 'react';
import { axiosInstance } from '../lib/axios.js';
const Activity = () => {
  const [loading, setloading] = useState(true);
  const [UserSubmission, setUserSubmission] = useState(null);
  useEffect(()=>{       
    setloading(true);
    const fetchSubmissions = async()=>{
      const d = axiosInstance.get('/friends/submission');
      setUserSubmission(d.data);
      setloading(false);
    }
    fetchSubmissions()
  },[])
  return (
    <section>
      <div className="flex justify-center mt-10">
        <div>
          <div className="text-xl px-1 py-1">Friend's Status</div>
          <div className="h-[50vh] w-[80vw] overflow-y-scroll rounded-xl bg-dark">
            <table className="table table-xl">
              <thead>
                <tr className="bg-darkest">
                  <td>UserName</td>
                  <td>Title</td>
                  <td>TimeStamp</td>
                  <td>Status</td>
                  <td>Language</td>
                </tr>
              </thead>
              {loading ? (
                 <tr>
                    <td colSpan="5" className="text-center">
                      <Loading />
                    </td>
                  </tr>
              ) : (
                <tbody>
                  {UserSubmission.map((submission, index) => (
                    <tr
                      className={`${index % 2 ? "bg-darker" : "bg-dark"}`}
                      key={index}>
                      <td>
                        <a href="/">Nirbhay Paliwal</a>
                      </td>
                      <td>{submission.title}</td>
                      <td>{submission.timestamp}</td>
                      <td>{submission.statusDisplay}</td>
                      <td>{submission.lang}</td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
      <div className="self-end mt-10 mr-[80px] flex justify-end">
        <AddFriends />
      </div>
    </section>
  );
}

export default Activity