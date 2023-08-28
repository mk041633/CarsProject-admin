/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { ModalForm, ProFormDigit, ProFormText } from "@ant-design/pro-components";
import { Button, Checkbox, DatePicker, Form, Input, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { TokenModel } from "../../../../models/Token.model";
import { addProxy } from "../../../../requests/proxy";
interface AddProxyProps {
    setToken:  React.Dispatch<React.SetStateAction<TokenModel | null>>;
    proxy: any; 
    onSuccess: () => void;
}

const AddProxy = ({setToken,onSuccess} :AddProxyProps) => {
    const [visible, setVisible] = useState(false);
    const [form] = useForm();
    const [loading, setIsLoading] = useState(false);

    
   
    const onSubmit = async (values: any) => {
        setIsLoading(true);
    
        try {
            console.log(values)
            const { host, port, ...otherValues } = values;
            const dataToSend = {
                
                ...values,
                proxy: `http://${host}:${port}`,
            };
    
            dataToSend.port = parseInt(dataToSend.port);
    
            const apiResponse = await addProxy(dataToSend, setToken);
    
            console.log('apiResponse', apiResponse)
            
            form.resetFields();
            setVisible(false);
    
            if (onSuccess) {
                console.log('added api data', apiResponse.data);
                onSuccess();
            }
        } catch (error) {
            console.error("Error creating proxy:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const getTrigger = (): JSX.Element => {
        return (
            <Button type="primary" icon={<PlusOutlined />}>
                Добавить
            </Button>
        );
    };

    return (
        <ModalForm
            submitter={{
                submitButtonProps: {
                    loading,
                    icon: <SaveOutlined />,
                },
            }}
            onFinish={onSubmit}
            open={visible}
            
            onOpenChange={setVisible}
            form={form}
            title="Добавить прокси"
            trigger={getTrigger()}
        >
            <div className="mt-4">
                <Space.Compact block>
            <Form.Item name="host" label="Хост и порт">
              <Input
                name="host"
                placeholder="Хост..."
                addonBefore="http://"
                addonAfter=":"
                style={{ width: "160%" }}
              />
           </Form.Item>
            <Form.Item
              name="port"
              label=""
              style={{ marginLeft: 168, marginTop: 30, width: "25%" }}
            >
              <Input placeholder="Порт..." />
            </Form.Item>
          </Space.Compact>

          <Space.Compact block>
            <Form.Item name="login" label="Логин и пароль">
              <Input
                name="login"
                placeholder="Логин..."
                style={{ width: "180%" }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label=""
              style={{ marginLeft: 150, marginTop: 30, width: "50%" }}
            >
              <Input placeholder="Пароль..." />
            </Form.Item>
          </Space.Compact>
            
          <Form.Item name="expireDate" label="Оплачен до (включительно):">
            <DatePicker
              placeholder="Выберите дату"
              style={{ width: "100%" }}
            />
          </Form.Item>
           
          <Form.Item name="isActive" valuePropName="checked">
          <Checkbox>Активный</Checkbox>
          </Form.Item>


            </div>
        </ModalForm>
    );
};

export default AddProxy;