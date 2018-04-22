import React, { Component } from "react";
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
                <div>
                    <label {...getLabelProps()}>{label}</label>
                    <div style={{ position: "relative" }}>
                        <input
                            {...getInputProps({
                                name: input.name,
                                onBlur: input.onBlur
                            })}
                        />
                        {isOpen &&
                        !!filteredItems.length && (
                            <div
                                style={{
                                    background: "white",
                                    position: "absolute",
                                    top: "100%",
                                    left: 0,
                                    width: "100%",
                                    zIndex: 4
                                }}
                            >
                                {filteredItems.map((item, index) => (
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
