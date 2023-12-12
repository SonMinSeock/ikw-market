import React, { forwardRef } from "react";
import styled from "styled-components";

type Props = {
  value?: any;
  onInput?: any;
  placeholder?: string;
  style?: StyleProps;
  useTextArea?: boolean;
  name?: string;
  inputMode?: "search" | "text" | "none" | "tel" | "url" | "email" | "numeric" | "decimal";
  type?: string;
  required?: boolean;
  accept?: string;
};

type StyleProps = {
  display?: string;
  background?: string;
  width?: string;
  height?: string;
  border?: string;
  padding?: string;
  borderRadius?: string;
  resize?: string;
};

const InputLayout = styled.input<StyleProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 1px solid rgb(204, 204, 204);
  background-color: ${(props) => props.background};
  display: ${(props) => props.display};
  padding: ${(props) => props.padding};
  border-radius: ${(props) => props.borderRadius};
  &:focus,
  &:active {
    outline: 2px solid #ffc901;
  }
`;

const TextAreaLayout = styled.textarea<StyleProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 1px solid rgb(204, 204, 204);
  background-color: ${(props) => props.background};
  padding: ${(props) => props.padding};
  resize: ${(props) => props.resize};
  border-radius: ${(props) => props.borderRadius};
  &:focus,
  &:active {
    outline: 2px solid #ffc901;
  }
`;

const Input = forwardRef<HTMLInputElement, Props>(
  ({ accept, type, name, required, inputMode, useTextArea, style, placeholder, value, onInput }: Props, ref) => {
    return useTextArea ? (
      <TextAreaLayout
        required={required}
        placeholder={placeholder}
        value={value}
        onInput={onInput}
        {...style}
        inputMode={inputMode}
        name={name}
      />
    ) : (
      <InputLayout
        ref={ref}
        type={type}
        accept={accept}
        required={required}
        placeholder={placeholder}
        value={value}
        onInput={onInput}
        {...style}
        inputMode={inputMode}
        name={name}
        multiple
      />
    );
  }
);

export default Input;
