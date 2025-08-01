import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";

function UserModal({ user, onClose, isEditMode, onSave }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        phone: user.phone,
        street: user.address?.street,
        suite: user.address?.suite,
        city: user.address?.city,
        website: user.website,
        company: user.company?.name,
      });
    }
  }, [user, form]);

  const handleFinish = (values) => {
    if (onSave) {
      onSave({
        id: user.id,
        ...values,
      });
    } else {
      onClose();
    }
  };

  return (
    <Modal
      open={!!user}
      title={isEditMode ? `Edit ${user?.name}` : user?.name}
      onCancel={onClose}
      footer={
        isEditMode
          ? [
              <Button key="save" type="primary" onClick={() => form.submit()}>
                Save
              </Button>,
              <Button key="close" onClick={onClose}>
                Close
              </Button>,
            ]
          : [
              <Button key="close" onClick={onClose}>
                Close
              </Button>,
            ]
      }
      destroyOnClose
    >
      {user && (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          disabled={!isEditMode} 
        >
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ type: "email", required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="Street" name="street">
            <Input />
          </Form.Item>
          <Form.Item label="Suite" name="suite">
            <Input />
          </Form.Item>
          <Form.Item label="City" name="city">
            <Input />
          </Form.Item>
          <Form.Item label="Website" name="website">
            <Input />
          </Form.Item>
          <Form.Item label="Company" name="company">
            <Input />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}

export default UserModal;
