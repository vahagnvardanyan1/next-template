"use client";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";

import { useAppStore, setAppStore } from "@/store";
import type { IAppStore } from "@/store";

import {
  CardRoot,
  TitleBar,
  Dot,
  TitleBarLabel,
  CounterRow,
  CounterButton,
  CounterValue,
  CodeHint,
  CodeText,
} from "./styled";

const selector = (store: IAppStore) => ({
  counter: store.counter,
});

export const CounterDemo = () => {
  const { counter } = useAppStore(selector);

  return (
    <CardRoot>
      <TitleBar>
        <Dot color="#ff5f57" />
        <Dot color="#febc2e" />
        <Dot color="#28c840" />
        <TitleBarLabel>zustand store</TitleBarLabel>
      </TitleBar>

      <CounterRow>
        <CounterButton
          onClick={() => setAppStore((s) => ({ counter: s.counter - 1 }))}
          size="small"
        >
          <RemoveIcon fontSize="small" />
        </CounterButton>

        <CounterValue>{counter}</CounterValue>

        <CounterButton
          onClick={() => setAppStore((s) => ({ counter: s.counter + 1 }))}
          size="small"
        >
          <AddIcon fontSize="small" />
        </CounterButton>
      </CounterRow>

      <CodeHint>
        <CodeText component="code">
          <Box component="span" sx={{ color: "#7c3aed" }}>
            setAppStore
          </Box>
          {"((s) => ({ "}
          <Box component="span" sx={{ color: "#22c55e" }}>
            counter
          </Box>
          {": s.counter + 1 }))"}
        </CodeText>
      </CodeHint>
    </CardRoot>
  );
};
