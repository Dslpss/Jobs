import React, { memo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

/**
 * Componente Select otimizado para prevenir problemas de ResizeObserver
 * e melhorar performance com memo
 */
const OptimizedSelect = memo(
  ({
    value,
    onValueChange,
    placeholder,
    options,
    triggerClassName,
    contentClassName,
    keyPrefix,
    ...props
  }) => {
    return (
      <Select
        key={`${keyPrefix}-${value || "none"}`}
        value={value}
        onValueChange={onValueChange}
        {...props}
      >
        <SelectTrigger className={triggerClassName}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent
          className={contentClassName}
          position="popper"
          sideOffset={5}
          avoidCollisions={true}
          collisionPadding={10}
        >
          {options.map((option) => (
            <SelectItem
              key={typeof option === "string" ? option : option.value}
              value={typeof option === "string" ? option : option.value}
              className="hover:bg-opacity-80 focus:bg-opacity-80 transition-colors"
            >
              {typeof option === "string" ? option : option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
);

OptimizedSelect.displayName = "OptimizedSelect";

export default OptimizedSelect;
