import Dialog from "@dnlwllms/dialog";
import { FilterComponent } from "../types";
import Button from "./Button";
import Popup from "./Popup";

const Filter: FilterComponent = ({ children }) => {
  return <Dialog>{children}</Dialog>;
};

Filter.Button = Button;
Filter.Popup = Popup;

export default Filter;
