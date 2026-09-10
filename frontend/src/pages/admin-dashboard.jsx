import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import useAdminStore from "../store/adminStore";

const AdminDashboard = () => {
  const users = useAdminStore((state) => state.users);
  const stores = useAdminStore((state) => state.stores);
  const isLoading = useAdminStore((state) => state.isLoading);
  const getUsers = useAdminStore((state) => state.getUsers);
  const getStores = useAdminStore((state) => state.getStores);
  const addUser = useAdminStore((state) => state.addUser);
  const addStore = useAdminStore((state) => state.addStore);
  const getUser = useAdminStore((state) => state.getUser);

  const [activeTab, setActiveTab] = useState("users");

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");

  const [showUserForm, setShowUserForm] = useState(false);
  const [showStoreForm, setShowStoreForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "USER",
  });

  const [storeForm, setStoreForm] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: "",
  });

  useEffect(() => {
    if (activeTab === "users") {
      getUsers(sortBy, order, search, role);
    } else {
      getStores(sortBy, order, search);
    }
  }, [activeTab, sortBy, order, search, role, getUsers, getStores]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setOrder("asc");
    }
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();

    try {
      await addUser(userForm);

      setUserForm({
        name: "",
        email: "",
        password: "",
        address: "",
        role: "USER",
      });

      setShowUserForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStoreSubmit = async (e) => {
    e.preventDefault();

    try {
      await addStore({
        ...storeForm,
        ownerId: Number(storeForm.ownerId),
      });

      setStoreForm({
        name: "",
        email: "",
        address: "",
        ownerId: "",
      });

      setShowStoreForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewUser = async (id) => {
    try {
      const user = await getUser(id);
      setSelectedUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  const storeOwners = users.filter(
    (user) => user.role === "STORE_OWNER"
  );

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      <NavBar />

      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-400 mt-2">
              Manage users and stores
            </p>
          </div>

          {activeTab === "users" ? (
            <button
              onClick={() => setShowUserForm(true)}
              className="px-5 py-3 bg-[#e50914] rounded-lg hover:bg-[#c70812]"
            >
              Add User
            </button>
          ) : (
            <button
              onClick={() => setShowStoreForm(true)}
              className="px-5 py-3 bg-[#e50914] rounded-lg hover:bg-[#c70812]"
            >
              Add Store
            </button>
          )}
        </div>

        <div className="grid grid-cols-3 gap-5 mb-8">
          <div className="bg-[#15151c] border border-[#2a2a35] rounded-xl p-5">
            <p className="text-gray-400">Users</p>
            <p className="text-3xl font-bold mt-2">{users.length}</p>
          </div>

          <div className="bg-[#15151c] border border-[#2a2a35] rounded-xl p-5">
            <p className="text-gray-400">Stores</p>
            <p className="text-3xl font-bold mt-2">{stores.length}</p>
          </div>

          <div className="bg-[#15151c] border border-[#2a2a35] rounded-xl p-5">
            <p className="text-gray-400">Store Owners</p>
            <p className="text-3xl font-bold mt-2">
              {storeOwners.length}
            </p>
          </div>
        </div>

        <div className="flex gap-2 mb-6 border-b border-[#2a2a35]">
          <button
            onClick={() => {
              setActiveTab("users");
              setSearch("");
              setRole("");
              setSortBy("name");
              setOrder("asc");
            }}
            className={`px-6 py-3 ${
              activeTab === "users"
                ? "text-white border-b-2 border-[#e50914]"
                : "text-gray-500"
            }`}
          >
            Users
          </button>

          <button
            onClick={() => {
              setActiveTab("stores");
              setSearch("");
              setRole("");
              setSortBy("name");
              setOrder("asc");
            }}
            className={`px-6 py-3 ${
              activeTab === "stores"
                ? "text-white border-b-2 border-[#e50914]"
                : "text-gray-500"
            }`}
          >
            Stores
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name, email or address"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-[#15151c] border border-[#2a2a35] rounded-lg px-4 py-3 outline-none"
          />

          {activeTab === "users" && (
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-[#15151c] border border-[#2a2a35] rounded-lg px-4 py-3 outline-none"
            >
              <option value="">All Roles</option>
              <option value="USER">User</option>
              <option value="STORE_OWNER">Store Owner</option>
              <option value="SYSTEM_ADMINISTRATOR">Admin</option>
            </select>
          )}
        </div>

        {isLoading ? (
          <div className="text-center text-gray-400 py-20">
            Loading...
          </div>
        ) : activeTab === "users" ? (
          <div className="bg-[#15151c] border border-[#2a2a35] rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="border-b border-[#2a2a35]">
                <tr className="text-left text-gray-400">
                  <th
                    onClick={() => handleSort("name")}
                    className="px-6 py-4 cursor-pointer"
                  >
                    Name {sortBy === "name" && (order === "asc" ? "↑" : "↓")}
                  </th>

                  <th
                    onClick={() => handleSort("email")}
                    className="px-6 py-4 cursor-pointer"
                  >
                    Email {sortBy === "email" && (order === "asc" ? "↑" : "↓")}
                  </th>

                  <th
                    onClick={() => handleSort("address")}
                    className="px-6 py-4 cursor-pointer"
                  >
                    Address {sortBy === "address" && (order === "asc" ? "↑" : "↓")}
                  </th>

                  <th
                    onClick={() => handleSort("role")}
                    className="px-6 py-4 cursor-pointer"
                  >
                    Role {sortBy === "role" && (order === "asc" ? "↑" : "↓")}
                  </th>

                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-[#2a2a35] last:border-0"
                  >
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4 text-gray-400">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {user.address}
                    </td>
                    <td className="px-6 py-4">
                      {user.role}
                    </td>
                    <td className="px-6 py-4">
                      {user.role === "STORE_OWNER"
                        ? Number(user.averageRating || 0).toFixed(1)
                        : "-"}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewUser(user.id)}
                        className="text-[#e50914] hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-[#15151c] border border-[#2a2a35] rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="border-b border-[#2a2a35]">
                <tr className="text-left text-gray-400">
                  <th
                    onClick={() => handleSort("name")}
                    className="px-6 py-4 cursor-pointer"
                  >
                    Name {sortBy === "name" && (order === "asc" ? "↑" : "↓")}
                  </th>

                  <th
                    onClick={() => handleSort("email")}
                    className="px-6 py-4 cursor-pointer"
                  >
                    Email {sortBy === "email" && (order === "asc" ? "↑" : "↓")}
                  </th>

                  <th
                    onClick={() => handleSort("address")}
                    className="px-6 py-4 cursor-pointer"
                  >
                    Address {sortBy === "address" && (order === "asc" ? "↑" : "↓")}
                  </th>

                  <th className="px-6 py-4">Rating</th>
                </tr>
              </thead>

              <tbody>
                {stores.map((store) => (
                  <tr
                    key={store.id}
                    className="border-b border-[#2a2a35] last:border-0"
                  >
                    <td className="px-6 py-4">{store.name}</td>
                    <td className="px-6 py-4 text-gray-400">
                      {store.email}
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {store.address}
                    </td>
                    <td className="px-6 py-4">
                      {Number(store.rating || 0).toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showUserForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-[#15151c] border border-[#2a2a35] rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Add User</h2>

              <button
                onClick={() => setShowUserForm(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUserSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={userForm.name}
                onChange={(e) =>
                  setUserForm({
                    ...userForm,
                    name: e.target.value,
                  })
                }
                className="w-full bg-[#0b0b0f] border border-[#2a2a35] rounded-lg px-4 py-3 outline-none"
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={userForm.email}
                onChange={(e) =>
                  setUserForm({
                    ...userForm,
                    email: e.target.value,
                  })
                }
                className="w-full bg-[#0b0b0f] border border-[#2a2a35] rounded-lg px-4 py-3 outline-none"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={userForm.password}
                onChange={(e) =>
                  setUserForm({
                    ...userForm,
                    password: e.target.value,
                  })
                }
                className="w-full bg-[#0b0b0f] border border-[#2a2a35] rounded-lg px-4 py-3 outline-none"
                required
              />

              <input
                type="text"
                placeholder="Address"
                value={userForm.address}
                onChange={(e) =>
                  setUserForm({
                    ...userForm,
                    address: e.target.value,
                  })
                }
                className="w-full bg-[#0b0b0f] border border-[#2a2a35] rounded-lg px-4 py-3 outline-none"
                required
              />

              <select
                value={userForm.role}
                onChange={(e) =>
                  setUserForm({
                    ...userForm,
                    role: e.target.value,
                  })
                }
                className="w-full bg-[#0b0b0f] border border-[#2a2a35] rounded-lg px-4 py-3 outline-none"
              >
                <option value="USER">User</option>
                <option value="STORE_OWNER">Store Owner</option>
                <option value="ADMIN">Admin</option>
              </select>

              <button
                type="submit"
                className="w-full bg-[#e50914] py-3 rounded-lg hover:bg-[#c70812]"
              >
                Add User
              </button>
            </form>
          </div>
        </div>
      )}

      {showStoreForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-[#15151c] border border-[#2a2a35] rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Add Store</h2>

              <button
                onClick={() => setShowStoreForm(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleStoreSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Store Name"
                value={storeForm.name}
                onChange={(e) =>
                  setStoreForm({
                    ...storeForm,
                    name: e.target.value,
                  })
                }
                className="w-full bg-[#0b0b0f] border border-[#2a2a35] rounded-lg px-4 py-3 outline-none"
                required
              />

              <input
                type="email"
                placeholder="Store Email"
                value={storeForm.email}
                onChange={(e) =>
                  setStoreForm({
                    ...storeForm,
                    email: e.target.value,
                  })
                }
                className="w-full bg-[#0b0b0f] border border-[#2a2a35] rounded-lg px-4 py-3 outline-none"
                required
              />

              <input
                type="text"
                placeholder="Address"
                value={storeForm.address}
                onChange={(e) =>
                  setStoreForm({
                    ...storeForm,
                    address: e.target.value,
                  })
                }
                className="w-full bg-[#0b0b0f] border border-[#2a2a35] rounded-lg px-4 py-3 outline-none"
                required
              />

              <select
                value={storeForm.ownerId}
                onChange={(e) =>
                  setStoreForm({
                    ...storeForm,
                    ownerId: e.target.value,
                  })
                }
                className="w-full bg-[#0b0b0f] border border-[#2a2a35] rounded-lg px-4 py-3 outline-none"
                required
              >
                <option value="">Select Store Owner</option>

                {storeOwners.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} - {user.email}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="w-full bg-[#e50914] py-3 rounded-lg hover:bg-[#c70812]"
              >
                Add Store
              </button>
            </form>
          </div>
        </div>
      )}

      {selectedUser && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-[#15151c] border border-[#2a2a35] rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">User Details</h2>

              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-sm">Name</p>
                <p>{selectedUser.name}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p>{selectedUser.email}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Address</p>
                <p>{selectedUser.address}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Role</p>
                <p>{selectedUser.role}</p>
              </div>

              {selectedUser.role === "STORE_OWNER" && (
                <div>
                  <p className="text-gray-500 text-sm">Rating</p>
                  <p className="text-xl font-semibold">
                    {Number(
                      selectedUser.averageRating || 0
                    ).toFixed(1)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;