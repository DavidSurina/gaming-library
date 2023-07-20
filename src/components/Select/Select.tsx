import React from "react";
import { useSelect, UseSelectProps } from "downshift";
import { ChevronUp, ChevronDown } from "react-bootstrap-icons";
import { CurrentQueryType } from "../../globals/contexts/LibraryContext";
import clsx from "clsx";
import { filterSelectWidth } from "../../globals/constants/constants";

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
        style={{ width: filterSelectWidth }}
      >
        <span>{selectedItem ? selectedItem.queryKey : ""}</span>
        <span className="px-2">{isOpen ? <ChevronUp /> : <ChevronDown />}</span>
      </div>
      <ul
        className={clsx(
          "position-absolute bg-body mt-1 shadow-sm overflow-auto p-0 border border-white",
          {
            "hidden border-0": !isOpen,
          }
        )}
        style={{ width: filterSelectWidth, zIndex: "auto", maxHeight: "400px" }}
        {...getMenuProps()}
      >
        {isOpen &&
          items.map((item, index) => {
            return (
              <li
                style={isOpen && { zIndex: "auto" }}
                className={clsx("py-2 px-3 shadow-sm flex-col", {
                  "fw-bold": selectedItem === item,
                  "bg-secondary": highlightedIndex === index,
                })}
                key={`${item.queryKey}${index}`}
                {...getItemProps({ item, index })}
              >
                <span>{item.queryKey}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Select;
