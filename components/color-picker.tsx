import { useCallback } from "react";
import { debounce } from "lodash";
import BestGradienColorPicker, {
  ColorPickerProps as BestGradienColorPickerProps,
} from "react-best-gradient-color-picker";

interface ColorPickerProps extends Omit<BestGradienColorPickerProps, "onChange"> {
  color: string;
  setColor: (color: string) => void;
}

export default function ColorPicker({
  color,
  setColor,
  ...props
}: ColorPickerProps) {
  const debouncedSetColor = useCallback(debounce(setColor, 100), [setColor]);

  return (
    <BestGradienColorPicker
      {...props}
      onChange={debouncedSetColor}
      value={color}
    />
  );
}
