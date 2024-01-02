import React from "react";
import styled from "styled-components";
import Input from "../atoms/Input";
type Props = {
  value?: any;
  onInput?: Function;
  placeholder?: string;
  label?: string;
  useTextArea?: boolean;
  name: string;
  inputMode?: "search" | "text" | "none" | "tel" | "url" | "email" | "numeric" | "decimal";
  length?: string;
  style?: StyleProps;
};

type StyleProps = {
  display?: string;
  position?: string;
  alignItems?: string;
  height?: string;
};

const InputGroupLayout = styled.div<StyleProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 20px;
`;

const LengthLayout = styled.span`
  position: absolute;
  right: 0;
`;

const InputGroup = ({
  children,
  name,
  inputMode,
  useTextArea,
  style,
  value,
  onInput,
  label,
  placeholder,
  length,
}: React.PropsWithChildren<Props>) => {
  return (
    <InputGroupLayout {...style}>
      <label>{label}</label>
      <Input
        name={name}
        inputMode={inputMode}
        useTextArea={useTextArea}
        value={value}
        onInput={onInput}
        placeholder={placeholder}
        style={style}
      />
      <LengthLayout>{length}</LengthLayout>
    </InputGroupLayout>
  );
};

export default InputGroup;
