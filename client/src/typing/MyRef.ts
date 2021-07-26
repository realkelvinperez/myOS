import React from "react";

export type MyRef =
    | React.MutableRefObject<HTMLDivElement>
    | HTMLDivElement
    | HTMLSpanElement
    | null;

export type CRef = React.MutableRefObject<FocusableElement | null> | null;
