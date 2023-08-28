import React from "react";
import { Modal, Button, Input, Checkbox, Form, InputNumber, message } from "antd";
import { ModalProps } from "antd/lib/modal";
import { useState, useEffect } from "react";
import { fetchTariffs, patchTariff } from "../../../../requests/tariff";
import { ProFormText } from "@ant-design/pro-components";

export interface TariffData {
    _id: string;
    name: string;
    qrLink: string;
    price: number;
    maxFiltersCount: number;
    isArchive: boolean;
    isActive: boolean;
}

interface EditTariffModalProps {
    data: TariffData;
    onClose: () => void;
    onPatch: () => void;
}

const EditTariffModal: React.FC<EditTariffModalProps> = ({ data, onClose, onPatch }) => {
    const [form] = Form.useForm();
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
            console.log("Updated Tariff:", updatedData);
            console.log("dd", data);

            const updatedTariff = await patchTariff(data._id, {
                name: updatedData.name,
                price: updatedData.price,
                qrLink: updatedData.qrLink,
                maxFiltersCount: updatedData.maxFiltersCount,
                isActive: updatedData.isActive,
                isArchive: updatedData.isArchive,
                additionalFilters: updatedData.additionalFilters
            });
            message.success("Тариф обновлен!");
            if (onPatch) {
                onPatch();
            }
            onClose();
        } catch (error) {
            console.error("Error updating tariff:", error);
        }
    };

    return (
        <Modal
            title="Tariff Details"
            open={true}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Отменить
                </Button>,
                <Button key="save" type="primary" onClick={handleSave}>
                    Изменить
                </Button>,
            ]}
        >
            <div className="mt-4">
                <Form form={form} layout="vertical" initialValues={data}>
                    <ProFormText name="name" label="Название" placeholder="Название..." />

                    <Form.Item label="Цена" name="price">
                        <InputNumber
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                            parser={(value) => value!.replace(/\$\s?|( )*/g, "")}
                        />
                    </Form.Item>
                    <ProFormText name="qrLink" label="QR ссылка" placeholder="sasa" />

                    <Form.Item label="Максимальное количество фильтров" name="maxFiltersCount">
                        <InputNumber
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                            parser={(value) => value!.replace(/\$\s?|( )*/g, "")}
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
                </Form>
            </div>
        </Modal>
    );
};

export default EditTariffModal;
