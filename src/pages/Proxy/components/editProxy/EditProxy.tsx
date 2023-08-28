import { Button, Checkbox, Form, Input, InputNumber, Modal, Space, DatePicker, message, ConfigProvider } from "antd";
import { patchProxy } from "../../../../requests/proxy";
import { ProFormText } from "@ant-design/pro-components";
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

export interface ProxyData {
    _id: string;
    name: string ;
    host: string;
    port: string;
    isActive: boolean;
}

interface EditProxyModalProps {
    data: ProxyData;
    onClose: () => void;
    onPatch: () => void;
}

const EditProxyModal: React.FC<EditProxyModalProps> = ({ data, onClose, onPatch }) => {
    const [form] = Form.useForm();
    dayjs.locale('ru');
    const getBool = (bool: string) => {
        switch (bool) {
            case "Да":
                return true;
            case "Нет":
                return false;
            default:
                return false;
        }
    };
    const handleSave = async () => {
        try {
            const updatedData = form.getFieldsValue();

            const updatedTariff = await patchProxy(data._id, {
                port: updatedData.port, 
                host: updatedData.host, 
                isActive: getBool(updatedData.isActive), 
                login: updatedData.login, 
                password: updatedData.password

               
            });
            message.success("Прокси обновлен!");
            if (onPatch) {
                onPatch();
            }
            onClose();
        } catch (error) {
            console.error("Error updating proxy:", error);
        }
    };

   

   

    return (
        <Modal
            title="Прокси"
            open={true}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose} >
                    Отменить
                </Button>,
                <Button key="save" type="primary" onClick={handleSave}>
                    Изменить
                </Button>,
            ]}
        >
            <div className="mt-4">
                <Form form={form} layout="vertical" initialValues={data}>

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
              style={{ marginLeft: 138, marginTop: 30, width: "25%" }}
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
              style={{ marginLeft: 120, marginTop: 30, width: "50%" }}
            >
              <Input placeholder="Пароль..." />
            </Form.Item>
          </Space.Compact>
          
                    
                    <Form.Item name="isActive" valuePropName="checked">
                        <Checkbox>Активный</Checkbox>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default EditProxyModal;