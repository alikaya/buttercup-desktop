import React, { useCallback, useEffect, useRef } from "react";
import { Allotment, AllotmentHandle } from "allotment";
import styled from "styled-components";
import { EntriesList } from "./EntriesList";
import { EntryDetails } from "./EntryDetails";
import { GroupsList } from "./GroupsList";
import { getPanelSizes, setPanelSizes } from "../../services/panelStorage";

import "./styles/vault-ui.sass";

const PANEL_KEY = "vault-split";

const GridWrapper = styled.div`
    position: relative;
    height: 100%;
`;

export const VaultUI = () => {
    const allotmentRef = useRef<AllotmentHandle>(null);

    useEffect(() => {
        getPanelSizes(PANEL_KEY).then((sizes) => {
            if (sizes && allotmentRef.current) {
                allotmentRef.current.resize(sizes);
            }
        });
    }, []);

    const handleDragEnd = useCallback((sizes: number[]) => {
        console.log("[VaultUI] onDragEnd:", sizes);
        setPanelSizes(PANEL_KEY, sizes);
    }, []);

    const handleChange = useCallback((sizes: number[]) => {
        console.log("[VaultUI] onChange:", sizes);
    }, []);

    return (
        <GridWrapper>
            <Allotment ref={allotmentRef} onDragEnd={handleDragEnd} onChange={handleChange}>
                <Allotment.Pane>
                    <GroupsList />
                </Allotment.Pane>
                <Allotment.Pane className="split-pane-entries">
                    <EntriesList />
                </Allotment.Pane>
                <Allotment.Pane className="split-pane-entry-details">
                    <EntryDetails />
                </Allotment.Pane>
            </Allotment>
        </GridWrapper>
    );
};
