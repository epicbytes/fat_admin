import { HiddenInput } from "./HiddenInput";
import { TextInput } from "./TextInput";
import { NumberInput } from "./NumberInput";
import { ImageInput } from "./ImageInput";
import { TextAreaInput } from "./TextAreaInput";
import { CheckboxInput } from "./CheckboxInput";
import { TagsInput } from "./TagsInput";
import { SelectInput } from "./SelectInput";
import { DictionaryItemInput } from "./DictionaryItemInput";
import { DictionaryItemsInput } from "./DictionaryItemsInput";
import { DataTableField } from "./DataTableField";
import { DataTableInput } from "./DataTableInput";
import { MapsInput } from "./MapsInput";
//import { ComplexInput } from "./ComplexInput";
import { Submit } from "./Submit";

export const INPUTS = {
  HiddenInput,
  TextInput,
  ImageInput,
  NumberInput,
  TextAreaInput,
  CheckboxInput,
  DataTableField,
  TagsInput,
  SelectInput,
  DictionaryItemInput,
  DictionaryItemsInput,
  MapsInput,
  //ComplexInput,
  Submit,
  ByType: {
    hidden: HiddenInput,
    text: TextInput,
    textarea: TextAreaInput,
    number: NumberInput,
    image: ImageInput,
    checkbox: CheckboxInput,
    tags: TagsInput,
    select: SelectInput,
    data_table: DataTableInput,
    dictionary_item: DictionaryItemInput,
    dictionary_items: DictionaryItemsInput,
    maps: MapsInput,
    //complex: ComplexInput,
    submit: Submit
  }
};
