import { useQuery } from "@tanstack/react-query";
import UseAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const UseRole = () => {
  const { user } = UseAuth(); 
  const axiosSecure = useAxiosSecure();

  const { data: role='user', isLoading:roleLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email, 
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data?.role ; // return only role
    },
  });

  return { role, roleLoading }; 
};

export default UseRole;
