import { DynamicForm } from "../components/dynamic-form/dynamicForm.model";
import { sparepartStatus } from "./status-const";

export const sparepartForm: DynamicForm[] = [
    {
        type: 'number',
        label: 'Id',
        name: 'id',
        value: null
    },
    {
        type: 'text',
        label: 'Name',
        name: 'sparepartName',
        value: ''
    },
    {
        type: 'text',
        label: 'Type',
        name: 'type',
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
        type: 'number',
        label: 'Quantity',
        name: 'quantity',
        value: null
    },
    {
        type: 'select',
        label: 'Current Status',
        name: 'currentStatus',
        value: null,
        options: sparepartStatus
    },
]