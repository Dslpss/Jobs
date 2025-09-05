import React, { memo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

/**
 * Componente Select com tratamento de erro ResizeObserver
 */
const SafeSelect = memo(
  ({
    value,
    onValueChange,
    placeholder,
    children,
    triggerClassName,
    contentClassName,
    ...props
  }) => {
    const handleValueChange = (newValue) => {
      // Usa setTimeout para evitar problemas de ResizeObserver
      setTimeout(() => {
        onValueChange?.(newValue);
      }, 0);
    };

    return (
      <Select value={value} onValueChange={handleValueChange} {...props}>
        <SelectTrigger className={triggerClassName}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent
          className={contentClassName}
          position="popper"
          sideOffset={8}
          avoidCollisions={true}
          collisionPadding={10}
          sticky="always"
        >
          {children}
        </SelectContent>
      </Select>
    );
  }
);

SafeSelect.displayName = "SafeSelect";

export default SafeSelect;
