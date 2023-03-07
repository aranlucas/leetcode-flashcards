import {
  TextInput as MantineTextInput,
  type TextInputProps as MantineTextInputProps,
} from "@mantine/core";
import {
  type FieldValues,
  type Control,
  type Path,
  useController,
} from "react-hook-form";

interface TextInputProps<TFieldValues extends FieldValues>
  extends MantineTextInputProps {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
}

function TextInput<TFieldValues extends FieldValues>({
  control,
  name,
  ...rest
}: TextInputProps<TFieldValues>) {
  const { field, fieldState } = useController({
    control,
    name,
  });

  return (
    <MantineTextInput
      {...field}
      value={field.value}
      error={fieldState?.error?.message}
      {...rest}
    />
  );
}

export default TextInput;
