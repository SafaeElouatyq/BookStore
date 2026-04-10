import AdminSidebar from "../../components/admin/adminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="p-4 w-100">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;