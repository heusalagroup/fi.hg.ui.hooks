// Copyright (c) 2021. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useWindowSize } from "./useWindowSize";

export type SetProfileMenuOpenCallback = React.Dispatch<React.SetStateAction<boolean>>;

export function useDropdownToggle (initialState: boolean = false) : [boolean, SetProfileMenuOpenCallback] {

    const [ isDropdownOpen, setDropdownOpen ] = useState<boolean>(initialState);

    const location = useLocation();

    const windowSize = useWindowSize();

    // When location or window size changes, close menu
    useEffect(
        () => {
            setDropdownOpen(false);
        },
        [
            windowSize,
            location,
            setDropdownOpen
        ]
    );

    return [ isDropdownOpen, setDropdownOpen ];

}
