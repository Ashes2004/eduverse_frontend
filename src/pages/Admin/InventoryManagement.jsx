import React, { useState } from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";

import AdminSidebar from "../../components/AdminSidebar";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

const InventoryManagement = () => {
  // Dummy Data
  const [inventory, setInventory] = useState([
    { id: 1, name: "Projector", quantity: 5, category: "Electronics", status: "Available" },
    { id: 2, name: "Whiteboard Markers", quantity: 20, category: "Stationery", status: "Available" },
    { id: 3, name: "Chairs", quantity: 50, category: "Furniture", status: "In Use" },
    { id: 4, name: "Laptops", quantity: 10, category: "Electronics", status: "Under Maintenance" },
    { id: 5, name: "Desks", quantity: 30, category: "Furniture", status: "Available" },
  ]);

  const [newItem, setNewItem] = useState({
    name: "",
    quantity: "",
    category: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddItem = () => {
    if (newItem.name && newItem.quantity && newItem.category && newItem.status) {
      setInventory([
        ...inventory,
        {
          id: inventory.length + 1,
          ...newItem,
        },
      ]);
      setNewItem({ name: "", quantity: "", category: "", status: "" });
    }
  };

  // Data for Charts
  const categoryData = inventory.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.quantity;
    return acc;
  }, {});

  const statusData = inventory.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="flex">
        <AdminSidebar/>
    <div className="h-screen w-full overflow-y-auto bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Institute Inventory Management
      </h2>

      {/* Add Inventory Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Add New Inventory Item
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={newItem.name}
            onChange={handleChange}
            placeholder="Item Name"
            className="p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            name="quantity"
            value={newItem.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="p-2 border border-gray-300 rounded-lg"
          />
          <select
            name="category"
            value={newItem.category}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Stationery">Stationery</option>
            <option value="Furniture">Furniture</option>
          </select>
          <select
            name="status"
            value={newItem.status}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Status</option>
            <option value="Available">Available</option>
            <option value="In Use">In Use</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </select>
        </div>
        <button
          onClick={handleAddItem}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Item
        </button>
      </div>

      {/* Inventory List */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Inventory List
        </h3>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 border-b">ID</th>
                <th className="p-4 border-b">Item Name</th>
                <th className="p-4 border-b">Quantity</th>
                <th className="p-4 border-b">Category</th>
                <th className="p-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-4 border-b">{item.id}</td>
                  <td className="p-4 border-b">{item.name}</td>
                  <td className="p-4 border-b">{item.quantity}</td>
                  <td className="p-4 border-b">{item.category}</td>
                  <td className="p-4 border-b">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto mt-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Inventory Analytics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h4 className="text-lg font-medium text-gray-600 mb-2">Category Distribution</h4>
            <Pie
              data={{
                labels: Object.keys(categoryData),
                datasets: [
                  {
                    label: "Quantity",
                    data: Object.values(categoryData),
                    backgroundColor: ["#4CAF50", "#FFC107", "#FF5722"],
                  },
                ],
              }}
            />
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h4 className="text-lg font-medium text-gray-600 mb-2">Status Distribution</h4>
            <Bar
              data={{
                labels: Object.keys(statusData),
                datasets: [
                  {
                    label: "Count",
                    data: Object.values(statusData),
                    backgroundColor: ["#2196F3", "#9C27B0", "#FF9800"],
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default InventoryManagement;
