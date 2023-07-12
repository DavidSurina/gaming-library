import React, { Dispatch, SetStateAction } from "react";
import {
  useSelect,
  UseSelectProps,
  UseSelectState,
  UseSelectStateChangeOptions,
} from "downshift";
import { CurrentQueryType } from "../../globals/contexts/LibraryContext";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import clsx from "clsx";
import { FilteringParamsType } from "../FilterMenu/FilterMenu";

const selectWidth = "330px"; // TODO move out globally or separate file

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

interface ExtendedSelectProps extends UseSelectProps<CurrentQueryType> {
  selectedItems: FilteringParamsType;
  setSelectedItems: Dispatch<SetStateAction<FilteringParamsType>>;
}

function Multiselect(props: ExtendedSelectProps) {
  const {
    labelId,
    selectedItems: initialSelectedItems,
    setSelectedItems,
    ...rest
  } = props;
  const selectedItems = [...initialSelectedItems[labelId + ""]];

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
      let index = null;
      selectedItems.some((item, i) =>
        item.queryKey === selectedItem.queryKey ? ((index = i), true) : false
      );

      if (typeof index === "number" && index > 0) {
        newSelectedItems = [
          ...selectedItems.slice(0, index),
          ...selectedItems.slice(index + 1),
        ];
      } else if (index === 0) {
        newSelectedItems = [...selectedItems.slice(1)];
      } else {
        newSelectedItems = [...selectedItems, selectedItem];
      }

      setSelectedItems({
        ...initialSelectedItems,
        [labelId as string]: newSelectedItems,
      });
    },
  });

  const selectItemText = selectedItems.length
    ? `${selectedItems.length} elements selected`
    : "Elements";

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
        <span>{selectItemText}</span>
        <span className="px-2">{isOpen ? <ChevronUp /> : <ChevronDown />}</span>
      </div>
      <ul
        className={clsx(
          "position-absolute bg-body mt-1 shadow-sm overflow-auto p-0 border border-white",
          {
            "hidden border-0": !isOpen,
          }
        )}
        style={{ width: selectWidth, zIndex: "auto", maxHeight: "400px" }}
        {...getMenuProps()}
      >
        {isOpen &&
          props.items.map((item, index) => {
            return (
              <li
                style={isOpen && { zIndex: "auto" }}
                className={clsx("py-2 px-3 shadow-sm flex-col", {
                  "bg-secondary": highlightedIndex === index,
                })}
                key={`${item.queryKey}${index}`}
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
                <span>{item.queryKey}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Multiselect;
