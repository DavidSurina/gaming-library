import React from "react";
import {
  useSelect,
  UseSelectProps,
  UseSelectState,
  UseSelectStateChangeOptions,
} from "downshift";
import clsx from "clsx";
import {
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
} from "react-bootstrap-icons";

import { CurrentQueryType } from "../../globals/contexts/LibraryContext";
import { useFilterContext } from "../../globals/contexts/FilterContext";
import "./style.scss";

function stateReducer(
  state: UseSelectState<CurrentQueryType>,
  actionAndChanges: UseSelectStateChangeOptions<CurrentQueryType>
) {
  const { changes, type } = actionAndChanges;
  switch (type) {
    case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
    case useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:
    case useSelect.stateChangeTypes.ItemClick:
      return {
        ...changes,
        isOpen: true, // keep menu open after selection.
        highlightedIndex: state.highlightedIndex,
      };
    default:
      return changes;
  }
}

function Multiselect(props: UseSelectProps<CurrentQueryType>) {
  const { labelId, ...rest } = props;
  const { filteringParams, setFilteringParams } = useFilterContext();
  const selectedItems = [...filteringParams[labelId + ""]];

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    ...rest,
    labelId: labelId,
    stateReducer: stateReducer,
    onSelectedItemChange: ({ selectedItem }) => {
      if (!selectedItem) {
        return;
      }
      let newSelectedItems = [];
      const isCurrentlySelected = selectedItems.some(
        (item, i) => item.queryKey === selectedItem.queryKey
      );

      if (isCurrentlySelected) {
        newSelectedItems = selectedItems.filter(
          (item) => item.queryKey !== selectedItem.queryKey
        );
      } else {
        newSelectedItems = [...selectedItems, selectedItem];
      }

      setFilteringParams({
        ...filteringParams,
        [labelId as string]: newSelectedItems,
      });
    },
  });

  let selectItemText = selectedItems.length
    ? `${selectedItems.length} element${
        selectedItems.length > 1 ? "s" : ""
      } selected`
    : "";

  return (
    <div className="position-relative w-100 m-auto justify-content-center">
      <div
        className="w-100 p-3 bg-body d-inline-flex justify-content-between pointer-event border border-white rounded-2"
        {...getToggleButtonProps()}
      >
        <span>{selectItemText}</span>
        <span className="px-2">
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </span>
      </div>
      <ul
        className={clsx(
          "position-absolute w-100 bg-body mt-1 shadow-sm overflow-auto p-0 border border-white multiselect-list",
          {
            "hidden border-0": !isOpen,
          }
        )}
        {...getMenuProps()}
      >
        {isOpen &&
          props.items.map((item, index) => {
            return (
              <li
                className={clsx("py-2 px-3 shadow-sm flex-col", {
                  "bg-secondary": highlightedIndex === index,
                })}
                key={`${item.queryKey}`}
                {...getItemProps({
                  item,
                  index,
                  "aria-selected": selectedItems.some(
                    (i) => i.queryKey === item.queryKey
                  ),
                })}
              >
                <input
                  type="checkbox"
                  className="p-2"
                  checked={selectedItems.some(
                    (i) => i.queryKey === item.queryKey
                  )}
                  value={item.queryKey}
                  onChange={() => null}
                />
                <span className="mx-2">{item.queryKey}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Multiselect;
