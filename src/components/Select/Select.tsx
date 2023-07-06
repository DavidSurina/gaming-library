import React from "react";
import { useSelect, UseSelectProps } from "downshift";
import { ChevronUp, ChevronDown } from "react-bootstrap-icons";
import { CurrentQueryType } from "../../globals/contexts/LibraryContext";
const selectWidth = "330px";

function Select(props: UseSelectProps<CurrentQueryType>) {
  const { items } = props;
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({ ...props });

  return (
    <div
      className="w-20 m-auto justify-content-center"
      style={{ zIndex: "auto" }}
    >
      <div
        className="p-3 bg-body d-inline-flex justify-content-between pointer-event border border-white rounded-2"
        {...getToggleButtonProps()}
        style={{ width: selectWidth }}
      >
        <span>{selectedItem ? selectedItem[0] : ""}</span>
        <span className="px-2">{isOpen ? <ChevronUp /> : <ChevronDown />}</span>
      </div>
      <ul
        className={`position-absolute bg-body mt-1 shadow-sm overflow-auto p-0 border border-white${
          !isOpen && "hidden border-0"
        }`}
        style={{ width: selectWidth, zIndex: "auto", maxHeight: "400px" }}
        {...getMenuProps()}
      >
        {isOpen &&
          items.map((item, index) => {
            return (
              <li
                style={isOpen && { zIndex: "auto" }}
                className={`${highlightedIndex === index && "bg-secondary"} ${
                  selectedItem === item && "fw-bold"
                } py-2 px-3 shadow-sm flex-col`}
                key={`${item[0]}${index}`}
                {...getItemProps({ item, index })}
              >
                <span>{item[0]}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Select;
