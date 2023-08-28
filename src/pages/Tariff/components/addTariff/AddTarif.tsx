import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, InputNumber, Modal } from 'antd';
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { TokenModel } from '../../../../models/Token.model';
import { AddTariff } from '../../../../requests/tariff';
interface AddTarifProps {
    setToken: React.Dispatch<React.SetStateAction<TokenModel | null>>;
    tariff: any; 
    onSuccess: () => void;
}

const AddTarif = ({ setToken,onSuccess} : AddTarifProps) => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm(); 
    const [loading,setIsLoading] = useState(false);

    
    const onSubmit = async (values: any) => {
        setIsLoading(true);
    
        try {
            const dataToSend = {
                
                ...values,
            };
            await AddTariff(dataToSend,setToken);

            form.resetFields();
            setVisible(false);
    
            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            console.error("Error creating tarif:", error);
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
            title="Добавить тариф"
            trigger={getTrigger()}
        >
            <div className="mt-4">
            <ProFormText name="name" label="Название"  placeholder="Название..." />
            <Form.Item name="price" label="Цена">
                    <InputNumber 
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                      parser={(value) => value!.replace(/\$\s?|( )*/g, '')}
                    />
                    </Form.Item>
                    <ProFormText name="qrLink" label="QR ссылка"  placeholder="qrLink..." />
                    <Form.Item name="maxFiltersCount" label="Максимальное количество фильтров">
                    <InputNumber 
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                      parser={(value) => value!.replace(/\$\s?|( )*/g, '')}
                    />
                    </Form.Item>
                    <Form.Item name="isArchive" valuePropName="checked">
                    <Checkbox>Архивировать</Checkbox>
                    </Form.Item>
                    <Form.Item name="isActive" valuePropName="checked">
                    <Checkbox>Активный</Checkbox>
                    </Form.Item>
                    <Form.Item name="additionalFilters" valuePropName="checked">
                    <Checkbox>Доп. фильтры</Checkbox>
                    </Form.Item>



            </div>
        </ModalForm>
    );
};

export default AddTarif;