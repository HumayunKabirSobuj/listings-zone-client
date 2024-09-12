import { useContext } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "../provider/AuthProvider";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="flex mt-40 justify-center">
        <span className="loading  loading-spinner w-40 "></span>
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login"></Navigate>;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
