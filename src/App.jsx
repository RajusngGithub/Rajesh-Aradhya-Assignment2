import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Spin, Alert, Typography } from "antd";
import useUserData from "./hooks/useUserData";
import UserCard from "./Components/UserCard";
import UserModal from "./Components/UserModal";
// import "./App.css";
const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const { userDetails: users, isLoading, error } = useUserData();
  const [userList, setUserList] = useState([]); 
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (users.length > 0) setUserList(users);
  }, [users]);


  const handleView = (user) => {
    setSelectedUser(user);
    setIsEditMode(false);
  };


  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditMode(true);
  };

  const handleDelete = (userId) => {
    setUserList((prev) => prev.filter((u) => u.id !== userId));
  };

  const handleSave = (updatedUser) => {
    setUserList((prevList) =>
      prevList.map((user) =>
        user.id === updatedUser.id
          ? {
              ...user,
              name: updatedUser.name,
              email: updatedUser.email,
              phone: updatedUser.phone,
              website: updatedUser.website,
              address: {
                ...user.address,
                street: updatedUser.street,
                suite: updatedUser.suite,
                city: updatedUser.city,
              },
              company: {
                ...user.company,
                name: updatedUser.company,
              },
            }
          : user
      )
    );
    
    setSelectedUser(null);
    setIsEditMode(false);
  };

  return (
    <Layout>
      <Header style={{ background: "#001529" }}>
        <Title style={{ color: "white", margin: 0, textAlign: "center" }} level={2}>
          User Profiles
        </Title>
      </Header>
      <Content style={{ padding: "24px", minHeight: "100vh", background: "#f0f2f5" }}>
        {isLoading && (
          <div className="center-spin">
            <Spin size="large" tip="Loading users..." />
          </div>
        )}

        {error && <Alert type="error" message="Error" description={error.message} showIcon />}

        <Row gutter={[24, 24]}>
          {userList.map((user) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={6} key={user.id}>
              <UserCard user={user} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
            </Col>
          ))}
        </Row>

        <UserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          isEditMode={isEditMode}
          onSave={handleSave} 
        />
      </Content>
    </Layout>
  );
}

export default App;
