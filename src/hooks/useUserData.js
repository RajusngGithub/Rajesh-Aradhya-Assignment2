import { useEffect, useState } from "react";
import axios from "axios";

function useUserData() {
  const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let timer;
    const fetchData = async () => {
      try {
        const res = await axios.get("https://jsonplaceholder.typicode.com/users");
        timer = setTimeout(() => {
          setUserDetails(res.data);
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchData();
    return () => clearTimeout(timer);
  }, []);

  return { userDetails, isLoading, error };
}

export default useUserData;
