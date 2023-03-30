import { DynamicForm } from "../components/dynamic-form/dynamicForm.model";
import { status } from "./status-const";

export const assetForm: DynamicForm[] = [
    {
        type: 'number',
        label: 'Id',
        name: 'id',
        value: null
    },
    {
        type: 'text',
        label: 'Name',
        name: 'assetName',
        value: ''
    },
    {
        type: 'text',
        label: 'Type',
        name: 'type',
        value: ''
    },
    {
        type: 'text',
        label: 'Serial Number',
        name: 'serialNumber',
        value: ''
    },
    {
        type: 'select',
        label: 'Location',
        name: 'locationId',
        value: null
    },
    {
        type: 'text',
        label: 'Model Number',
        name: 'modelNumber',
        value: ''
    },
    {
        type: 'select',
        label: 'Manufacturer',
        name: 'manufacturer',
        value: null
    },
    {
        type: 'select',
        label: 'Current Status',
        name: 'currentStatus',
        value: null,
        options: status
    },
]