import React from "react";
import {useSelect, UseSelectProps } from "downshift";
import { ChevronUp, ChevronDown } from 'react-bootstrap-icons';

import {CurrentQueryType} from "../../globals/contexts/LibraryContext";

const formatSelectLabel = (value: string) => value.replace('_', ' ');
const selectWidth = '330px';

function Select(props: UseSelectProps<CurrentQueryType>) {
    const { items} = props;
    const {isOpen,
        selectedItem,
        getToggleButtonProps,
        getMenuProps,
        highlightedIndex,
        getItemProps } = useSelect({...props});

    return (
        <div className="p-3 w-50" style={{zIndex: 9999}}>
            <div className="p-3 bg-body d-inline-flex justify-content-between pointer-event border border-white rounded-1" {...getToggleButtonProps()} style={{width: selectWidth}}>
                <span className="text-capitalize">{selectedItem ? formatSelectLabel(selectedItem.queryKey) : 'Elements'}</span>
                <span className="px-2">{isOpen ? <ChevronUp/> : <ChevronDown />}</span>
            </div>
            <ul
                className={`position-absolute bg-body mt-1 shadow-sm overflow-scroll p-0 ${
                    !isOpen && 'hidden'
                }`}
                style={{width: selectWidth}}
                {...getMenuProps()}
            >
                {isOpen && items.map((item, index) => (
                    <li className={`${highlightedIndex === index && 'bg-secondary'} ${selectedItem === item && 'fw-bold'} py-2 px-3 shadow-sm flex-column flex-col`}
                        key={`${item.queryKey}${index}`}
                        {...getItemProps({item, index})}
                    >
                        <span className="text-capitalize">{formatSelectLabel(item.queryKey)}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Select