import React from "react";
import { Card, Button, Popconfirm, message } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LinkOutlined,
  BankOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

function UserCard({ user, onView, onEdit, onDelete }) {
const avatarUrl = `https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`

  return (
    <Card
      cover={<img alt={user.name} src={avatarUrl} style={{ width: "100%", height: "auto", maxWidth: 160, margin: "0 auto" }}/>}
      hoverable
      style={{ borderRadius: "12px" }}
      actions={[
        <Button
          key="view"
          type="link"
          icon={<EyeOutlined />}
          onClick={() => onView(user)}
        >
          View Profile
        </Button>,
        <Button
          key="edit"
          type="link"
          icon={<EditOutlined />}
          onClick={() => onEdit(user)}
        >
          Edit
        </Button>,
        <Popconfirm
          key="delete"
          title={`Are you sure to delete ${user.name}?`}
          onConfirm={() => {
            onDelete(user.id);
            message.success("User deleted");
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Popconfirm>,
      ]}
    >
      <Card.Meta
        avatar={<UserOutlined />}
        title={user.name}
        description={
          <>
            <p>
              <MailOutlined /> {user.email}
            </p>
            <p>
              <PhoneOutlined /> {user.phone}
            </p>
            <p>
              <LinkOutlined />{" "}
              <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">
                {user.website}
              </a>
            </p>
            <p>
              <BankOutlined /> {user.company.name}
            </p>
          </>
        }
      />
    </Card>
  );
}

export default UserCard;
