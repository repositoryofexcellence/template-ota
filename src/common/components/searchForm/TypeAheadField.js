import React from "react";
import { Field } from "redux-form";
import Downshift from "downshift";
import matchSorter from "match-sorter";

const itemToString = item => (item ? item : "");

const DownShiftInput = ({ input, meta, label, items }) => (
    <Downshift
        {...input}
        onStateChange={({ inputValue }) => {
            return input.onChange(inputValue);
        }}
        itemToString={itemToString}
        selectedItem={input.value}
    >
        {({
              getInputProps,
              getItemProps,
              getLabelProps,
              isOpen,
              inputValue,
              highlightedIndex,
              selectedItem
          }) => {
            const filteredItems = matchSorter(items, inputValue, {
                maxRanking: matchSorter.rankings.STARTS_WITH
            });
            return (
                <div className="react-autosuggest__container">

                    <div >
                        <input className="react-autosuggest__input"
                            {...getInputProps({
                                name: input.name,
                                onBlur: input.onBlur
                            })}
                            placeholder="Otel Adı"
                        />
                        {isOpen &&
                        !!filteredItems.length && (
                            <div className="react-autosuggest__suggestions-container--open"

                            >
                                {filteredItems.slice(0, 5).map((item, index) => (
                                    <div
                                        {...getItemProps({
                                            key: item,
                                            index,
                                            item,
                                            style: {
                                                backgroundColor:
                                                    highlightedIndex === index ? "lightgray" : "white",
                                                fontWeight: selectedItem === item ? "bold" : "normal"
                                            }
                                        })}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            );
        }}
    </Downshift>
);

const TypeAheadField = props => <Field component={DownShiftInput} {...props} />;

export default TypeAheadField;
