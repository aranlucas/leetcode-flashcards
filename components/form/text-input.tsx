import { Control, FieldValues, useController, Path } from "react-hook-form";
import {
  TextInput as MantineTextInput,
  TextInputProps as MantineTextInputProps,
} from "@mantine/core";

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
  const { field } = useController({
    control,
    name,
  });
  return <MantineTextInput {...field} value={field.value} {...rest} />;
}

export default TextInput;
