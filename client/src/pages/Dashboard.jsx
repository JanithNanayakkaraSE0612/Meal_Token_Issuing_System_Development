import React, { useEffect, useState } from "react";
import { Card, Flex, Space, Statistic, Table, Typography } from "antd";
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getCustomers, getInventory, getOrders, getRevenue } from "../API";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reveneuData, setReveneuData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    // Fetch data on component mount
    const fetchData = async () => {
      try {
        setLoading(true);
        const ordersRes = await getOrders();
        setOrders(ordersRes.total);
        setRevenue(ordersRes.discountedTotal);

        const inventoryRes = await getInventory();
        setInventory(inventoryRes.total);

        const customersRes = await getCustomers();
        setCustomers(customersRes.total);

        const revenueRes = await getRevenue();
        const labels = revenueRes.carts.map((cart) => `User-${cart.userId}`);
        const data = revenueRes.carts.map((cart) => cart.discountedTotal);
        const dataSource = {
          labels,
          datasets: [
            { label: "Revenue", data, backgroundColor: "rgba(255, 0, 0, 1)" },
          ],
        };
        setReveneuData(dataSource);

        const products = ordersRes.products.splice(0, 3);
        setDataSource(products);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Order Revenue" },
    },
  };

  return (
    <Space size={20} direction="vertical" style={{ width: "100%" }}>
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Flex wrap="wrap" gap="middle" style={{ width: "100%" }}>
        <DashboardCard
          icon={<ShoppingCartOutlined className="icon-green" />}
          title={"Orders"}
          value={orders}
        />
        <DashboardCard
          icon={<ShoppingOutlined className="icon-blue" />}
          title={"Inventory"}
          value={inventory}
        />
        <DashboardCard
          icon={<UserOutlined className="icon-purple" />}
          title={"Customer"}
          value={customers}
        />
        <DashboardCard
          icon={<DollarCircleOutlined className="icon-red" />}
          title={"Revenue"}
          value={revenue}
        />
      </Flex>
      <Typography.Text>Recent Orders</Typography.Text>
      <Flex wrap="wrap" gap="large">
        <Table
          style={{ width: "40%" }}
          columns={[
            { title: "Title", dataIndex: "title" },
            { title: "Quantity", dataIndex: "quantity" },
            { title: "Price", dataIndex: "discountedPrice" },
          ]}
          loading={loading}
          dataSource={dataSource}
          pagination={false}
        />
        <Card style={{ width: "40%" }}>
          <Bar options={options} data={reveneuData} />
        </Card>
      </Flex>
    </Space>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space
        direction="horizontal"
        style={{ width: "280px", position: "static" }}
      >
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

export default Dashboard;
