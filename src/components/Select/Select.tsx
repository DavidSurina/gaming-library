import React from "react";
import { useSelect, UseSelectProps } from "downshift";
import {
  ChevronUp as ChevronUpIcon,
  ChevronDown as ChevronDownIcon,
} from "react-bootstrap-icons";
import { CurrentQueryType } from "../../globals/contexts/LibraryContext";
import clsx from "clsx";
import "./style.scss";

function Select(props: UseSelectProps<CurrentQueryType>) {
  const { items, selectedItem } = props;

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({ ...props });

  return (
    <div className="position-relative w-100 m-auto justify-content-center select-wrapper">
      <div
        className="w-100 p-3 bg-body d-inline-flex justify-content-between pointer-event border border-white rounded-2"
        {...getToggleButtonProps()}
      >
        <span>
          {selectedItem?.queryKey && selectedItem?.queryKey.length > 0
            ? selectedItem.queryKey
            : " "}
        </span>
        <span className="px-2">
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </span>
      </div>
      <ul
        className={clsx(
          "w-100 position-absolute bg-body mt-1 shadow-sm overflow-auto p-0 border border-white select-list",
          {
            "hidden border-0": !isOpen,
          }
        )}
        {...getMenuProps()}
      >
        {isOpen &&
          items.map((item, index) => {
            return (
              <li
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
